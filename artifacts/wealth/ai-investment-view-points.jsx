export default function AiInvestmentViewPointsPage() {
  const highlights = [
    {
      emoji: "🎯",
      title: "From Story to Proof",
      desc: "The market now asks for monetization, ROI, and durable moats, not AI slogans."
    },
    {
      emoji: "⚖️",
      title: "Clearer Winners and Losers",
      desc: "AI beneficiaries are separating from thin software layers with weak defensibility."
    },
    {
      emoji: "🔁",
      title: "Business Model Rewrite",
      desc: "Software is shifting from seat pricing to agent and outcome-based economics."
    }
  ];

  const crossConferenceSignals = [
    "AI spending is judged by payback, not by narrative momentum.",
    "Compute is treated as productive capacity tied to token and inference revenue.",
    "Coding remains the strongest early enterprise AI use case with visible ROI.",
    "The path is moving from copilots to autonomous agents, then to physical AI.",
    "Durable value is moving toward workflow ownership, proprietary data, and trust."
  ];

  const companyTakeaways = [
    {
      company: "Anthropic",
      thesis: "Model progress is still accelerating; coding is the enterprise beachhead.",
      investorRead: "Capability growth and real demand suggest runway for monetization."
    },
    {
      company: "NVIDIA",
      thesis: "Agentic adoption is fast, and compute is directly linked to revenue creation.",
      investorRead: "Infrastructure is becoming productive capital, not pure IT expense."
    },
    {
      company: "Microsoft",
      thesis: "Work is moving toward a headless, agent-driven operating model.",
      investorRead: "Value can scale beyond seat count through workflow orchestration."
    },
    {
      company: "Meta",
      thesis: "AI is already improving ad performance with a disciplined infra strategy.",
      investorRead: "Real monetization now, while LLM use is deployed selectively."
    },
    {
      company: "Alphabet",
      thesis: "AI is expanding Search engagement while broadening platform bets.",
      investorRead: "Massive capex is defended by scale, utilization, and ecosystem growth."
    },
    {
      company: "AMD",
      thesis: "AI hardware demand is broadening where efficiency and TCO matter.",
      investorRead: "Alternative compute supply is valuable as AI deployment diversifies."
    },
    {
      company: "SAP",
      thesis: "Enterprise AI compounds inside systems of record and core workflows.",
      investorRead: "Incumbents with mission-critical data can defend and extend moats."
    }
  ];

  const winners = [
    "Frontier labs with enterprise traction",
    "Compute and infrastructure leaders",
    "Hyperscalers turning capex into platform revenue",
    "System-of-record software firms embedding AI into operations",
    "Platforms controlling data, workflow, and distribution"
  ];

  const risks = [
    "Thin interface-only software layers",
    "Products built on mostly public information",
    "Seat-based SaaS with weak AI adaptation",
    "Offerings without proprietary workflow or data advantage",
    "Low-integrity tools in high-trust enterprise domains"
  ];

  const timeline = [
    ["Phase 1", "Copilots improve human productivity."],
    ["Phase 2", "Agents execute tasks with less manual interaction."],
    ["Phase 3", "Physical AI extends into robotics and industrial workflows."]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="max-w-6xl mx-auto px-6 md:px-10 pt-20 md:pt-24">
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
          AI Investment Lens
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          2026 TMT Signal: AI enters the
          <span className="text-indigo-600"> prove-it era</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
          This page distills the article into one practical question for investors:
          which companies can convert AI capability, infrastructure, and workflow
          control into durable earnings power?
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 md:px-10 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl">{item.emoji}</div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 mt-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Cross-conference signals
          </h2>
          <ul className="mt-6 space-y-4">
            {crossConferenceSignals.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-700 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Company-by-company takeaways
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyTakeaways.map((item) => (
            <article
              key={item.company}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900">{item.company}</h3>
              <p className="mt-3 text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Thesis:</span> {item.thesis}
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900">Investor read:</span>{" "}
                {item.investorRead}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7">
            <h2 className="text-2xl font-bold text-emerald-900">Likely winners</h2>
            <ul className="mt-5 space-y-3">
              {winners.map((item) => (
                <li key={item} className="text-emerald-900/90 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-rose-200 bg-rose-50 p-7">
            <h2 className="text-2xl font-bold text-rose-900">Most exposed</h2>
            <ul className="mt-5 space-y-3">
              {risks.map((item) => (
                <li key={item} className="text-rose-900/90 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 mt-16">
        <div className="rounded-3xl bg-slate-900 p-8 md:p-10 text-slate-100 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold">Adoption sequence</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {timeline.map(([phase, detail]) => (
              <article key={phase} className="rounded-2xl bg-slate-800/80 p-5 border border-slate-700">
                <p className="text-sm uppercase tracking-wide text-indigo-300 font-semibold">
                  {phase}
                </p>
                <p className="mt-2 leading-relaxed text-slate-200">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 md:px-10 mt-16 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xl md:text-2xl font-semibold text-slate-900 leading-relaxed">
            AI is now priced on execution quality.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Durable value goes to businesses that can turn intelligence into trusted
            workflow outcomes and repeatable revenue.
          </p>
        </div>
      </footer>
    </div>
  );
}
