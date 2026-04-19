import { useMemo, useState } from 'react'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '-'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return '-'
  return `${value.toFixed(1)}%`
}

function buildProjectedCashFlows(baseFcf, growthRate, years) {
  const flows = []
  let current = baseFcf
  for (let year = 1; year <= years; year += 1) {
    current = current * (1 + growthRate / 100)
    flows.push({ year, cashFlow: current })
  }
  return flows
}

export default function BusinessValueExplainerV2() {
  const [baseFcf, setBaseFcf] = useState(100)
  const [growthRate, setGrowthRate] = useState(8)
  const [discountRate, setDiscountRate] = useState(10)
  const [terminalGrowth, setTerminalGrowth] = useState(3)
  const [forecastYears, setForecastYears] = useState(5)
  const [sharesOutstanding, setSharesOutstanding] = useState(10)
  const [netDebt, setNetDebt] = useState(0)

  const projected = useMemo(() => {
    const years = clamp(Number(forecastYears) || 0, 1, 15)
    const growth = Number(growthRate) || 0
    const discount = Number(discountRate) || 0
    const terminal = Number(terminalGrowth) || 0
    const base = Number(baseFcf) || 0
    const debt = Number(netDebt) || 0
    const shares = Math.max(Number(sharesOutstanding) || 1, 1)

    const cashFlows = buildProjectedCashFlows(base, growth, years)

    const discountedFlows = cashFlows.map((item) => ({
      ...item,
      presentValue: item.cashFlow / Math.pow(1 + discount / 100, item.year)
    }))

    const sumPv = discountedFlows.reduce(
      (sum, item) => sum + item.presentValue,
      0
    )

    const lastCashFlow = cashFlows[cashFlows.length - 1]?.cashFlow || 0
    const terminalValue =
      discount > terminal
        ? (lastCashFlow * (1 + terminal / 100)) / ((discount - terminal) / 100)
        : NaN

    const terminalPv = Number.isFinite(terminalValue)
      ? terminalValue / Math.pow(1 + discount / 100, years)
      : NaN

    const enterpriseValue =
      sumPv + (Number.isFinite(terminalPv) ? terminalPv : 0)
    const equityValue = enterpriseValue - debt
    const intrinsicValuePerShare = equityValue / shares

    return {
      years,
      growth,
      discount,
      terminal,
      base,
      debt,
      shares,
      discountedFlows,
      sumPv,
      terminalValue,
      terminalPv,
      enterpriseValue,
      equityValue,
      intrinsicValuePerShare
    }
  }, [
    baseFcf,
    growthRate,
    discountRate,
    terminalGrowth,
    forecastYears,
    sharesOutstanding,
    netDebt
  ])

  const pillars = [
    {
      title: 'More cash',
      text: 'Higher future owner cash flow means higher intrinsic value.',
      icon: '💰'
    },
    {
      title: 'Sooner cash',
      text: 'Cash received earlier is worth more than the same amount received later.',
      icon: '⏳'
    },
    {
      title: 'Safer cash',
      text: 'More predictable businesses deserve lower discount rates than fragile ones.',
      icon: '🛡️'
    },
    {
      title: 'Longer-lasting cash',
      text: 'Long duration of profitable cash generation increases value.',
      icon: '🌱'
    }
  ]

  const reports = [
    {
      name: 'Income Statement',
      use: 'Shows revenue, expenses, and accounting profit.',
      caution: 'Useful, but not the final number for valuation.'
    },
    {
      name: 'Cash Flow Statement',
      use: 'Best place to start. Look at operating cash flow and capital expenditures.',
      caution: 'A common shortcut is FCF = Operating Cash Flow - CapEx.'
    },
    {
      name: 'Balance Sheet',
      use: 'Helps you judge debt, cash, capital intensity, and financial risk.',
      caution:
        'Very important when moving from enterprise value to equity value.'
    }
  ]

  const discountExamples = [
    {
      type: 'Very stable business',
      range: '5%–7%',
      note: 'Utility-like or bond-like cash flows'
    },
    {
      type: 'High-quality mature business',
      range: '7%–10%',
      note: 'Predictable and durable'
    },
    { type: 'Average business', range: '10%–12%', note: 'Normal uncertainty' },
    {
      type: 'Risky / cyclical / fragile',
      range: '12%–20%+',
      note: 'High uncertainty or weak visibility'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_left,rgba(16,185,129,0.10),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm text-slate-600 shadow-sm">
              Intrinsic Value • Free Cash Flow • Discount Rate • Terminal Value
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A business is worth the cash it can give its owners, adjusted for
              time, risk, and durability.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              This version goes beyond the basic idea. It answers the practical
              questions you raised: which financial statement matters most, what
              Year 1 to Year N really means, how to think about the discount
              rate, and how inflation fits into the model.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="text-3xl">{item.icon}</div>
              <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Your concern #1
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Which financial statement tells me what the business generates?
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              The best answer is: start with all three statements, but for
              valuation, the most useful anchor is usually free cash flow rather
              than accounting profit. The income statement tells you about
              profit. The cash flow statement tells you how much cash is
              actually coming in and going out. The balance sheet tells you
              whether debt, working capital, or capital intensity may distort
              the picture.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {reports.map((report) => (
                <div
                  key={report.name}
                  className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
                >
                  <h3 className="text-lg font-semibold">{report.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {report.use}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {report.caution}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                Practical shortcut
              </p>
              <div className="mt-3 font-mono text-lg text-slate-800">
                Free Cash Flow = Cash Flow from Operations - Capital
                Expenditures
              </div>
              <p className="mt-3 leading-7 text-slate-700">
                This is not perfect in every case, but it is a very useful
                starting point for learning. In practice, serious investors
                often normalize this number by removing one-time items and
                thinking about future rather than past free cash flow.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Key correction
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Do not value the business from net income alone
            </h2>
            <div className="mt-6 space-y-4 text-slate-200">
              <div className="rounded-2xl bg-white/5 p-5">
                Accounting profit can be shaped by depreciation, revenue
                recognition, and one-time gains.
              </div>
              <div className="rounded-2xl bg-white/5 p-5">
                Cash flow is closer to what owners can actually take out.
              </div>
              <div className="rounded-2xl bg-white/5 p-5">
                Valuation always depends on future cash flow, not merely
                reported history.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Your concern #2
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                What does Year 1 to Year N actually mean?
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                N is usually not your personal holding period, and it is not
                literally the company’s last year of life. In most DCF models, N
                means the explicit forecast window: the period over which you
                believe you can make reasonably grounded estimates, often 5 to
                10 years.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="font-medium">Stage 1: Explicit forecast</p>
                  <p className="mt-2 text-slate-600">
                    Forecast yearly cash flows from Year 1 to Year N using your
                    business assumptions.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="font-medium">Stage 2: Terminal value</p>
                  <p className="mt-2 text-slate-600">
                    Estimate all remaining cash flows beyond Year N in one
                    simplified number.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-semibold">
                The right interpretation
              </h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
                  <p className="font-medium text-emerald-800">
                    N is how far you can see with some clarity.
                  </p>
                </div>
                <div className="rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
                  <p className="font-medium text-sky-800">
                    Your return still depends on long-term cash flows, even if
                    you plan to sell earlier.
                  </p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
                  <p className="font-medium text-amber-800">
                    The terminal value often dominates the valuation, so
                    assumptions must stay conservative.
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-slate-100">
                <div className="font-mono text-sm sm:text-base">
                  Enterprise Value = PV of Years 1..N + PV of Terminal Value
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Your concern #3
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Does the discount rate include inflation?
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Yes, usually it does — but the key is consistency. Most practical
              DCF models are built in nominal terms, which means the cash flows
              already contain inflation and the discount rate also contains
              inflation. If you remove inflation from the cash flows, then you
              must also use a real discount rate.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="font-medium">Nominal method</p>
                <p className="mt-2 text-slate-600">
                  Cash flows include inflation. Discount rate includes
                  inflation. This is the most common approach.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="font-medium">Real method</p>
                <p className="mt-2 text-slate-600">
                  Cash flows exclude inflation. Discount rate excludes
                  inflation. Less common for basic investing practice.
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5">
              <p className="font-medium text-rose-800">
                Never mix nominal cash flows with a real discount rate, or real
                cash flows with a nominal discount rate.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              How to think about the discount rate
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              It is not just the Fed rate
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              A useful mental model is: discount rate = risk-free rate + risk
              premium. The risk-free rate can be approximated by a Treasury
              yield. The premium depends on business quality, cyclicality,
              balance-sheet strength, uncertainty, and your required return.
            </p>
            <div className="mt-8 space-y-4">
              {discountExamples.map((item) => (
                <div
                  key={item.type}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{item.type}</p>
                    <p className="rounded-full bg-white/10 px-3 py-1 text-sm">
                      {item.range}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Simple DCF calculator
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              A practical model you can play with
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              This calculator is intentionally simple. It uses one starting free
              cash flow number, one growth rate for the explicit forecast
              period, one discount rate, and one terminal growth rate. It is
              designed for intuition, not precision.
            </p>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Starting free cash flow (latest year, in millions)
                  </span>
                  <input
                    type="number"
                    value={baseFcf}
                    onChange={(e) => setBaseFcf(Number(e.target.value))}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none ring-0 transition focus:border-slate-500"
                  />
                </label>

                <label className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Annual FCF growth during forecast period
                    </span>
                    <span className="text-sm text-slate-500">
                      {formatPercent(Number(growthRate))}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="25"
                    step="0.5"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(Number(e.target.value))}
                  />
                </label>

                <label className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Discount rate
                    </span>
                    <span className="text-sm text-slate-500">
                      {formatPercent(Number(discountRate))}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.5"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(Number(e.target.value))}
                  />
                </label>

                <label className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Terminal growth rate
                    </span>
                    <span className="text-sm text-slate-500">
                      {formatPercent(Number(terminalGrowth))}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={terminalGrowth}
                    onChange={(e) => setTerminalGrowth(Number(e.target.value))}
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Explicit forecast years (N)
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={forecastYears}
                    onChange={(e) => setForecastYears(Number(e.target.value))}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Net debt (debt minus cash, in millions)
                  </span>
                  <input
                    type="number"
                    value={netDebt}
                    onChange={(e) => setNetDebt(Number(e.target.value))}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Shares outstanding (in millions)
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={sharesOutstanding}
                    onChange={(e) =>
                      setSharesOutstanding(Number(e.target.value))
                    }
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">
                    PV of explicit cash flows
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(projected.sumPv)}M
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">PV of terminal value</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {Number.isFinite(projected.terminalPv)
                      ? `${formatCurrency(projected.terminalPv)}M`
                      : 'Invalid'}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Equity value</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(projected.equityValue)}M
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
                  <p className="text-sm text-slate-300">
                    Intrinsic value per share
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(projected.intrinsicValuePerShare)}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Projected free cash flow by year
                    </h3>
                    <p className="mt-1 text-slate-600">
                      All figures below are in millions. This assumes a constant
                      growth rate during the explicit forecast period.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-200">
                    N = {projected.years} years
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Year</th>
                        <th className="px-4 py-3 font-semibold">
                          Projected FCF
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          Discount factor
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          Present value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projected.discountedFlows.map((item) => (
                        <tr
                          key={item.year}
                          className="border-t border-slate-200 bg-white"
                        >
                          <td className="px-4 py-4 font-medium">
                            Year {item.year}
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {formatCurrency(item.cashFlow)}M
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {(
                              1 /
                              Math.pow(1 + projected.discount / 100, item.year)
                            ).toFixed(3)}
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {formatCurrency(item.presentValue)}M
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
                    <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                      Terminal value note
                    </p>
                    <p className="mt-2 text-slate-700">
                      Terminal value estimates cash flows beyond Year N. In this
                      simple model, it uses the Gordon Growth formula. It only
                      works sensibly when the discount rate is higher than
                      terminal growth.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
                    <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                      Reality check
                    </p>
                    <p className="mt-2 text-slate-700">
                      A DCF is only as good as its assumptions. Small changes in
                      discount rate and terminal growth can move valuation a
                      lot. Use ranges, not false precision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold">
              A better way to phrase the whole idea
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              The intrinsic value of a business today equals the present value
              of the cash it can distribute to owners over its remaining life.
              In practice, we estimate a visible forecast period, add a terminal
              value for the years beyond it, and discount everything back to the
              present using a required return that reflects time, inflation, and
              risk.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Deepest takeaway
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              Value = future owner cash, translated into today’s terms.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Not the story alone. Not the accounting headline alone. Not only
              the past. The whole model is an attempt to answer one question:
              what are the future owner cash flows worth to me today?
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
