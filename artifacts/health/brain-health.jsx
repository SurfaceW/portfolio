const priorityStack = [
  {
    rank: "01",
    title: "Sleep quality",
    zh: "睡眠质量",
    body: "The brain's repair window. Prioritize consistent sleep, insomnia treatment, and sleep apnea screening when symptoms exist.",
    note: "影响激素、炎症、情绪调节和大脑清理。",
  },
  {
    rank: "02",
    title: "Zone 2 cardio + strength",
    zh: "Zone 2 有氧 + 抗阻训练",
    body: "Cardio supports blood flow, gray matter, mood, and memory. Strength training protects muscle, insulin sensitivity, and long-term independence.",
    note: "目标：每周约 120 分钟适度运动，外加 2-3 次力量训练。",
  },
  {
    rank: "03",
    title: "Waist, blood pressure, glucose, lipids",
    zh: "腰围、血压、血糖、血脂",
    body: "The heart-brain connection is central: what protects blood vessels usually protects the brain.",
    note: "LDL 低一点，HDL 高一点；控制血压、血糖和体重。",
  },
  {
    rank: "04",
    title: "Mediterranean-style eating",
    zh: "地中海式饮食",
    body: "Build meals around vegetables, fruit, beans, whole grains, fish, nuts, olive oil, protein, and enough fiber.",
    note: "吃掉盘子里的彩虹，喂养更多样的肠道菌群。",
  },
  {
    rank: "05",
    title: "Connection + learning",
    zh: "社交连接 + 持续学习",
    body: "Healthy relationships buffer stress. Novel learning strengthens attention, memory, and neural connections.",
    note: "孤独会放大炎症和压力反应；新事物会唤醒多巴胺和专注。",
  },
  {
    rank: "06",
    title: "Low-friction prevention",
    zh: "低成本预防",
    body: "Dental health, vaccines, cancer screening, hearing and vision support, and smoke avoidance are often underestimated.",
    note: "不要只追求补剂，先把基础风险降下来。",
  },
];

const mechanisms = [
  {
    icon: "🫀",
    title: "Heart first, brain follows",
    zh: "心脏年轻，大脑才更容易年轻",
    points: [
      "控制血压、血脂、血糖、体重和吸烟风险。",
      "运动改善血液循环、激素、神经化学物质和情绪。",
      "吸烟与二手烟会同时伤害心脑血管和情绪系统。",
    ],
  },
  {
    icon: "🧹",
    title: "Keep the brain clean",
    zh: "减少大脑垃圾与炎症",
    points: [
      "睡眠、运动、学习新事物，都是大脑清理和重建的基础动作。",
      "慢性压力带来长期皮质醇，可能放大炎症、焦虑、抑郁和记忆下降。",
      "空气污染、烟草残留和毒素暴露也要尽量减少。",
    ],
  },
  {
    icon: "🛡️",
    title: "Balance immunity",
    zh: "免疫系统是隐形守护者",
    points: [
      "健康免疫不是越强越好，而是足够平衡。",
      "维生素 D、运动、睡眠、疫苗和口腔健康都属于免疫基础设施。",
      "长期炎症会影响心血管、肠道、情绪和认知。",
    ],
  },
  {
    icon: "🦠",
    title: "Feed the gut-brain axis",
    zh: "照顾肠道菌群",
    points: [
      "膳食纤维、多彩植物、豆类、坚果和全谷物支持菌群多样性。",
      "丁酸盐等代谢产物具有抗炎和保护脑细胞的潜力。",
      "不健康肠道可能破坏屏障，使炎症和毒素负担上升。",
    ],
  },
];

const weeklyProtocol = [
  {
    title: "Move",
    zh: "动起来",
    actions: [
      "每天尽量步行 30 分钟，不能连续也没关系。",
      "每周 3-5 次 Zone 2 有氧；很忙时先做 10 分钟。",
      "每周 2-3 次抗阻训练，重点照顾腿部、背部、推拉和核心。",
    ],
  },
  {
    title: "Eat",
    zh: "吃得像在保护血管",
    actions: [
      "每周安排富含 omega-3 的鱼：鲑鱼、沙丁鱼、鲭鱼、鳕鱼、鲱鱼或鳟鱼。",
      "日常脂肪优先：特级初榨橄榄油、牛油果、核桃、亚麻籽、奇亚籽。",
      "固定五类健脑食物：鱼、牛油果、坚果、蓝莓、十字花科蔬菜。",
    ],
  },
  {
    title: "Recover",
    zh: "恢复神经系统",
    actions: [
      "保持稳定作息，关注睡醒后的精神状态，而不只看睡眠时长。",
      "压力上来时做 2-5 分钟呼吸：吸入安宁，呼出焦虑。",
      "每周安排真正放松的社交、自然光和低屏幕时间。",
    ],
  },
  {
    title: "Challenge",
    zh: "给大脑交叉训练",
    actions: [
      "持续学习一个有难度的新东西：语言、音乐、写作、编程、舞蹈或复杂阅读。",
      "训练专注力：设定目标，逐步增加单次专注时间和重复次数。",
      "把乐观当作可训练技能：选择一个人，刻意关注你欣赏和关心的部分。",
    ],
  },
];

