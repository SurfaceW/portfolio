
export default function EDotsLeanCanvasPage() {
  const problems = [
    { label: "Scattered life fragments", detail: "Quotes, habits, travel spots, recipes end up in Notes, spreadsheets, screenshots. No single, beautiful home." },
    { label: "Lists are lifeless", detail: "No randomization, no counters, no heatmap, no gallery view. Data just sits there." },
    { label: "Hard to share & co-own", detail: "Couples and friends want shared collections. Existing tools don't support real-time co-editing without heavy platforms." },
  ];

  const alternatives = [
    "Apple Notes / Reminders — flat, no visual identity",
    "Notion — powerful but complex, not mobile-first",
    "Pinterest — consumption-focused, not personal",
    "Spreadsheets — flexible but ugly",
    "Screenshots & chat threads — unorganized default",
  ];

  const solutions = [
    { problem: "Scattered fragments", fix: "Dots + Collections — card-like units in themed groups. Multiple views: list, gallery, calendar, map. Bulk import." },
    { problem: "Lifeless lists", fix: "Randomization + Counters + Widget. Shake to get a random dot. Trigger counter with heatmap. Daily widget." },
    { problem: "Hard to share", fix: "CloudKit shared collections. One-tap invite via iCloud. Real-time co-editing. Just Apple ID." },
  ];

  const segments = [
    { label: "Personal list collectors", detail: "People maintaining quote lists, bucket lists, habit trackers in scattered apps" },
    { label: "Couples & close friends", detail: "Sharing bucket lists, travel plans, cooking ideas" },
    { label: "Apple-native quality seekers", detail: "Prefer native SwiftUI apps. Care about polish, haptics, widgets." },
  ];

  const channels = {
    inbound: ["App Store (ASO)", "Landing page + SEO", "Product Hunt launch", "Blog (arno.surfacew.com)"],
    outbound: ["Twitter/X indie dev community", "Reddit (r/apple, r/iosapps)", "Chinese communities (JiKe, Xiaohongshu)"],
    viral: ["Shared collections → new users", "Dot card sharing (watermarked)", "Daily widget exposure"],
  };

  const metrics = [
    { label: "Activation", value: "First collection + ≥3 dots created", icon: "⚡" },
    { label: "Retention", value: "Weekly dot interactions (create, edit, randomize, widget)", icon: "🔄" },
    { label: "Revenue", value: "IAP conversion rate — target 3–5% of WAU", icon: "💵" },
    { label: "North Star", value: "Dots created per week (all users)", icon: "⭐" },
  ];

  const risks = [
    { assumption: "Users pay $4.99 for sync", risk: "Sync feels like infrastructure, not premium", test: "Monitor conversion + review sentiment for 90 days" },
    { assumption: "\"Dots\" concept is intuitive", risk: "Novel metaphor — may confuse new users", test: "Watch activation rate + 5 hands-on user tests" },
    { assumption: "App Store organic drives installs", risk: "ASO is competitive, list category crowded", test: "Track keyword rankings + $100 Apple Search Ads test" },
    { assumption: "Shared collections drive virality", risk: "IAP gate on invitees kills the loop", test: "Track invite → install → conversion funnel" },
    { assumption: "Solo indie sustains velocity", risk: "Burnout across iOS + macOS + marketing", test: "90-day self-check: still shipping weekly?" },
  ];

  const advantages = [
    { label: "You are the user", detail: "Daily use with Vicky → authentic product intuition" },
    { label: "Apple-native craft", detail: "Pure SwiftUI — haptics, widgets, Liquid Glass, shake gestures" },
    { label: "Bilingual reach", detail: "Native access to English + Chinese Apple markets" },
    { label: "1000+ commits of polish", detail: "Accumulated craft is a time-based moat" },
  ];

  const traction = [
    { target: "500+", label: "organic installs" },
    { target: "25+", label: "paying users (~$125 rev)" },
    { target: "50+", label: "weekly active users" },
    { target: "10+", label: "shared collections" },
    { target: "4.5+", label: "App Store rating" },
  ];

  const SectionTitle = ({ children, sub }) => (
    <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{children}</h2>
      {sub && <p className="text-slate-500 text-sm sm:text-base">{sub}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <header className="text-center space-y-5 max-w-3xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 font-semibold rounded-full text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Lean Canvas v1
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            eDots
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Business Model
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            A beautiful home for your life's dots — log, randomize, and share personal collections with the care of a native Apple app.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 bg-white rounded-full border border-slate-200">iOS + iPadOS + macOS</span>
            <span className="px-3 py-1 bg-white rounded-full border border-slate-200">SwiftUI Native</span>
            <span className="px-3 py-1 bg-white rounded-full border border-slate-200">CloudKit Sync</span>
            <span className="px-3 py-1 bg-white rounded-full border border-slate-200">Freemium + IAP</span>
          </div>
        </header>

        {/* Problem + Alternatives */}
        <section>
          <SectionTitle sub="What pain does eDots solve?">1 — Problem</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {problems.map((p, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <h3 className="font-bold text-slate-800">{p.label}</h3>
                </div>
                <p className="text-sm text-slate-600">{p.detail}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-100 rounded-xl p-5">
            <h4 className="font-semibold text-slate-700 text-sm mb-3">Existing alternatives</h4>
            <div className="flex flex-wrap gap-2">
              {alternatives.map((a, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-white rounded-full border border-slate-200 text-slate-600">{a}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Segments */}
        <section>
          <SectionTitle sub="Apple-ecosystem users collecting personal life content. Ages 20–40, design-conscious.">2 — Customer Segments</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {segments.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-lg">👤</span> {s.label}
                </h3>
                <p className="text-sm text-slate-600">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">Market priority: Global (English-speaking) first, bilingual Chinese from day one.</p>
        </section>

        {/* UVP */}
        <section>
          <SectionTitle>3 — Unique Value Proposition</SectionTitle>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <blockquote className="text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed mb-4">
              "A beautiful home for your life's dots — log, randomize, and share your personal collections with the care of a native Apple app."
            </blockquote>
            <p className="text-sm text-slate-500 italic">Pinterest meets Apple Reminders — but for personal, interactive collections you actually revisit.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-slate-700">
              <span className="flex items-center gap-1.5"><span className="text-amber-500">●</span> Log & accumulate</span>
              <span className="flex items-center gap-1.5"><span className="text-orange-500">●</span> Interact & revisit</span>
              <span className="flex items-center gap-1.5"><span className="text-red-400">●</span> Connect & share</span>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section>
          <SectionTitle sub="Mapping each problem to the simplest fix.">4 — Solution</SectionTitle>
          <div className="space-y-4 max-w-4xl mx-auto">
            {solutions.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">P{i + 1}</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{s.problem}</h4>
                  <p className="text-sm text-slate-600">{s.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Channels */}
        <section>
          <SectionTitle sub="Primary bet: App Store organic + Twitter/X indie community.">5 — Channels</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Inbound", emoji: "📥", items: channels.inbound },
              { title: "Outbound", emoji: "📤", items: channels.outbound },
              { title: "Built-in Virality", emoji: "🔗", items: channels.viral },
            ].map((group, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span>{group.emoji}</span> {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue + Cost */}
        <section>
          <SectionTitle>6 & 7 — Revenue & Costs</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span>💰</span> Revenue Streams</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-xs font-semibold text-green-700 mb-1">Phase 1 — Now</div>
                  <div className="text-lg font-bold text-slate-800">$4.99 one-time IAP</div>
                  <div className="text-sm text-slate-600">iCloud Sync & Shared Collections</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-xs font-semibold text-blue-700 mb-1">Phase 2 — V2.0</div>
                  <div className="text-lg font-bold text-slate-800">Subscription tier</div>
                  <div className="text-sm text-slate-600">AI dot generation, chat with dots, photo-to-dot</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span>💸</span> Cost Structure</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Apple Developer Program</span>
                  <span className="text-sm font-semibold text-slate-800">$99/yr</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Domain + hosting</span>
                  <span className="text-sm font-semibold text-slate-800">~$20/yr</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">CloudKit / infrastructure</span>
                  <span className="text-sm font-semibold text-slate-800">$0</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">App Store commission</span>
                  <span className="text-sm font-semibold text-slate-800">15%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-bold text-slate-700">Total fixed burn</span>
                  <span className="text-sm font-bold text-slate-900">&lt; $150/yr</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <SectionTitle sub="What numbers tell you eDots is working?">8 — Key Metrics</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm text-center">
                <div className="text-3xl mb-2">{m.icon}</div>
                <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">{m.label}</div>
                <p className="text-sm text-slate-700">{m.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Unfair Advantage */}
        <section>
          <SectionTitle>9 — Unfair Advantage</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {advantages.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{a.label}</h4>
                  <p className="text-sm text-slate-600">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Stack */}
        <section>
          <SectionTitle sub="Top assumptions ranked by riskiness.">Risk Priority Stack</SectionTitle>
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-amber-500 opacity-10 blur-3xl"></div>
            <div className="relative z-10 space-y-4">
              {risks.map((r, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center font-bold text-red-300 text-sm">
                    R{i + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-white">{r.assumption}</h4>
                    <p className="text-sm text-slate-400">{r.risk}</p>
                    <p className="text-xs text-amber-300">Test: {r.test}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 90-Day Traction */}
        <section>
          <SectionTitle sub="What specific evidence proves eDots is working in 90 days?">90-Day Traction Goal</SectionTitle>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {traction.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm text-center min-w-[140px]">
                <div className="text-2xl font-extrabold text-amber-600 mb-1">{t.target}</div>
                <div className="text-xs text-slate-500">{t.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6 max-w-xl mx-auto">
            Minimum bar: 200+ installs, 10+ paying users with positive reviews. Below that → pivot monetization or rethink positioning.
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 pb-12 border-t border-slate-200">
          <p className="text-slate-500 font-medium">eDots Lean Canvas — v1 · March 2026</p>
          <p className="mt-2 text-sm text-slate-400">One page. One truth. Revise often.</p>
        </footer>

      </div>
    </div>
  );
}
