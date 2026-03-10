export default function RagdollCatLifestyleGuide() {
  const sections = [
    {
      emoji: "😺",
      titleEn: "What Ragdolls Are Like",
      titleZh: "布偶猫是什么样",
      pointsEn: [
        "Gentle, affectionate, and very human-oriented.",
        "Usually calm indoors and enjoy staying close to family.",
        "They often prefer soft routines and a peaceful environment."
      ],
      pointsZh: [
        "性格温和、黏人，也很依赖人。",
        "通常在室内比较安静，喜欢待在家人身边。",
        "它们往往喜欢稳定的日常和安静的环境。"
      ]
    },
    {
      emoji: "🏠",
      titleEn: "Ideal Home Life",
      titleZh: "理想的居家生活",
      pointsEn: [
        "Keep them as indoor cats for safety.",
        "Provide cat trees, soft beds, and a few hiding corners.",
        "They enjoy clean, comfortable, low-stress spaces."
      ],
      pointsZh: [
        "最好作为室内猫饲养，更安全。",
        "准备猫爬架、柔软猫窝，以及几个可躲藏的小角落。",
        "它们喜欢干净、舒适、低压力的环境。"
      ]
    },
    {
      emoji: "🍗",
      titleEn: "Food & Water",
      titleZh: "饮食与喝水",
      pointsEn: [
        "Feed balanced, high-quality cat food.",
        "Fresh water should always be available.",
        "Watch weight carefully because Ragdolls can become less active."
      ],
      pointsZh: [
        "喂食营养均衡、质量可靠的猫粮。",
        "始终提供干净的新鲜饮水。",
        "注意体重管理，因为布偶猫有时活动量偏低。"
      ]
    },
    {
      emoji: "🪮",
      titleEn: "Daily Care",
      titleZh: "日常护理",
      pointsEn: [
        "Brush the coat regularly to reduce loose hair and tangles.",
        "Trim nails and check ears from time to time.",
        "Clean the litter box often because they like tidy spaces."
      ],
      pointsZh: [
        "定期梳毛，减少浮毛和打结。",
        "定期剪指甲，也偶尔检查耳朵状况。",
        "勤清理猫砂盆，因为它们通常喜欢整洁的空间。"
      ]
    },
    {
      emoji: "🎾",
      titleEn: "Play & Companionship",
      titleZh: "玩耍与陪伴",
      pointsEn: [
        "They need gentle play, not only sleeping all day.",
        "Interactive toys and short daily play sessions are helpful.",
        "Ragdolls usually thrive when they receive steady attention and companionship."
      ],
      pointsZh: [
        "它们需要温和的互动玩耍，不是整天只睡觉。",
        "互动玩具和每天简短的游戏时间都很有帮助。",
        "稳定的陪伴和关注，通常会让布偶猫状态更好。"
      ]
    },
    {
      emoji: "💛",
      titleEn: "Emotional Style",
      titleZh: "情绪与相处风格",
      pointsEn: [
        "Many Ragdolls like following people from room to room.",
        "They are often sensitive to household mood and rhythm.",
        "A stable, kind, and predictable home helps them feel secure."
      ],
      pointsZh: [
        "很多布偶猫喜欢跟着人从一个房间走到另一个房间。",
        "它们往往对家庭氛围和生活节奏比较敏感。",
        "稳定、温和、可预期的家庭环境会让它们更有安全感。"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border px-4 py-2 mb-4">
            <span>🐾</span>
            <span className="text-sm font-medium">Simple Pet Guide · 简单养猫指南</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Ragdoll Cat Lifestyle Guide</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 mb-4">布偶猫生活方式指南</h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-600 leading-8">
            A clean and simple webpage to show how Ragdoll cats usually live, rest, play, and bond with people. <br />
            一个简洁的小网页，用来展示布偶猫通常如何生活、休息、玩耍，以及如何与人建立亲密关系。
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            ["😴", "Soft routine", "温和规律"],
            ["🏡", "Indoor comfort", "室内舒适"],
            ["🤍", "Human bonding", "亲人陪伴"]
          ].map(([emoji, en, zh]) => (
            <div key={en} className="bg-white rounded-2xl shadow-sm border p-5 text-center">
              <div className="text-3xl mb-3">{emoji}</div>
              <div className="font-semibold text-lg">{en}</div>
              <div className="text-slate-500 mt-1">{zh}</div>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.titleEn} className="bg-white rounded-3xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{section.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold">{section.titleEn}</h3>
                  <p className="text-slate-500">{section.titleZh}</p>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm uppercase tracking-wide text-slate-400 mb-2">English</div>
                  <ul className="space-y-2 text-slate-700 list-disc pl-5">
                    {section.pointsEn.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-wide text-slate-400 mb-2">中文</div>
                  <ul className="space-y-2 text-slate-700 list-disc pl-5">
                    {section.pointsZh.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-10 bg-slate-900 text-white rounded-3xl p-6 md:p-8">
          <div className="text-xl font-semibold mb-3">Quick Reminder · 小提醒</div>
          <p className="text-slate-200 leading-8">
            Ragdolls are usually sweet and relaxed, but each cat still has its own personality. <br />
            布偶猫通常温柔放松，但每一只猫依然都有自己的独特性格。
          </p>
        </footer>
      </div>
    </div>
  )
}
