export default function IntrinsicValuePage() {
  const highlights = [
    {
      emoji: "🔮",
      title: "Forward-Looking",
      desc: "Past profits are gone. A company's worth is entirely based on the future economic benefits it can deliver to its owners."
    },
    {
      emoji: "💸",
      title: "Cash > Profit",
      desc: "Accounting profit can be distorted. True value lies in free cash flow—the cash that can actually be taken out of the business."
    },
    {
      emoji: "📉",
      title: "Time is Money",
      desc: "$100 today is not the same as $100 in ten years. Valuation discounts future cash based on opportunity cost, risk, and inflation."
    }
  ];

  const principles = [
    {
      emoji: "🚜",
      title: "The Nature of Value",
      points: [
        "A business is a cash-generating asset, much like a farm producing crops or a property generating rent.",
        "Value is not in the object itself, but in the future economic benefits it can deliver.",
        "A compelling narrative is not value; only future cash generation creates intrinsic value."
      ]
    },
    {
      emoji: "🧮",
      title: "The Deeper Formula",
      points: [
        "Value Today = Sum of [Expected Future Cash Flow / (1 + r)^t].",
        "A business becomes more valuable when it generates more cash, sooner, with more certainty, for a longer period.",
        "Same total profits do not mean same value; earlier and safer cash flows are worth more today."
      ]
    },
    {
      emoji: "🌱",
      title: "Growth & Quality",
      points: [
        "Growth is not automatically valuable. It only adds value if the company can reinvest capital at attractive returns.",
        "High-quality businesses have high returns on capital, durable advantages, pricing power, and predictable demand.",
        "A wonderful business can still be a bad investment if the price paid is too high compared to its intrinsic value."
      ]
    },
    {
      emoji: "⚙️",
      title: "The Money Machine Model",
      points: [
        "Think of a business as a machine where you input capital, labor, and skill, and it produces cash over many years.",
        "A valuable machine produces lots of cash with little additional or maintenance capital needed.",
        "Value = discounted future cash flows. Price = what the market asks today."
      ]
    }
  ];

  const dcfExample = [
    { year: "Year 1", cashFlow: "$100", calc: "100 / 1.1", presentValue: "$90.9" },
    { year: "Year 2", cashFlow: "$100", calc: "100 / 1.1²", presentValue: "$82.6" },
    { year: "Year 3", cashFlow: "$100", calc: "100 / 1.1³", presentValue: "$75.1" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 font-sans pb-20">
      {/* Header */}
      <header className="max-w-4xl mx-auto pt-24 px-6 md:px-12 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full tracking-wide uppercase">
          Financial Philosophy
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
          A business is worth only what it can give its owners in the future.
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Not its story. Not its brand image. Not its past revenue or accounting profit. 
          What ultimately matters is: <strong className="text-slate-800 font-semibold">How much cash can this business generate over time, how reliably, and how soon?</strong>
        </p>
      </header>

      {/* Highlights */}
      <section className="max-w-5xl mx-auto mt-20 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Concepts */}
      <section className="max-w-4xl mx-auto mt-24 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core Principles of Intrinsic Value</h2>
        <div className="space-y-8">
          {principles.map((section, idx) => (
            <div key={idx} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{section.emoji}</span>
                <h3 className="text-2xl font-bold text-slate-900">{section.title}</h3>
              </div>
              <ul className="space-y-4">
                {section.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-4 items-start">
                    <span className="text-blue-500 mt-1 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </span>
                    <span className="text-slate-700 text-lg leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Example Section */}
      <section className="max-w-4xl mx-auto mt-16 px-6 md:px-12">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-blue-300">A Simple Present Value Example</h3>
          <p className="text-slate-300 mb-8 text-lg">
            Suppose a business will generate $100 for the next three years. If the discount rate is 10%, the value today is not $300. Because of the time value of money, future cash is discounted.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-4 font-medium">Timeframe</th>
                  <th className="pb-4 font-medium">Future Cash Flow</th>
                  <th className="pb-4 font-medium hidden sm:table-cell">Discount Math (10%)</th>
                  <th className="pb-4 font-medium text-right">Value Today</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-lg">
                {dcfExample.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 font-medium text-slate-300">{row.year}</td>
                    <td className="py-4 text-emerald-400">{row.cashFlow}</td>
                    <td className="py-4 text-slate-500 hidden sm:table-cell font-mono text-sm">{row.calc}</td>
                    <td className="py-4 text-right font-bold text-white">{row.presentValue}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-6 font-bold text-blue-300" colSpan={3}>Total Present Value</td>
                  <td className="py-6 text-right font-bold text-2xl text-blue-300">≈ $248.60</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-400 text-sm italic">
            Even though the future cash sums to $300, its value today is lower. That is the practical meaning of discounting.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto mt-24 px-6 text-center">
        <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-xl text-blue-900 font-medium">
            "A business is worth the cash you can get out of it, adjusted for time and uncertainty."
          </p>
          <p className="mt-2 text-blue-700/80 uppercase tracking-widest text-sm font-semibold">
            Value = Future Cash × Today's Terms
          </p>
        </div>
      </footer>
    </div>
  );
}
