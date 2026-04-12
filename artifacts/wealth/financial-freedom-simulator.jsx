import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Target,
  Wallet,
  PiggyBank,
  CalendarCheck,
  ChevronRight,
  Gauge,
  ArrowUpRight,
  Sparkles,
  Info,
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
  portfolio: "#6366f1",
  freedom: "#f59e0b",
  savings: "#10b981",
  passive: "#ec4899",
  accent: "#818cf8",
  grid: "rgba(255,255,255,0.06)",
  gridText: "rgba(255,255,255,0.3)",
};

const MAX_YEARS = 40;

function simulate(p0, annualSave, returnRate, withdrawRate, annualExpense) {
  const g = returnRate / 100;
  const y = withdrawRate / 100;
  const target = annualExpense / y;
  const data = [];
  let portfolio = p0;
  let freedomYear = null;

  for (let yr = 0; yr <= MAX_YEARS; yr++) {
    const passiveIncome = portfolio * y;
    const isFree = passiveIncome >= annualExpense && freedomYear === null;
    if (isFree) freedomYear = yr;

    data.push({
      year: yr,
      portfolio,
      passiveIncome,
      target,
      free: freedomYear !== null && yr >= freedomYear,
    });

    portfolio = portfolio * (1 + g) + annualSave;
  }

  return { data, freedomYear, target };
}

function Slider({ label, value, onChange, min, max, step, unit, icon: Icon, color }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Icon size={14} style={{ color }} />
          <span>{label}</span>
        </div>
        <span className="text-lg font-semibold text-white tabular-nums">
          {unit === "%" ? `${value}%` : `${value}万`}
        </span>
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
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-lg"
          style={{ left: `calc(${pct}% - 8px)`, background: color }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/25">
        <span>{unit === "%" ? `${min}%` : `${min}万`}</span>
        <span>{unit === "%" ? `${max}%` : `${max}万`}</span>
      </div>
    </div>
  );
}

