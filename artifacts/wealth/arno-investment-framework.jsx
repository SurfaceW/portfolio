export default function ArnoInvestmentCanvasPage() {
  const principles = [
    { title: '简单优于复杂', en: 'Simple > Complex', desc: '投资框架越简单，越容易长期执行；复杂往往掩盖风险。', icon: '🧩' },
    { title: '长期优于短期', en: 'Long-term > Short-term', desc: '真正的复利来自长期持有与耐心等待，而不是频繁交易。', icon: '⏳' },
    { title: '增速非常重要', en: 'Growth Matters', desc: '高质量增长是估值抬升和长期回报的重要来源。', icon: '📈' },
    { title: '垄断利益最大化', en: 'Monopoly Advantage', desc: '拥有护城河与定价权的公司，更容易持续创造超额回报。', icon: '🏰' },
  ];

  const strategic = [
    '宏观全局意识在心 Macro Awareness',
    '不做没有把握的决定 Circle of Competence',
    '第二增长曲线原则 Second Growth Curve',
    '坚持价值投资原则 Value Investing',
    '多元分析原则 Multidisciplinary Thinking',
  ];

  const research = [
    {
      title: '宏观 Macro',
      items: ['经济周期', '货币政策', '地缘政治', '资本流向'],
    },
    {
      title: '行业 Industry',
      items: ['产业格局', '竞争壁垒', '供需关系', '长期空间'],
    },
    {
      title: '心理 Sentiment',
      items: ['市场情绪', '风险偏好', '行为偏差', '群体预期'],
    },
    {
      title: '微观 Micro',
      items: ['公司基本面', '财务质量', '管理层能力', '技术指标'],
    },
  ];

  const execution = [
    { title: '建仓策略', desc: '分批建仓，避免一次性重仓，给判断留出修正空间。' },
    { title: '风险管理', desc: '设置止损、补仓、对冲与仓位边界，先考虑活下来。' },
    { title: '退出策略', desc: '当逻辑证伪、估值透支或更优机会出现时，纪律性退出。' },
  ];

  const loop = [
    '建立投资实体档案',
    '记录假设与驱动因子',
    '跟踪执行与结果',
    '定期复盘与迭代',
  ];

  const risks = [
    '杠铃策略 Barbell Strategy',
    '黑天鹅防御 Black Swan Defense',
    '充足准备金 Reserve Capital',
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
        <section className="mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-8 shadow-2xl md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-300">
            <span>🧠</span>
            <span>Arno Investment OS</span>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Arno 的投资范式
                <span className="mt-2 block text-neutral-400 text-2xl md:text-3xl">Investment Philosophy Canvas</span>
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-300 md:text-lg">
                一套以长期主义、价值判断、增长驱动、风险控制为核心的投资操作系统。
                从理念出发，到研究、执行、风控与复盘，形成完整闭环。
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-400">Framework</div>
              <div className="mt-4 space-y-3 text-sm text-neutral-200">
                <div className="rounded-2xl bg-white/5 px-4 py-3">Philosophy → Strategy → Research</div>
                <div className="rounded-2xl bg-white/5 px-4 py-3">Execution → Risk → Review</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="text-2xl">✨</div>
            <h2 className="text-2xl font-semibold md:text-3xl">四大核心法则</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/10 bg-neutral-900 p-6 shadow-lg shadow-black/20">
                <div className="text-3xl">{item.icon}</div>
                <div className="mt-4 text-xl font-semibold">{item.title}</div>
                <div className="mt-1 text-sm text-emerald-300">{item.en}</div>
                <p className="mt-4 text-sm leading-6 text-neutral-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-white/10 bg-neutral-900 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <h3 className="text-2xl font-semibold">战略思考层</h3>
            </div>
            <div className="grid gap-3">
              {strategic.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-neutral-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-neutral-900 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <h3 className="text-2xl font-semibold">风险系统</h3>
            </div>
            <div className="space-y-4">
              {risks.map((item) => (
                <div key={item} className="rounded-2xl border border-amber-400/10 bg-amber-400/5 px-4 py-4 text-neutral-100">
                  {item}
                </div>
              ))}
              <div className="rounded-2xl border border-red-400/10 bg-red-400/5 p-4 text-sm leading-6 text-neutral-300">
                保持足够现金与安全垫，以应对系统性风险、估值收缩与 50%+ 的极端下跌。
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[30px] border border-white/10 bg-neutral-900 p-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl">🔬</span>
            <h3 className="text-2xl font-semibold">投资研究框架</h3>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {research.map((block) => (
              <div key={block.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="text-lg font-semibold text-white">{block.title}</div>
                <div className="mt-4 space-y-2">
                  {block.items.map((sub) => (
                    <div key={sub} className="rounded-xl bg-black/20 px-3 py-2 text-sm text-neutral-300">
                      {sub}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[30px] border border-white/10 bg-neutral-900 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <h3 className="text-2xl font-semibold">执行层</h3>
            </div>
            <div className="space-y-4">
              {execution.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-neutral-900 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl">♻️</span>
              <h3 className="text-2xl font-semibold">复盘与进化</h3>
            </div>
            <div className="space-y-3">
              {loop.map((item, idx) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm text-emerald-300">
                    {idx + 1}
                  </div>
                  <div className="pt-1 text-sm leading-6 text-neutral-200">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 p-7">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-400">Operating Flow</div>
              <div className="mt-2 text-xl font-semibold">Philosophy</div>
            </div>
            <div className="text-2xl text-neutral-500">→</div>
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-400">Step 2</div>
              <div className="mt-2 text-xl font-semibold">Research</div>
            </div>
            <div className="text-2xl text-neutral-500">→</div>
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-400">Step 3</div>
              <div className="mt-2 text-xl font-semibold">Execution</div>
            </div>
            <div className="text-2xl text-neutral-500">→</div>
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-400">Step 4</div>
              <div className="mt-2 text-xl font-semibold">Review & Improve</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