const foodMap = [
  ["Protein", "鱼、蛋、豆类、酸奶、瘦肉：维护肌肉和代谢健康。"],
  ["Fiber", "蔬菜、水果、豆类、全谷物：喂养肠道菌群。"],
  ["Healthy fats", "橄榄油、牛油果、坚果、深海鱼：保护心脑血管。"],
  ["Color", "蓝莓、番茄、彩椒、羽衣甘蓝、西蓝花：让盘子有彩虹。"],
];

const riskChecks = [
  "血压",
  "血脂",
  "血糖 / 胰岛素敏感性",
  "腰围 / 体脂",
  "睡眠呼吸暂停",
  "听力 / 视力",
  "牙齿和牙周健康",
  "疫苗和癌症筛查",
  "吸烟、二手烟、三手烟",
  "长期孤独与慢性压力",
];

function SectionTitle({ eyebrow, title, subtitle, dark = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase ${dark ? "text-emerald-300" : "text-emerald-700"}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-bold md:text-4xl ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {subtitle ? <p className={`mt-3 text-base leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p> : null}
    </div>
  );
}

export default function BrainAgingBilingualPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <header className="border-b border-slate-200 pb-10">
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
            Brain Health · 抗衰大脑
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold text-slate-950 md:text-6xl">
            Slow brain aging by protecting the whole system.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            大脑抗衰不是一个神奇补剂，而是一套组合拳：睡眠修复、心脑血管、运动、饮食、免疫、肠道、压力、社交和持续学习。
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {["先保睡眠", "再保血管", "长期训练"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </header>

        <section className="py-12">
          <SectionTitle
            eyebrow="Priority stack"
            title="The highest ROI anti-brain-aging strategy"
            subtitle="The boring basics are the highest leverage. Use supplements only as an optional layer after the foundation is working."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {priorityStack.map((item) => (
              <article key={item.rank} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">{item.rank}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-base font-semibold text-emerald-800">{item.zh}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
                    <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900">{item.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionTitle
            eyebrow="Mechanisms"
            title="What the book notes reduce to"
            subtitle="A simpler mental model: protect vessels, reduce chronic inflammation, keep the immune system balanced, and keep the brain learning."
          />
          <div className="mt-7 grid gap-4 lg:grid-cols-4">
            {mechanisms.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-emerald-800">{item.zh}</p>
                <ul className="mt-4 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="text-sm leading-6 text-slate-600">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-slate-950 p-6 text-white md:p-8">
          <SectionTitle
            eyebrow="Weekly protocol"
            title="A practical brain-care loop"
            subtitle="把大原则压缩成每周能执行的动作。目标不是完美，而是稳定复利。"
            dark
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {weeklyProtocol.map((group) => (
              <article key={group.title} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-bold">{group.title}</h3>
                <p className="mt-1 text-sm font-semibold text-emerald-300">{group.zh}</p>
                <ul className="mt-4 space-y-3">
                  {group.actions.map((action) => (
                    <li key={action} className="text-sm leading-6 text-slate-200">
                      {action}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Food rule"
              title="Eat for vessels, gut, muscle, and inflammation"
              subtitle="地中海式饮食、DASH 饮食和高纤维饮食的交集，就是最适合长期执行的方向。"
            />
          </div>
          <div className="grid gap-3">
            {foodMap.map(([label, text]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-950">{label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase text-rose-700">Risk checklist</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Do not miss the quiet risks</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Many brain-health risks are indirect. They look like cardiovascular, metabolic, dental, sensory, social, or environmental problems before they look like memory problems.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {riskChecks.map((risk) => (
              <div key={risk} className="rounded-md bg-slate-100 px-3 py-3 text-sm font-medium leading-5 text-slate-700">
                {risk}
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-10">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-2xl font-bold text-slate-950">Core summary</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              抗衰大脑的本质：减少慢性损伤，提升修复能力，保持神经系统持续被温和挑战。先睡好、动起来、护血管、吃得干净、练肌肉、保持连接，再考虑补剂。
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
