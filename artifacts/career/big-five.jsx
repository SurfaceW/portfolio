export default function BigFivePage() {
  const highlights = [
    ["🧠", "Openness / 开放性", "Intellect, curiosity, creativity"],
    ["⚡", "Extraversion / 外倾性", "Outgoing, energetic, engaging"],
    ["🎭", "Emotionality / 情绪性", "Calm, resilient, self-control"],
    ["🤝", "Agreeableness / 宜人性", "Warm, trusting, cooperative"],
    ["📐", "Conscientiousness / 责任感", "Reliable, principled, diligent"]
  ]

  const sections = [
    {
      emoji: "🧠",
      titleEn: "Openness (Intellect)",
      titleZh: "开放性 Intellect",
      taglineEn: "Innovation, openness, wisdom, IQ",
      taglineZh: "创新开放、智慧、智力、IQ",
      points: [
        { en: "Interest in the new: curiosity and pursuit of the unknown.", zh: "对新事物感兴趣：新事物代表未知，对未知的执着追求展现「好奇心」。" },
        { en: "Interest in knowledge: engaging with human wisdom and thinking; broad, flexible use of knowledge.", zh: "对知识感兴趣：知识是前人智慧结晶；知识丰富、灵活运用、拓展精神视野。" },
        { en: "Interest in the arts: appreciation of beauty and culture; aesthetic and emotional intelligence.", zh: "对艺术感兴趣：艺术是人类文明结晶，对美的欣赏与感受，培养审美与生活情趣。" },
        { en: "Thoughtful, imaginative, creative, open to non‑traditional ideas — To build something truly different, we need to work in a truly different way!", zh: "勤于思考，富有想象力、创造力、创新力，以及对非传统观念的赞赏。" }
      ]
    },
    {
      emoji: "⚡",
      titleEn: "Extraversion",
      titleZh: "外倾性 Extraversion",
      taglineEn: "Outgoing, attractive, infectious energy",
      taglineZh: "外向，吸引力，感染力",
      points: [
        { en: "Talkative, lively, with genuine humor (expressive, animated, enjoys presence).", zh: "健谈、活泼而富有幽默感（面部表情丰富，容易激动，喜欢 POSES）。" },
        { en: "Loves connecting: enjoys meeting diverse people and new roles.", zh: "热爱交友：喜欢和不同类型的人、新鲜的角色交往。" },
        { en: "Decisive and optimistic: positive attraction.", zh: "果断乐观：积极的吸引力法则。" }
      ]
    },
    {
      emoji: "🎭",
      titleEn: "Emotionality (Stability)",
      titleZh: "情绪性 Emotionality",
      taglineEn: "Awareness, control, emotional stability, will",
      taglineZh: "意识控制、情绪稳定、意志",
      points: [
        { en: "Emotionally rational; calm under pressure.", zh: "情绪理性化，遇事冷静。" },
        { en: "High EQ: skilled in the art of relating; gets along well with others.", zh: "高情商，懂得交往的艺术，能够与他人相处和睦和愉快。" },
        { en: "Optimism: turning setbacks into growth; dancing in the rain.", zh: "乐观性，能够化解挫折，化干戈为玉帛；对抗压力的能力（雨中舞步）。" }
      ]
    },
    {
      emoji: "🤝",
      titleEn: "Agreeableness",
      titleZh: "宜人性 Agreeableness",
      taglineEn: "Warmth, pleasantness, acceptance",
      taglineZh: "友善愉快、可接受的程度",
      points: [
        { en: "Compassion and empathy in action.", zh: "同情心和同理心的使用。" },
        { en: "Straightforward, honest, sincere with others.", zh: "直率，为人正直，真心诚意对待他人。" },
        { en: "Holding the best of humanity: love.", zh: "心中有人性最美的东西：爱。" }
      ]
    },
    {
      emoji: "📐",
      titleEn: "Conscientiousness",
      titleZh: "责任感 Conscientiousness",
      taglineEn: "Responsibility, integrity, conscience",
      taglineZh: "责任意识、正义和良知",
      points: [
        { en: "Integrity: capable, follow through; more action, less talk.", zh: "诚信：有能力，说到做到，多行动，少吹擂。" },
        { en: "Responsible: honest, reliable, trustworthy.", zh: "有责任心：诚实、可靠、可信赖、可依赖。" },
        { en: "Upholding moral principles; attentive to detail.", zh: "坚守道德的原则；认真，关注事情细节。" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Header */}
        <header className="mb-12 text-center">
          <span className="inline-block rounded-full bg-slate-200/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-600">
            Personality · 人格
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Big Five
          </h1>
          <p className="mt-2 max-w-xl mx-auto text-slate-600 leading-relaxed">
            Five broad dimensions of personality — in English & 中文.
          </p>
        </header>

        {/* Highlights */}
        <section className="mb-14">
          <h2 className="sr-only">The five dimensions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {highlights.map(([emoji, title, desc], i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <span className="text-2xl" role="img" aria-hidden>{emoji}</span>
                <h3 className="mt-2 font-semibold text-slate-800 text-sm">{title}</h3>
                <p className="mt-1 text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main sections */}
        <section className="space-y-8">
          {sections.map((sec, i) => (
            <article
              key={i}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl" role="img" aria-hidden>{sec.emoji}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 text-lg">
                    {sec.titleEn} <span className="text-slate-500 font-normal">/ {sec.titleZh}</span>
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 italic">
                    {sec.taglineEn} · {sec.taglineZh}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {sec.points.map((p, j) => (
                      <li key={j} className="flex flex-col gap-1 text-sm leading-relaxed">
                        <span className="text-slate-700">{p.en}</span>
                        <span className="text-slate-600">{p.zh}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-14 text-center text-sm text-slate-500">
          Big Five personality traits — Openness, Extraversion, Emotionality, Agreeableness, Conscientiousness.
        </footer>
      </div>
    </div>
  )
}
