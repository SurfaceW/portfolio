
export default function LeanCanvasGuidePage() {
  const highlights = [
    {
      emoji: "❤️",
      title: "Fall in love with the problem",
      desc: "Not your solution. The problem must be real, urgent, and underserved."
    },
    {
      emoji: "🎯",
      title: "Traction is the goal",
      desc: "Traction is evidence the business model is working. Everything else is secondary."
    },
    {
      emoji: "🧪",
      title: "MVP is an experiment",
      desc: "The MVP exists to test your riskiest assumption with the least possible effort."
    }
  ];

  const BlockCard = ({ num, title, emoji, desc, items }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
          <span>{emoji}</span> {title}
        </h3>
        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold">
          {num}
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-4 flex-1">{desc}</p>
      {items && items.length > 0 && (
        <ul className="space-y-1.5 mt-auto pt-3 border-t border-slate-100">
          {items.map((item, idx) => (
            <li key={idx} className="text-xs text-slate-500 flex items-start gap-1.5">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const sops = [
    {
      step: "Document Plan A",
      desc: "Before building anything, compress your entire business model onto one page. It forces clarity and surfaces hidden assumptions immediately."
    },
    {
      step: "Prioritize Risks",
      desc: "Rank your top 3 riskiest assumptions. Start with Desirability (do people want it?), then Viability (can we make money?), then Feasibility (can we build it?)."
    },
    {
      step: "Test Systematically",
      desc: "Conduct structured customer interviews to falsify assumptions. The unit of progress is a tested, falsified, or confirmed hypothesis."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <header className="text-center space-y-5 max-w-3xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Production Guide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Lean Canvas <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Continuous Innovation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            One page. One truth. Fill fast, revise often. A practical SOP to stress-test your business model before writing a single line of code.
          </p>
        </header>

        {/* Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {highlights.map((h, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="text-4xl mb-4 p-3 bg-slate-50 rounded-full">{h.emoji}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{h.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </section>

        {/* The Canvas */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-slate-900">The 9 Blocks</h2>
            <p className="text-slate-600">The core anatomy of your business model snapshot. Map your assumptions systematically.</p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm">
            {/* Top Half (5 columns on large screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Col 1 */}
              <div className="lg:row-span-2">
                <BlockCard 
                  num="1" 
                  title="Problem" 
                  emoji="🚨"
                  desc="What are the top 1-3 problems your customer has?"
                  items={["List existing alternatives", "Focus on pain points"]}
                />
              </div>
              
              {/* Col 2 */}
              <div className="lg:row-span-2 flex flex-col gap-4">
                <div className="flex-1">
                  <BlockCard 
                    num="4" 
                    title="Solution" 
                    emoji="💡"
                    desc="Simplest thing that solves the top 3 problems."
                    items={["Map directly to problems", "Keep it minimal"]}
                  />
                </div>
                <div className="flex-1">
                  <BlockCard 
                    num="8" 
                    title="Key Metrics" 
                    emoji="📈"
                    desc="What numbers tell you this is working?"
                    items={["Activation", "Retention", "Revenue"]}
                  />
                </div>
              </div>

              {/* Col 3 */}
              <div className="lg:row-span-2">
                <BlockCard 
                  num="3" 
                  title="Unique Value Prop" 
                  emoji="💎"
                  desc="Single, compelling reason why you're different and worth attention."
                  items={["High-level concept", "Focus on outcomes", "Use metaphors"]}
                />
              </div>

              {/* Col 4 */}
              <div className="lg:row-span-2 flex flex-col gap-4">
                <div className="flex-1">
                  <BlockCard 
                    num="9" 
                    title="Unfair Advantage" 
                    emoji="🛡️"
                    desc="What do you have that cannot be easily copied or bought?"
                    items={["Insider info", "Network effects", "Personal authority"]}
                  />
                </div>
                <div className="flex-1">
                  <BlockCard 
                    num="5" 
                    title="Channels" 
                    emoji="📣"
                    desc="How do you reach your early adopters?"
                    items={["Inbound channels", "Outbound channels"]}
                  />
                </div>
              </div>

              {/* Col 5 */}
              <div className="lg:row-span-2">
                <BlockCard 
                  num="2" 
                  title="Customer Segments" 
                  emoji="👥"
                  desc="Who has this problem most acutely?"
                  items={["Identify early adopters", "Be precise"]}
                />
              </div>
            </div>

            {/* Bottom Half */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <BlockCard 
                num="7" 
                title="Cost Structure" 
                emoji="💸"
                desc="What are the key costs to deliver this?"
                items={["Fixed & Variable costs", "Customer Acquisition Cost (CAC)"]}
              />
              <BlockCard 
                num="6" 
                title="Revenue Streams" 
                emoji="💰"
                desc="How does this make money?"
                items={["Revenue model", "Price point", "Lifetime Value (LTV)"]}
              />
            </div>
          </div>
        </section>

        {/* SOPs Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3">Execution SOPs</h2>
                <p className="text-slate-400 max-w-xl mx-auto">The continuous innovation framework (CIF) loop. Move fast, prioritize effectively, and validate continuously.</p>
              </div>
              
              <div className="space-y-6">
                {sops.map((sop, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-5 bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white">{sop.step}</h4>
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{sop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 pb-12 border-t border-slate-200">
          <p className="text-slate-500 font-medium">Based on Ash Maurya's <span className="text-slate-800">Running Lean</span> & standard Lean Canvas practices.</p>
          <p className="mt-2 text-sm text-slate-400">Move fast and fail fast. Progress = validated learning.</p>
        </footer>

      </div>
    </div>
  );
}
