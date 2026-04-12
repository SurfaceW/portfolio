import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Gauge,
  Info,
  PiggyBank,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const COLORS = {
  portfolio: "#7c3aed",
  freedom: "#f59e0b",
  savings: "#10b981",
  passive: "#ec4899",
  accent: "#38bdf8",
  grid: "rgba(255,255,255,0.08)",
  gridText: "rgba(255,255,255,0.38)",
};

const MAX_YEARS = 40;
const DEFAULT_USD_TO_CNY = 7.2;
const CURRENCIES = {
  CNY: { code: "CNY", symbol: "¥" },
  USD: { code: "USD", symbol: "$" },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function convertFromCny(amount, currency, usdToCny) {
  return currency === "USD" ? amount / usdToCny : amount;
}

function convertToCny(amount, currency, usdToCny) {
  return currency === "USD" ? amount * usdToCny : amount;
}

function parseNumericInput(rawValue) {
  const sanitized = rawValue.replace(/[^\d.-]/g, "");
  if (!sanitized || sanitized === "-" || sanitized === "." || sanitized === "-.") return null;
  const parsed = Number(sanitized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatCurrency(amountCny, currency, usdToCny, digits = 0) {
  const displayAmount = convertFromCny(amountCny, currency, usdToCny);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: digits,
  }).format(displayAmount);
}

function formatCompactCurrency(amountCny, currency, usdToCny) {
  const displayAmount = convertFromCny(amountCny, currency, usdToCny);
  const symbol = CURRENCIES[currency].symbol;
  return `${symbol}${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(displayAmount)}`;
}

function formatInputAmount(amountCny, currency, usdToCny, digits = 0) {
  const displayAmount = convertFromCny(amountCny, currency, usdToCny);
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(displayAmount);
}

function simulate(startingPortfolio, annualSavings, returnRate, withdrawalRate, annualSpending) {
  const growth = returnRate / 100;
  const withdrawal = withdrawalRate / 100;
  const targetPortfolio = annualSpending / withdrawal;
  const data = [];
  let portfolio = startingPortfolio;
  let freedomYear = null;

  for (let year = 0; year <= MAX_YEARS; year += 1) {
    const passiveIncome = portfolio * withdrawal;
    const hasReachedFreedom = passiveIncome >= annualSpending && freedomYear === null;
    if (hasReachedFreedom) freedomYear = year;

    data.push({
      year,
      portfolio,
      passiveIncome,
      targetPortfolio,
      free: freedomYear !== null && year >= freedomYear,
    });

    portfolio = portfolio * (1 + growth) + annualSavings;
  }

  return { data, freedomYear, targetPortfolio };
}

function CurrencyButton({ code, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.16em] transition ${
        active
          ? "bg-white text-[#111111]"
          : "bg-white/[0.06] text-white/55 hover:bg-white/[0.1] hover:text-white/80"
      }`}
    >
      {code}
    </button>
  );
}

function AmountField({
  label,
  valueCny,
  onChange,
  currency,
  usdToCny,
  icon: Icon,
  color,
  hint,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
}) {
  const [draft, setDraft] = useState(formatInputAmount(valueCny, currency, usdToCny));

  useEffect(() => {
    setDraft(formatInputAmount(valueCny, currency, usdToCny));
  }, [currency, usdToCny, valueCny]);

  const commitValue = () => {
    const parsed = parseNumericInput(draft);
    if (parsed === null) {
      setDraft(formatInputAmount(valueCny, currency, usdToCny));
      return;
    }
    const nextValueCny = clamp(convertToCny(parsed, currency, usdToCny), min, max);
    onChange(nextValueCny);
    setDraft(formatInputAmount(nextValueCny, currency, usdToCny));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Icon size={14} style={{ color }} />
        <span>{label}</span>
      </div>
      <div
        className="rounded-2xl border px-4 py-3 transition focus-within:border-white/35 focus-within:bg-white/[0.05]"
        style={{ borderColor: `${color}35`, background: `${color}10` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-white/50">{CURRENCIES[currency].symbol}</span>
          <input
            type="text"
            inputMode="decimal"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            className="w-full bg-transparent text-xl font-semibold text-white outline-none placeholder:text-white/25"
            placeholder="Enter any amount"
          />
        </div>
        {hint && <p className="mt-2 text-xs leading-relaxed text-white/42">{hint}</p>}
      </div>
    </div>
  );
}

function RateField({ label, value, onChange, min, max, step, icon: Icon, color, hint }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Icon size={14} style={{ color }} />
          <span>{label}</span>
        </div>
        <span className="text-lg font-semibold text-white tabular-nums">{value}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-white/[0.08]">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white shadow-lg"
          style={{ left: `calc(${pct}% - 8px)`, background: color }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/25">
        <span>{min}%</span>
        <span>{max}%</span>
      </div>
      {hint && <p className="text-xs leading-relaxed text-white/38">{hint}</p>}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub, color, emphasis = false }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-[1.75rem] border p-4 sm:p-5 ${
        emphasis
          ? "border-amber-300/30 bg-amber-300/[0.08]"
          : "border-white/[0.08] bg-white/[0.03]"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-lg p-1.5" style={{ background: `${color}20` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-white/42">{label}</span>
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      {sub && <div className="mt-1 text-xs leading-relaxed text-white/42">{sub}</div>}
    </motion.div>
  );
}

function Chart({ data, freedomYear, targetPortfolio, currency, usdToCny }) {
  const width = 720;
  const height = 320;
  const pad = { t: 20, r: 20, b: 40, l: 64 };
  const chartWidth = width - pad.l - pad.r;
  const chartHeight = height - pad.t - pad.b;

  const maxValue = Math.max(targetPortfolio * 1.3, ...data.map((point) => point.portfolio)) || 1;
  const x = (year) => pad.l + (year / MAX_YEARS) * chartWidth;
  const y = (value) => pad.t + chartHeight - (value / maxValue) * chartHeight;

  const portfolioPath = data
    .map((point, index) => `${index === 0 ? "M" : "L"}${x(point.year).toFixed(1)},${y(point.portfolio).toFixed(1)}`)
    .join(" ");

  const passivePath = data
    .map((point, index) => `${index === 0 ? "M" : "L"}${x(point.year).toFixed(1)},${y(point.passiveIncome).toFixed(1)}`)
    .join(" ");

  const areaPath = `${portfolioPath} L${x(MAX_YEARS).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;
  const yTicks = Array.from({ length: 6 }, (_, index) => (maxValue / 5) * index);
  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]">
        <defs>
          <linearGradient id="portfolioArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.portfolio} stopOpacity="0.28" />
            <stop offset="100%" stopColor={COLORS.portfolio} stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.l}
              x2={width - pad.r}
              y1={y(tick)}
              y2={y(tick)}
              stroke={COLORS.grid}
              strokeDasharray="4 4"
            />
            <text x={pad.l - 8} y={y(tick) + 4} textAnchor="end" fill={COLORS.gridText} fontSize="10">
              {formatCompactCurrency(tick, currency, usdToCny)}
            </text>
          </g>
        ))}

        {xTicks.map((year) => (
          <text
            key={year}
            x={x(year)}
            y={height - 8}
            textAnchor="middle"
            fill={COLORS.gridText}
            fontSize="10"
          >
            {year === 0 ? "Now" : `Y${year}`}
          </text>
        ))}

        <line
          x1={pad.l}
          x2={width - pad.r}
          y1={y(targetPortfolio)}
          y2={y(targetPortfolio)}
          stroke={COLORS.freedom}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.8"
        />
        <text
          x={width - pad.r - 4}
          y={y(targetPortfolio) - 6}
          textAnchor="end"
          fill={COLORS.freedom}
          fontSize="10"
          fontWeight="600"
        >
          {`Freedom line ${formatCompactCurrency(targetPortfolio, currency, usdToCny)}`}
        </text>

        <path d={areaPath} fill="url(#portfolioArea)" />
        <path d={portfolioPath} fill="none" stroke={COLORS.portfolio} strokeWidth="2.5" strokeLinejoin="round" />
        <path d={passivePath} fill="none" stroke={COLORS.passive} strokeWidth="1.6" strokeDasharray="4 3" opacity="0.85" />

        {freedomYear !== null && freedomYear <= MAX_YEARS && (
          <g>
            <line
              x1={x(freedomYear)}
              x2={x(freedomYear)}
              y1={pad.t}
              y2={height - pad.b}
              stroke={COLORS.savings}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            <circle
              cx={x(freedomYear)}
              cy={y(data[freedomYear].portfolio)}
              r="5"
              fill={COLORS.savings}
              stroke="white"
              strokeWidth="2"
            />
            <rect
              x={x(freedomYear) - 30}
              y={pad.t - 2}
              width="60"
              height="20"
              rx="10"
              fill={COLORS.savings}
            />
            <text
              x={x(freedomYear)}
              y={pad.t + 12}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="700"
            >
              Y{freedomYear}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function SensitivityBar({ label, years, maxYears, color, highlight }) {
  const pct = years === null ? 100 : Math.min((years / maxYears) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-right text-xs text-white/50">{label}</span>
      <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: highlight ? `linear-gradient(90deg, ${color}, ${COLORS.savings})` : color,
            opacity: highlight ? 1 : 0.6,
          }}
        />
        <span
          className="absolute inset-y-0 flex items-center text-[10px] font-bold"
          style={{
            left: `max(${pct}% + 6px, 8px)`,
            color: highlight ? COLORS.savings : "rgba(255,255,255,0.5)",
          }}
        >
          {years === null ? ">40y" : `${years}y`}
        </span>
      </div>
    </div>
  );
}