function Chart({ data, freedomYear, target }) {
  const W = 720;
  const H = 320;
  const PAD = { t: 20, r: 20, b: 40, l: 60 };
  const cw = W - PAD.l - PAD.r;
  const ch = H - PAD.t - PAD.b;

  const maxVal = Math.max(target * 1.3, ...data.map((d) => d.portfolio)) || 1;
  const x = (yr) => PAD.l + (yr / MAX_YEARS) * cw;
  const y = (val) => PAD.t + ch - (val / maxVal) * ch;

  const portfolioPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${x(d.year).toFixed(1)},${y(d.portfolio).toFixed(1)}`)
    .join(" ");

  const passivePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${x(d.year).toFixed(1)},${y(d.passiveIncome).toFixed(1)}`)
    .join(" ");

  const areaPath =
    portfolioPath +
    ` L${x(MAX_YEARS).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

  const yTicks = Array.from({ length: 6 }, (_, i) => (maxVal / 5) * i);
  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px]">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.portfolio} stopOpacity="0.25" />
            <stop offset="100%" stopColor={COLORS.portfolio} stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(tick)}
              y2={y(tick)}
              stroke={COLORS.grid}
              strokeDasharray="4 4"
            />
            <text x={PAD.l - 8} y={y(tick) + 4} textAnchor="end" fill={COLORS.gridText} fontSize="10">
              {tick >= 10000 ? `${(tick / 10000).toFixed(0)}亿` : `${Math.round(tick)}万`}
            </text>
          </g>
        ))}

        {xTicks.map((yr) => (
          <text key={yr} x={x(yr)} y={H - 8} textAnchor="middle" fill={COLORS.gridText} fontSize="10">
            {yr === 0 ? "Now" : `Y${yr}`}
          </text>
        ))}

        <line
          x1={PAD.l}
          x2={W - PAD.r}
          y1={y(target)}
          y2={y(target)}
          stroke={COLORS.freedom}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.7"
        />
        <text x={W - PAD.r - 4} y={y(target) - 6} textAnchor="end" fill={COLORS.freedom} fontSize="10" fontWeight="600">
          Freedom Line ({Math.round(target)}万)
        </text>

        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={portfolioPath} fill="none" stroke={COLORS.portfolio} strokeWidth="2.5" strokeLinejoin="round" />
        <path d={passivePath} fill="none" stroke={COLORS.passive} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />

        {freedomYear !== null && freedomYear <= MAX_YEARS && (
          <g>
            <line
              x1={x(freedomYear)}
              x2={x(freedomYear)}
              y1={PAD.t}
              y2={H - PAD.b}
              stroke={COLORS.savings}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
            />
            <circle cx={x(freedomYear)} cy={y(data[freedomYear].portfolio)} r="5" fill={COLORS.savings} stroke="white" strokeWidth="2" />
            <rect
              x={x(freedomYear) - 28}
              y={PAD.t - 2}
              width="56"
              height="20"
              rx="10"
              fill={COLORS.savings}
            />
            <text
              x={x(freedomYear)}
              y={PAD.t + 12}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="700"
            >
              Year {freedomYear}
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
      <span className="w-16 text-right text-xs text-white/50 shrink-0">{label}</span>
      <div className="flex-1 h-5 rounded-full bg-white/[0.06] overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: highlight
              ? `linear-gradient(90deg, ${color}, ${COLORS.savings})`
              : color,
            opacity: highlight ? 1 : 0.6,
          }}
        />
        <span
          className="absolute inset-y-0 flex items-center text-[10px] font-bold"
          style={{ left: `max(${pct}% + 6px, 8px)`, color: highlight ? COLORS.savings : "rgba(255,255,255,0.5)" }}
        >
          {years === null ? ">40yr" : `${years}yr`}
        </span>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub, color }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 sm:p-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg" style={{ background: `${color}20` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs text-white/40">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-white/40 mt-1">{sub}</div>}
    </motion.div>
  );
}

function EditableMetricCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  min,
  max,
  step,
  onChange,
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 sm:p-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg" style={{ background: `${color}20` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs text-white/40">{label}</span>
      </div>
      <label className="flex items-center gap-2 text-2xl font-bold text-white">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full min-w-0 bg-transparent text-white outline-none tabular-nums [appearance:textfield]"
        />
        <span className="shrink-0 text-lg text-white/60">万</span>
      </label>
      {sub && <div className="text-xs text-white/40 mt-1">{sub}</div>}
    </motion.div>
  );
}

function Legend() {
  const items = [
    { color: COLORS.portfolio, label: "Portfolio Value" },
    { color: COLORS.passive, label: "Passive Income", dashed: true },
    { color: COLORS.freedom, label: "Freedom Line", dashed: true },
    { color: COLORS.savings, label: "Freedom Year" },
  ];
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1.5 text-[11px] text-white/50">
          <div className="w-4 h-[2px] rounded-full" style={{
            background: it.color,
            ...(it.dashed ? { backgroundImage: `repeating-linear-gradient(90deg, ${it.color} 0 4px, transparent 4px 8px)`, background: "none" } : {}),
            ...(it.dashed ? {} : {}),
          }}>
            {it.dashed && (
              <svg width="16" height="2">
                <line x1="0" y1="1" x2="16" y2="1" stroke={it.color} strokeWidth="2" strokeDasharray="4 3" />
              </svg>
            )}
          </div>
          {!it.dashed && <div className="w-4 h-[2px] rounded-full" style={{ background: it.color }} />}
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function FinancialFreedomSimulator() {
  const [p0, setP0] = useState(500);
  const [annualSave, setAnnualSave] = useState(20);
  const [returnRate, setReturnRate] = useState(6);
  const [withdrawRate, setWithdrawRate] = useState(4);
  const [annualExpense, setAnnualExpense] = useState(60);
  const target = annualExpense / (withdrawRate / 100);

  const handleTargetChange = useCallback(
    (nextTarget) => {
      if (!Number.isFinite(nextTarget)) return;
      const clampedTarget = Math.min(10000, Math.max(100, nextTarget));
      setAnnualExpense(Number((clampedTarget * (withdrawRate / 100)).toFixed(2)));
    },
    [withdrawRate]
  );

  const { data, freedomYear } = useMemo(
    () => simulate(p0, annualSave, returnRate, withdrawRate, annualExpense),
    [p0, annualSave, returnRate, withdrawRate, annualExpense]
  );

  const sensitivity = useMemo(() => {
    const run = (p, s, g, y, e) => simulate(p, s, g, y, e).freedomYear;
    return [
      { label: `${returnRate - 2}%`, years: run(p0, annualSave, returnRate - 2, withdrawRate, annualExpense), color: COLORS.portfolio },
      { label: `${returnRate}%`, years: run(p0, annualSave, returnRate, withdrawRate, annualExpense), color: COLORS.portfolio, highlight: true },
      { label: `${returnRate + 2}%`, years: run(p0, annualSave, returnRate + 2, withdrawRate, annualExpense), color: COLORS.portfolio },
    ];
  }, [p0, annualSave, returnRate, withdrawRate, annualExpense]);

  const savingSensitivity = useMemo(() => {
    const run = (s) => simulate(p0, s, returnRate, withdrawRate, annualExpense).freedomYear;
    const steps = [
      Math.max(0, annualSave - 10),
      annualSave,
      annualSave + 10,
      annualSave + 20,
    ];
    return steps.map((s) => ({
      label: `${s}万/yr`,
      years: run(s),
      color: COLORS.savings,
      highlight: s === annualSave,
    }));
  }, [p0, annualSave, returnRate, withdrawRate, annualExpense]);

  const passiveNow = data[0]?.passiveIncome ?? 0;
  const coverageNow = annualExpense > 0 ? ((passiveNow / annualExpense) * 100).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-[system-ui,sans-serif] selection:bg-indigo-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">
          <motion.div variants={fadeUp} className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">
              <Sparkles size={12} className="text-amber-400" />
              Interactive Simulator
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Financial Freedom
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-400">
                Calculator
              </span>
            </h1>
            <p className="text-sm sm:text-base text-white/40 max-w-lg mx-auto">
              When can passive income cover your lifestyle?
              Adjust the levers below and watch the timeline shift.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricCard
              icon={CalendarCheck}
              label="Freedom Year"
              value={freedomYear !== null ? `Year ${freedomYear}` : ">40"}
              sub={freedomYear !== null ? `Around ${new Date().getFullYear() + freedomYear}` : "Not within 40 years"}
              color={COLORS.savings}
            />
            <EditableMetricCard
              icon={Target}
              label="Target Portfolio"
              value={Math.round(target)}
              sub={`Edits annual expense to match ${withdrawRate}% withdrawal rate`}
              color={COLORS.freedom}
              min={100}
              max={10000}
              step={10}
              onChange={handleTargetChange}
            />
            <MetricCard
              icon={Gauge}
              label="Coverage Now"
              value={`${coverageNow}%`}
              sub={`${Math.round(passiveNow)}万 of ${annualExpense}万`}
              color={COLORS.passive}
            />
            <MetricCard
              icon={ArrowUpRight}
              label="Portfolio Y10"
              value={`${Math.round(data[Math.min(10, data.length - 1)].portfolio)}万`}
              sub="Projected in 10 years"
              color={COLORS.portfolio}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-400" />
                Portfolio Growth Projection
              </h2>
            </div>
            <Chart data={data} freedomYear={freedomYear} target={target} />
            <Legend />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-8"
          >
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Wallet size={18} className="text-indigo-400" />
              Control Panel
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
              <Slider label="Starting Capital" value={p0} onChange={setP0} min={0} max={2000} step={100} unit="万" icon={PiggyBank} color={COLORS.portfolio} />
              <Slider label="Annual Savings (salary only)" value={annualSave} onChange={setAnnualSave} min={0} max={100} step={1} unit="万" icon={Wallet} color={COLORS.savings} />
              <Slider label="Portfolio Return" value={returnRate} onChange={setReturnRate} min={1} max={15} step={0.5} unit="%" icon={TrendingUp} color={COLORS.accent} />
              <Slider label="Annual Living Expense" value={annualExpense} onChange={setAnnualExpense} min={10} max={200} step={5} unit="万" icon={Target} color={COLORS.freedom} />
              <Slider label="Safe Withdrawal Rate" value={withdrawRate} onChange={setWithdrawRate} min={2} max={8} step={0.5} unit="%" icon={Gauge} color={COLORS.passive} />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
                <TrendingUp size={14} className="text-indigo-400" />
                Return Rate Sensitivity
              </h3>
              <p className="text-[11px] text-white/30">How ±2% return changes the timeline</p>
              <div className="space-y-2.5">
                {sensitivity.map((s) => (
                  <SensitivityBar key={s.label} {...s} maxYears={MAX_YEARS} />
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
                <PiggyBank size={14} className="text-emerald-400" />
                Savings Rate Sensitivity
              </h3>
              <p className="text-[11px] text-white/30">How saving more/less shifts the date</p>
              <div className="space-y-2.5">
                {savingSensitivity.map((s) => (
                  <SensitivityBar key={s.label} {...s} maxYears={MAX_YEARS} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Info size={16} className="text-white/30 mt-0.5 shrink-0" />
              <div className="text-xs text-white/30 space-y-1.5 leading-relaxed">
                <p><strong className="text-white/50">Formula:</strong> P(n) = P₀·(1+g)ⁿ + S·((1+g)ⁿ − 1)/g. Freedom when P(n)·y ≥ E.</p>
                <p><strong className="text-white/50">Assumptions:</strong> Constant real return, flat expenses (no inflation adjustment), no tax on withdrawals, no major windfalls or shocks. Numbers in 万 RMB.</p>
                <p>This is a directional planning tool, not financial advice. Reconcile with real account balances.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center text-[11px] text-white/20 pt-4">
            AV Financial Freedom Simulator · Built for Arno & Vicky
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
