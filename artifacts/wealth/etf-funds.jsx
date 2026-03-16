export default function InvestmentWarOutlookPage() {
  const outlook = [
    {
      asset: "Oil / Energy",
      en: "Short-term bullish on supply shock; mid-term high but volatile; long-term pressured by energy transition.",
      zh: "短期受供给冲击而偏强；中期高位震荡；长期受新能源替代压制。",
      short: "Bullish",
      mid: "Volatile",
      long: "Structural decline",
    },
    {
      asset: "Gold",
      en: "Short-term safe haven; mid-term supported by stagflation risk; long-term strategic reserve asset.",
      zh: "短期避险受益；中期受滞胀支撑；长期是战略性储备资产。",
      short: "Strong",
      mid: "Supportive",
      long: "Strategic core",
    },
    {
      asset: "US Stocks",
      en: "Short-term pressured by oil inflation and rates; mid-term sector rotation; long-term supported by AI productivity.",
      zh: "短期受油价通胀与利率压制；中期板块轮动；长期仍受 AI 生产力驱动。",
      short: "Pressure",
      mid: "Rotation",
      long: "Constructive",
    },
    {
      asset: "China Stocks",
      en: "Short-term indirectly affected; mid-term supported by policy and industry upgrade; long-term benefits from manufacturing and energy transition.",
      zh: "短期间接受影响；中期受政策与产业升级支撑；长期受益于制造升级和能源转型。",
      short: "Mild impact",
      mid: "Policy support",
      long: "Upgrade opportunity",
    },
  ];

  const ladder = [
    { drop: "Current", action: "Base position", actionZh: "建立底仓", amount: "150k RMB" },
    { drop: "-5%", action: "Small add", actionZh: "小幅加仓", amount: "100k RMB" },
    { drop: "-10%", action: "Medium add", actionZh: "中等加仓", amount: "150k RMB" },
    { drop: "-15%", action: "Large add", actionZh: "较大加仓", amount: "200k RMB" },
    { drop: "-20%", action: "Aggressive add", actionZh: "明显加仓", amount: "300k RMB" },
  ];

  const principles = [
    {
      title: "Do not go all-in too early",
      titleZh: "不要过早满仓",
      body: "War, macro shocks, and rates often create multiple waves of declines.",
      bodyZh: "战争、宏观冲击和利率变化往往带来多轮下跌。",
    },
    {
      title: "Build positions in layers",
      titleZh: "分层建仓",
      body: "The goal is not to catch the exact bottom, but to buy good assets at improving prices.",
      bodyZh: "目标不是精确抄底，而是在更好的价格逐步买入优质资产。",
    },
    {
      title: "Keep reserve cash",
      titleZh: "保留现金储备",
      body: "Strong liquidity lets you stay calm and act when fear expands.",
      bodyZh: "充足流动性让你在市场恐慌扩大时更从容行动。",
    },
    {
      title: "Think in years, not days",
      titleZh: "按年份而非按天思考",
      body: "For broad ETFs like S&P 500 or Nasdaq, entry valuation and holding time matter most.",
      bodyZh: "对于标普 500 或纳指这类宽基 ETF，买入估值与持有时间更重要。",
    },
  ];

  const risks = [
    "Oil inflation / 油价通胀",
    "Delayed rate cuts / 降息推迟",
    "Geopolitical volatility / 地缘波动",
    "Multiple drawdown waves / 多轮下跌",
  ];

  const supports = [
    "AI productivity boom / AI 生产力革命",
    "US corporate earnings / 美国企业盈利",
    "Long-term innovation cycle / 长期创新周期",
    "Cash reserve flexibility / 现金储备灵活性",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <header className="mb-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium tracking-wide text-slate-600">
                Investment Outlook · Geopolitics · Dip-Building
              </p>
              <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                Building Positions During a Market Drop
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                A clean summary of the recent war-impact outlook, cross-asset expectations, and a practical laddered entry plan for long-term ETF investing.
              </p>
              <p className="mt-3 text-base text-slate-500">
                结合近期战争影响分析，整理出跨资产走势判断，以及适合长期指数 ETF 投资的分层建仓方案。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[360px]">
              <MetricCard label="Total Capital" labelZh="总资金" value="1.2M RMB" />
              <MetricCard label="Invested Now" labelZh="当前已投入" value="150k RMB" />
              <MetricCard label="Cash Left" labelZh="剩余现金" value="1.05M RMB" />
              <MetricCard label="Core Style" labelZh="核心方式" value="Layered Entry" />
            </div>
          </div>
        </header>

        <section className="mb-10 grid gap-6 lg:grid-cols-4">
          {outlook.map((item) => (
            <div key={item.asset} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{item.asset}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">2026+</span>
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <p>{item.en}</p>
                <p className="text-slate-500">{item.zh}</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <StateChip title="Short" value={item.short} />
                <StateChip title="Mid" value={item.mid} />
                <StateChip title="Long" value={item.long} />
              </div>
            </div>
          ))}
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Laddered Entry Plan</h2>
                <p className="mt-1 text-sm text-slate-500">Build, don’t rush. 买入要分层，不要一次性冲进去。</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Dip Strategy</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Market Level</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ladder.map((row, idx) => (
                    <tr key={row.drop} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="px-4 py-4 font-medium text-slate-900">{row.drop}</td>
                      <td className="px-4 py-4 text-slate-700">
                        <div>{row.action}</div>
                        <div className="text-xs text-slate-500">{row.actionZh}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-700">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Core idea:</span> The goal is not to buy the exact bottom. The goal is to buy strong long-term assets at increasingly better prices while preserving flexibility.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-semibold">核心思想：</span> 目标不是精确买在最低点，而是在价格越来越有吸引力时，逐步买入长期优质资产，同时保留灵活性。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-semibold">Why It Works</h2>
              <div className="mt-5 space-y-4">
                {principles.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                    <h3 className="font-medium text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.titleZh}：{item.bodyZh}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <Panel title="Near-Term Risks" titleZh="短期风险" badge="Watch Carefully">
            <ul className="space-y-3 text-sm text-slate-700">
              {risks.map((item) => (
                <li key={item} className="rounded-2xl bg-rose-50 px-4 py-3 text-rose-900 ring-1 ring-rose-100">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Long-Term Support" titleZh="长期支撑" badge="Stay Constructive">
            <ul className="space-y-3 text-sm text-slate-700">
              {supports.map((item) => (
                <li key={item} className="rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-900 ring-1 ring-emerald-100">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold">Practical Takeaway</h2>
            <div className="mt-4 space-y-4 text-slate-700">
              <p>
                For long-term investors using broad ETFs like the S&amp;P 500 or Nasdaq, a market decline can be a good entry window — but only if buying is disciplined, staged, and backed by reserve cash.
              </p>
              <p className="text-slate-500">
                对于长期投资者来说，像标普 500 或纳指这种宽基 ETF 的下跌，往往是不错的建仓窗口；前提是买入要有节奏，并且保留充足现金。
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">One Guiding Sentence</h2>
            <blockquote className="mt-5 border-l-2 border-white/30 pl-4 text-lg leading-8 text-white/90">
              The goal is not to buy the bottom. The goal is to buy cheap enough and hold long enough.
            </blockquote>
            <blockquote className="mt-4 border-l-2 border-white/20 pl-4 text-base leading-7 text-white/70">
              投资不是为了买在最低点，而是买在足够便宜的位置，并持有足够久。
            </blockquote>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ label, labelZh, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{labelZh}</div>
    </div>
  );
}

function StateChip({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-2 py-3 ring-1 ring-slate-200">
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-1 text-xs font-medium text-slate-800">{value}</div>
    </div>
  );
}

function Panel({ title, titleZh, badge, children }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{titleZh}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{badge}</span>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