function Legend() {
  const items = [
    { color: COLORS.portfolio, label: "Portfolio value" },
    { color: COLORS.passive, label: "Passive income", dashed: true },
    { color: COLORS.freedom, label: "Target portfolio", dashed: true },
    { color: COLORS.savings, label: "Freedom year" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-white/50">
          {item.dashed ? (
            <svg width="16" height="2">
              <line x1="0" y1="1" x2="16" y2="1" stroke={item.color} strokeWidth="2" strokeDasharray="4 3" />
            </svg>
          ) : (
            <div className="h-[2px] w-4 rounded-full" style={{ background: item.color }} />
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function FinancialFreedomSimulator() {
  const [currency, setCurrency] = useState("CNY");
  const [usdToCny, setUsdToCny] = useState(DEFAULT_USD_TO_CNY);
  const [startingPortfolio, setStartingPortfolio] = useState(5_000_000);
  const [annualSavings, setAnnualSavings] = useState(200_000);
  const [returnRate, setReturnRate] = useState(6);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [annualSpending, setAnnualSpending] = useState(600_000);

  const simulation = useMemo(
    () => simulate(startingPortfolio, annualSavings, returnRate, withdrawalRate, annualSpending),
    [startingPortfolio, annualSavings, returnRate, withdrawalRate, annualSpending]
  );

  const { data, freedomYear, targetPortfolio } = simulation;

  const returnSensitivity = useMemo(() => {
    const run = (rate) =>
      simulate(startingPortfolio, annualSavings, rate, withdrawalRate, annualSpending).freedomYear;

    return [
      {
        label: `${Math.max(0, returnRate - 2)}%`,
        years: run(Math.max(0, returnRate - 2)),
        color: COLORS.portfolio,
      },
      {
        label: `${returnRate}%`,
        years: run(returnRate),
        color: COLORS.portfolio,
        highlight: true,
      },
      {
        label: `${returnRate + 2}%`,
        years: run(returnRate + 2),
        color: COLORS.portfolio,
      },
    ];
  }, [startingPortfolio, annualSavings, returnRate, withdrawalRate, annualSpending]);

  const savingsSensitivity = useMemo(() => {
    const options = [
      Math.max(0, annualSavings - 100_000),
      annualSavings,
      annualSavings + 100_000,
      annualSavings + 250_000,
    ];

    return options.map((value) => ({
      label: formatCompactCurrency(value, currency, usdToCny),
      years: simulate(startingPortfolio, value, returnRate, withdrawalRate, annualSpending).freedomYear,
      color: COLORS.savings,
      highlight: value === annualSavings,
    }));
  }, [annualSavings, annualSpending, currency, returnRate, startingPortfolio, usdToCny, withdrawalRate]);

  const passiveIncomeNow = data[0]?.passiveIncome ?? 0;
  const currentCoverage = annualSpending > 0 ? ((passiveIncomeNow / annualSpending) * 100).toFixed(0) : "0";

  return (
    <div className="min-h-screen bg-[#120f17] text-white selection:bg-amber-400/25">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-9rem] h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.09] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[12rem] h-[28rem] w-[28rem] rounded-full bg-sky-400/[0.08] blur-[130px]" />
        <div className="absolute bottom-[-8rem] left-[20%] h-[24rem] w-[24rem] rounded-full bg-amber-400/[0.08] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8 sm:space-y-10">
          <motion.div variants={fadeUp} className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
              <Sparkles size={12} className="text-amber-300" />
              Financial freedom simulator
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  See when your portfolio can pay for your life.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                  Change either annual spending or target portfolio. The simulator keeps them linked,
                  then projects how long your current plan needs to reach financial independence.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {Object.keys(CURRENCIES).map((code) => (
                    <CurrencyButton
                      key={code}
                      code={code}
                      active={currency === code}
                      onClick={() => setCurrency(code)}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Exchange Rate
                  </label>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span className="text-sm text-white/45">1 USD =</span>
                    <input
                      type="number"
                      min="0.1"
                      step="0.01"
                      value={usdToCny}
                      onChange={(e) => setUsdToCny(Math.max(0.1, Number(e.target.value) || DEFAULT_USD_TO_CNY))}
                      className="w-24 bg-transparent text-lg font-semibold text-white outline-none"
                    />
                    <span className="text-sm text-white/45">CNY</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,rgba(245,158,11,0.18),rgba(124,58,237,0.12))] p-5 sm:p-6"
          >
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">
                  <Target size={14} className="text-amber-300" />
                  Edit your target portfolio directly
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-white/65">
                  Type any number here. The simulator updates annual spending automatically using
                  your current withdrawal rate.
                </p>
              </div>

              <AmountField
                label="Target portfolio"
                valueCny={targetPortfolio}
                onChange={(value) => setAnnualSpending(value * (withdrawalRate / 100))}
                currency={currency}
                usdToCny={usdToCny}
                icon={Target}
                color={COLORS.freedom}
                hint={`Linked formula: annual spending = target portfolio × ${withdrawalRate}%`}
                min={0}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={CalendarCheck}
              label="Freedom Year"
              value={freedomYear !== null ? `Year ${freedomYear}` : "Over 40 years"}
              sub={
                freedomYear !== null
                  ? `Around ${new Date().getFullYear() + freedomYear}`
                  : "Your current plan does not hit the target within the chart range."
              }
              color={COLORS.savings}
            />
            <MetricCard
              icon={Target}
              label="Target Portfolio"
              value={formatCurrency(targetPortfolio, currency, usdToCny)}
              sub={`Editable above and linked to annual spending at ${withdrawalRate}% withdrawal.`}
              color={COLORS.freedom}
              emphasis
            />
            <MetricCard
              icon={Gauge}
              label="Coverage Today"
              value={`${currentCoverage}%`}
              sub={`${formatCurrency(passiveIncomeNow, currency, usdToCny)} passive income against ${formatCurrency(annualSpending, currency, usdToCny)} spending.`}
              color={COLORS.passive}
            />
            <MetricCard
              icon={ArrowUpRight}
              label="Portfolio In 10 Years"
              value={formatCurrency(data[Math.min(10, data.length - 1)].portfolio, currency, usdToCny)}
              sub="Projection with your current assumptions."
              color={COLORS.portfolio}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-8"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp size={18} className="text-violet-300" />
                  Portfolio projection
                </h2>
                <p className="mt-1 text-sm text-white/42">
                  Portfolio value and passive income against your target portfolio.
                </p>
              </div>
            </div>
            <Chart
              data={data}
              freedomYear={freedomYear}
              targetPortfolio={targetPortfolio}
              currency={currency}
              usdToCny={usdToCny}
            />
            <Legend />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-8"
          >
            <div className="mb-6 space-y-2">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Wallet size={18} className="text-sky-300" />
                Control panel
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/45">
                Annual spending and target portfolio use the same formula. Edit either one and the
                other will stay in sync.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <AmountField
                label="Starting portfolio"
                valueCny={startingPortfolio}
                onChange={setStartingPortfolio}
                currency={currency}
                usdToCny={usdToCny}
                icon={PiggyBank}
                color={COLORS.portfolio}
                hint="Your current invested assets."
                min={0}
              />
              <AmountField
                label="Annual investable savings"
                valueCny={annualSavings}
                onChange={setAnnualSavings}
                currency={currency}
                usdToCny={usdToCny}
                icon={Wallet}
                color={COLORS.savings}
                hint="How much new money you add to the portfolio each year."
                min={0}
              />
              <AmountField
                label="Annual spending"
                valueCny={annualSpending}
                onChange={setAnnualSpending}
                currency={currency}
                usdToCny={usdToCny}
                icon={Target}
                color={COLORS.freedom}
                hint={`Target portfolio stays linked: ${formatCurrency(targetPortfolio, currency, usdToCny)} at ${withdrawalRate}% withdrawal.`}
                min={0}
              />
              <AmountField
                label="Target portfolio"
                valueCny={targetPortfolio}
                onChange={(value) => setAnnualSpending(value * (withdrawalRate / 100))}
                currency={currency}
                usdToCny={usdToCny}
                icon={Target}
                color={COLORS.freedom}
                hint="Type any amount. This directly rewrites annual spending using the selected withdrawal rate."
                min={0}
              />
              <RateField
                label="Expected portfolio return"
                value={returnRate}
                onChange={setReturnRate}
                min={1}
                max={15}
                step={0.5}
                icon={TrendingUp}
                color={COLORS.accent}
                hint="Real annual return assumption after inflation."
              />
              <RateField
                label="Safe withdrawal rate"
                value={withdrawalRate}
                onChange={setWithdrawalRate}
                min={2}
                max={8}
                step={0.5}
                icon={Gauge}
                color={COLORS.passive}
                hint="The share of your portfolio you expect to spend each year."
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white/78">
                <TrendingUp size={14} className="text-violet-300" />
                Return sensitivity
              </h3>
              <p className="mt-1 text-[11px] text-white/32">
                See how changing the return assumption by 2 percentage points shifts the timeline.
              </p>
              <div className="mt-4 space-y-2.5">
                {returnSensitivity.map((item) => (
                  <SensitivityBar key={item.label} {...item} maxYears={MAX_YEARS} />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white/78">
                <PiggyBank size={14} className="text-emerald-300" />
                Savings sensitivity
              </h3>
              <p className="mt-1 text-[11px] text-white/32">
                Compare how adding more or less new capital changes your freedom year.
              </p>
              <div className="mt-4 space-y-2.5">
                {savingsSensitivity.map((item) => (
                  <SensitivityBar key={item.label} {...item} maxYears={MAX_YEARS} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Info size={16} className="mt-0.5 shrink-0 text-white/30" />
              <div className="space-y-1.5 text-xs leading-relaxed text-white/34">
                <p>
                  <strong className="text-white/52">Formula:</strong> Financial freedom starts when
                  portfolio × withdrawal rate is greater than or equal to annual spending.
                </p>
                <p>
                  <strong className="text-white/52">Linked inputs:</strong> Target portfolio and
                  annual spending are two views of the same relationship.
                </p>
                <p>
                  <strong className="text-white/52">Currency mode:</strong> The model runs on one
                  base set of values and converts display amounts between CNY and USD using the
                  exchange rate above.
                </p>
                <p>
                  This is a planning tool, not financial advice. Taxes, inflation, one-off gains,
                  and major market shocks are not modeled here.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
