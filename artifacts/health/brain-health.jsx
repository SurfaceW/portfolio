export default function BrainAgingBilingualPage() {
  const principles = [
    {
      enTitle: "1. Protect blood vessels",
      zhTitle: "1. 保护脑血管与心血管健康",
      en: "Control blood pressure, blood sugar, cholesterol, smoking, alcohol, and weight. What protects the heart often protects the brain.",
      zh: "控制血压、血糖、胆固醇、吸烟、饮酒与体重。保护心血管，通常也就是在保护大脑。",
      icon: "❤️",
    },
    {
      enTitle: "2. Move your body regularly",
      zhTitle: "2. 规律运动",
      en: "Aim for regular walking, aerobic exercise, and strength training. Physical activity supports memory, mood, sleep, and overall brain health.",
      zh: "坚持步行、有氧运动与力量训练。身体活动有助于记忆、情绪、睡眠和整体脑健康。",
      icon: "🚶",
    },
    {
      enTitle: "3. Sleep well",
      zhTitle: "3. 保证高质量睡眠",
      en: "Good sleep helps the brain recover, regulate mood, and maintain cognitive function. Treat long-term insomnia or sleep apnea early.",
      zh: "良好的睡眠有助于大脑恢复、调节情绪并维持认知功能。长期失眠或睡眠呼吸暂停应尽早处理。",
      icon: "🌙",
    },
    {
      enTitle: "4. Protect hearing and vision",
      zhTitle: "4. 重视听力与视力",
      en: "Untreated hearing or vision loss can increase cognitive strain and reduce social engagement. Early support can help.",
      zh: "未处理的听力或视力下降会增加认知负担，并减少社交参与。及早干预会有帮助。",
      icon: "👂",
    },
    {
      enTitle: "5. Stay social and keep learning",
      zhTitle: "5. 保持社交与持续学习",
      en: "Meaningful relationships, conversation, reading, learning, music, language, and mentally challenging activities all help keep the brain engaged.",
      zh: "有意义的人际关系、交流、阅读、学习、音乐、语言训练以及有挑战性的脑力活动，都能让大脑保持活跃。",
      icon: "🧠",
    },
    {
      enTitle: "6. Eat a solid long-term diet",
      zhTitle: "6. 长期保持良好饮食",
      en: "A balanced Mediterranean-style pattern with vegetables, fruit, whole grains, beans, fish, nuts, and healthy fats is a practical direction.",
      zh: "以蔬菜、水果、全谷物、豆类、鱼类、坚果和健康脂肪为主的地中海式饮食，是较实际的方向。",
      icon: "🥗",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            <span>Brain Health</span>
            <span>·</span>
            <span>脑健康</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">How to Slow Brain Aging</h1>
          <h2 className="mt-2 text-2xl font-semibold text-slate-700">如何尽量放慢大脑衰老</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
            A realistic goal is not to keep a literally young brain forever, but to preserve function,
            sharpness, independence, and quality of life for as long as possible.
          </p>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            更现实的目标，不是让大脑永远“年轻”，而是尽可能长期保持功能、清晰度、独立性和生活质量。
          </p>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {principles.map((item) => (
            <div
              key={item.enTitle}
              className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-transform hover:-translate-y-0.5"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{item.enTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.en}</p>
              <h4 className="mt-4 text-lg font-semibold text-slate-800">{item.zhTitle}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.zh}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h3 className="text-2xl font-bold">What matters most / 最重要的原则</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-base font-semibold">English</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                There is probably no single magic trick. The best strategy is a combined lifestyle:
                vascular health, movement, sleep, social connection, mental challenge, and steady habits over many years.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-base font-semibold">中文</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                大概率不存在单一“秘诀”。最有效的方式，是把心血管健康、运动、睡眠、社交、认知挑战和长期稳定习惯结合起来。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
          <h3 className="text-2xl font-bold">A realistic message to share</h3>
          <p className="mt-4 text-base leading-7 text-slate-200">
            We may not stop brain aging completely, but we can often slow decline and improve the chance of staying mentally sharp even in old age.
          </p>
          <p className="mt-3 text-base leading-7 text-slate-200">
            我们未必能完全阻止大脑衰老，但通常可以放慢下降速度，并提高在高龄时依然保持头脑清晰的机会。
          </p>
        </section>
      </div>
    </div>
  );
}
