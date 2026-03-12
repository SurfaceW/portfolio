export default function AgenticSkillsGuidePage() {
  const highlights = [
    {
      icon: "⚙️",
      title: "CEVF Architecture",
      desc: "Contract · Execution · Verification · Feedback — the four-layer engineering contract that turns ad-hoc prompts into reliable, production-grade agents."
    },
    {
      icon: "🗂️",
      title: "52 Skills · 9 Categories",
      desc: "A curated catalog covering every engineering domain: code, research, infra, security, writing, systems, and meta-skill orchestration."
    },
    {
      icon: "🛡️",
      title: "V-Layer Hard Gates",
      desc: "Boolean checks independent of the LLM. At least 2 required. These are the firewall between hallucinated output and real-world impact."
    }
  ]

  const cevfLayers = [
    {
      layer: "C",
      name: "Contract",
      color: "bg-violet-50 border-violet-200",
      badge: "bg-violet-100 text-violet-700",
      tagline: "Define the boundary — what IN, what OUT",
      rules: [
        "scope_out lines ≥ scope_in lines (the exclusion list is the real firewall)",
        "failure_policy: L1 retry → L2 alternate → L3 rollback → L6 human",
        "acceptance: explicit definition of 'done' with measurable criteria",
        "Golden rule: missing scope_out causes 30%+ wasted cycles on generated/vendor code"
      ]
    },
    {
      layer: "E",
      name: "Execution",
      color: "bg-blue-50 border-blue-200",
      badge: "bg-blue-100 text-blue-700",
      tagline: "Phase flow + 6-tier graceful degradation",
      rules: [
        "Phase 1: Global scan / initialization",
        "Phase 2: Core execution (per-dimension or per-step)",
        "Phase 3: Consolidate, rank by severity, deduplicate",
        "Phase 4: Format output → trigger V-layer checks",
        "Degradation must be quantifiable: 'timeout > 30s', not 'too slow'"
      ]
    },
    {
      layer: "V",
      name: "Verification",
      color: "bg-emerald-50 border-emerald-200",
      badge: "bg-emerald-100 text-emerald-700",
      tagline: "Hard gates independent of the LLM — boolean only",
      rules: [
        "Minimum: 2 hard gates. Recommended: 3–5. Standard: 5–7",
        "Each gate: G(output) → {PASS, FAIL} — no LLM self-evaluation",
        "V-layer weight = 0.4 in the Skill Trust Score formula",
        "Test: 'Can this check run in a script without any LLM call?' If no → it's a soft check",
        "Gate examples: finding count range, file coverage, line-number existence, format compliance"
      ]
    },
    {
      layer: "F",
      name: "Feedback",
      color: "bg-amber-50 border-amber-200",
      badge: "bg-amber-100 text-amber-700",
      tagline: "Counter-examples → distilled into C/E/V improvements",
      rules: [
        "Conversion rate < 50% = F-layer is recording failures, not learning from them",
        "Three feedback materials: counter-examples, boundary examples, improvement triggers",
        "Improvement cadence: every edit (2 min review), monthly (30 min reflect-skill), quarterly (1–2d batch)",
        "Signal: if F-layer counter-examples > 20 → redesign, don't keep patching"
      ]
    }
  ]

  const skillCategories = [
    {
      icon: "🧠",
      name: "Thinking & Planning",
      color: "border-violet-200 bg-violet-50",
      skills: ["plan-nex", "design-nex", "algorithm-design-nex", "creative-nex", "brainstorming-nex"]
    },
    {
      icon: "💻",
      name: "Code Engineering",
      color: "border-blue-200 bg-blue-50",
      skills: ["code-nex", "modify-nex", "refactor-nex", "debug-nex", "review-nex", "test-nex", "performance-nex", "rca-nex"]
    },
    {
      icon: "🔬",
      name: "Research & Learning",
      color: "border-cyan-200 bg-cyan-50",
      skills: ["research-nex", "search-nex", "understanding-nex", "study-nex", "paper-code-nex", "citation-audit"]
    },
    {
      icon: "📝",
      name: "Writing & Docs",
      color: "border-teal-200 bg-teal-50",
      skills: ["doc-nex", "report-nex", "content-research-writer", "presentation-nex", "diagram-nex", "visualization-nex"]
    },
    {
      icon: "🏗️",
      name: "Systems & Low-Level",
      color: "border-slate-200 bg-slate-50",
      skills: ["cpp-systems-nex", "gpu-compute-nex", "signal-processing-nex", "video-standards-nex", "video-benchmark-nex"]
    },
    {
      icon: "🔒",
      name: "Security & Compliance",
      color: "border-red-200 bg-red-50",
      skills: ["security-nex", "compliance-nex", "accessibility-nex"]
    },
    {
      icon: "⚙️",
      name: "Engineering Infra",
      color: "border-orange-200 bg-orange-50",
      skills: ["deploy-nex", "monitoring-nex", "migration-nex", "database-nex", "api-design-nex", "ux-nex"]
    },
    {
      icon: "🧩",
      name: "Meta-Skills",
      color: "border-pink-200 bg-pink-50",
      skills: ["skill-orchestrator", "create-skill-nex", "review-skill", "reflect-skill"]
    },
    {
      icon: "📦",
      name: "Knowledge & Tooling",
      color: "border-indigo-200 bg-indigo-50",
      skills: ["knowledge-capture", "knowledge-base-workflow", "experiment-tracker-nex", "dir-to-zoomdoc"]
    }
  ]

  const top10 = [
    { name: "code-nex", desc: "Plan → Implement → Refactor → Iterate" },
    { name: "modify-nex", desc: "Surgical edits with 6-layer hallucination barrier" },
    { name: "review-nex", desc: "10-dimension × 4-severity code review" },
    { name: "debug-nex", desc: "4-phase + DoVer + Fagan diagnosis engine" },
    { name: "test-nex", desc: "7-layer test pyramid (unit → chaos)" },
    { name: "search-nex", desc: "Multi-strategy search + CoVe verification" },
    { name: "design-nex", desc: "ATAM + Pre-mortem + Red Team architecture review" },
    { name: "plan-nex", desc: "Backward Design project planning" },
    { name: "creative-nex", desc: "8 thinking modes for creative breakthroughs" },
    { name: "skill-orchestrator", desc: "Multi-skill DAG orchestration + VIGIL self-healing" }
  ]

  const creationSteps = [
    { step: "01", title: "Define Requirements", time: "30 min", desc: "One-sentence goal, current pain point, expected outcome, frequency, users, risk level." },
    { step: "02", title: "Define Scope", time: "20 min", desc: "scope_out first: generated files, third-party code, non-target types. Use the 3-step scope_out checklist." },
    { step: "03", title: "Choose Freedom Level", time: "10 min", desc: "Low (DB migrations, key rotation) · Medium (review, tests, docs — default) · High (brainstorm, architecture)" },
    { step: "04", title: "Fill CEVF Layers", time: "60 min", desc: "Order: C → V (gates first!) → E → F. Design V before E: know what must not fail before designing how to execute." },
    { step: "05", title: "Anti-Pattern Check", time: "15 min", desc: "F1 scope drift · F2 no verification · F11 code hallucination. These 3 cover ~60% of all Skill failures." },
    { step: "06", title: "Worked Example", time: "30 min", desc: "Run a real input end-to-end. Verify every Phase executed and every V-layer gate actually triggered." },
    { step: "07", title: "Review & Iterate", time: "35 min", desc: "8-dimension scoring (S1–S8, target ≥70) + 3 test scenarios (normal · boundary · failure). Check transcript, not just output." }
  ]

  const failureModes = [
    { id: "F1", name: "Scope Drift", symptom: "Skill processes unrelated files", fix: "Precise scope_in + V-layer path check" },
    { id: "F2", name: "Verification Missing", symptom: "Output delivered without quality check", fix: "Minimum 2 hard gates in V-layer" },
    { id: "F3", name: "Tool Loop", symptom: "Same tool called repeatedly, no progress", fix: "Timeout cap + loop detection (10× same call → interrupt)" },
    { id: "F5", name: "Context Overflow", symptom: "Early instructions forgotten after 100K tokens", fix: "Split sessions; re-inject critical constraints each turn" },
    { id: "F6", name: "Anchoring Cascade", symptom: "All analysis revolves around the first finding", fix: "Force independent per-dimension scoring (D1–D10)" },
    { id: "F11", name: "Code Hallucination", symptom: "References non-existent APIs, line numbers, package names", fix: "V7 gate: verify cited line exists before delivering output" },
    { id: "F15", name: "Skill Drift", symptom: "Cumulative patches deviate from original design", fix: "Quarterly design-consistency audit; F-layer > 20 → redesign" },
    { id: "F16", name: "Automation Complacency", symptom: "Team stops reviewing Skill output", fix: "Regular spot-checks + V-layer log auditing" }
  ]

  const antiPatterns = [
    { id: "AP-1", name: "God Skill", problem: "One Skill tries to do everything", fix: "Split into focused single-responsibility Skills" },
    { id: "AP-2", name: "Over-specification", problem: "Instructions too rigid, blocks valid cases", fix: "Default to Medium Freedom" },
    { id: "AP-3", name: "No V-Layer", problem: "Fully trusting AI output", fix: "Minimum 2 hard gates — non-negotiable" },
    { id: "AP-4", name: "Overfitted Tests", problem: "Improvements only target specific edge cases", fix: "Improvements must generalize" },
    { id: "AP-5", name: "Missing scope_out", problem: "Only defined what to do, not what to avoid", fix: "scope_out ≥ scope_in (always)" }
  ]

  const stsFormula = "STS = 0.2·C + 0.2·E + 0.4·V + 0.2·F"
  const stsTiers = [
    { range: "≥ 0.85", grade: "A", label: "Trusted", desc: "Production, fully automated" },
    { range: "0.70–0.84", grade: "B", label: "Conditional", desc: "Human confirmation on key output" },
    { range: "0.50–0.69", grade: "C", label: "Restricted", desc: "Non-critical tasks only" },
    { range: "< 0.50", grade: "D", label: "Untrusted", desc: "Do not use in production" }
  ]

  const decisionRouter = [
    { trigger: "Implement a feature / write code", skill: "code-nex", alt: "modify-nex (small change)" },
    { trigger: "PR review / code quality", skill: "review-nex", alt: "review-board (multi-perspective)" },
    { trigger: "Debug a crash / flaky test", skill: "debug-nex", alt: "review-debug-nex (with logs)" },
    { trigger: "Performance too slow", skill: "performance-nex", alt: "creative-nex (break through)" },
    { trigger: "Plan a project / roadmap", skill: "plan-nex", alt: "design-nex (architecture level)" },
    { trigger: "Search papers / docs", skill: "search-nex", alt: "research-nex (systematic)" },
    { trigger: "Understand a paper / codebase", skill: "understanding-nex", alt: "—" },
    { trigger: "Write a tech blog", skill: "content-research-writer", alt: "—" },
    { trigger: "Draw architecture diagram", skill: "diagram-nex", alt: "visualization-nex (data charts)" },
    { trigger: "Create a new Skill", skill: "create-skill-nex", alt: "—" },
    { trigger: "Don't know which Skill to use", skill: "skill-orchestrator", alt: "—" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 font-sans">

      {/* ── Hero ── */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-14 text-center">
        <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          Engineering Guide · Context Engineering
        </span>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slate-900 mb-5">
          Agentic Skills<br />
          <span className="text-violet-600">Best Practices</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          A field guide for engineers on designing, deploying, and continuously improving production-grade AI agent skills —
          grounded in the CEVF framework, 52-skill catalog, and real failure-mode data.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
          <span className="bg-slate-100 px-3 py-1 rounded-full">52 Skills</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">9 Categories</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">CEVF Framework</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">16 Failure Modes</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">200+ papers synthesized</span>
        </div>
      </header>

      {/* ── Highlights ── */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="grid md:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{h.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{h.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core Concept: What is a Skill? ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">What is a Skill?</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A <strong>Skill</strong> is a structured workflow that an AI agent executes to complete a well-defined engineering task.
                It sits between raw LLM inference and production automation: it defines <em>scope</em>, <em>phases</em>, <em>quality gates</em>, and <em>degradation paths</em>.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Skills are the unit of context engineering — not prompts, not tools alone,
                but a reusable, testable, improvable contract between the engineer and the agent.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                <p className="text-xs text-slate-500 font-mono font-semibold mb-2 uppercase tracking-widest">Decision Rule</p>
                <p className="text-sm text-slate-700 font-mono leading-relaxed">
                  Multi-step? No → <strong>Tool</strong><br />
                  Multi-step + no quality gate → <strong>Light Skill</strong><br />
                  Multi-step + quality gate → <strong>Full CEVF Skill</strong>
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Entity Hierarchy</p>
              <div className="space-y-2">
                {[
                  { label: "Agent", sub: "Autonomy · Tool calls · Long-term memory", color: "bg-violet-100 border-violet-200" },
                  { label: "Skill", sub: "Scope · Phase flow · Verification gates · Degradation", color: "bg-blue-100 border-blue-200" },
                  { label: "Tool", sub: "Single API call · Read file · Search API", color: "bg-emerald-100 border-emerald-200" },
                  { label: "Sub-Agent", sub: "Limited scope · Depth-bounded · Parent-supervised", color: "bg-amber-100 border-amber-200" }
                ].map((e, i) => (
                  <div key={i} className={`${e.color} border rounded-xl px-4 py-2.5 flex items-center gap-3`}>
                    <span className="font-semibold text-slate-800 w-20 shrink-0">{e.label}</span>
                    <span className="text-xs text-slate-600">{e.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEVF Layers ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">CEVF Framework</h2>
        <p className="text-slate-500 mb-7 text-sm">
          The four-layer contract that turns a Skill from "feels right" to "provably safe."
          Design order: <strong>C → V → E → F</strong> (gates first, then flow).
        </p>
        <div className="space-y-4">
          {cevfLayers.map((l) => (
            <div key={l.layer} className={`${l.color} border rounded-2xl p-6`}>
              <div className="flex items-start gap-4">
                <span className={`${l.badge} text-2xl font-black w-12 h-12 flex items-center justify-center rounded-xl shrink-0`}>
                  {l.layer}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 text-lg">{l.name}</h3>
                    <span className="text-sm text-slate-500 italic">{l.tagline}</span>
                  </div>
                  <ul className="space-y-1.5 mt-3">
                    {l.rules.map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-700 leading-relaxed">
                        <span className="text-slate-400 shrink-0 mt-0.5">·</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-sm font-semibold text-violet-800 mb-1">Skill Trust Score (STS)</p>
          <p className="font-mono text-violet-700 text-sm mb-2">{stsFormula}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
            {stsTiers.map((t) => (
              <div key={t.grade} className="bg-white border border-violet-200 rounded-xl p-3 text-center">
                <span className="block font-black text-violet-700 text-lg">{t.grade}</span>
                <span className="block text-xs text-slate-600 font-medium">{t.label}</span>
                <span className="block text-xs text-slate-400 mt-0.5">{t.range}</span>
                <span className="block text-xs text-slate-500 mt-1">{t.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-violet-600 mt-3">V-layer weight (0.4) is highest — verification is the primary trust signal.</p>
        </div>
      </section>

      {/* ── Skill Catalog ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Skill Catalog — 9 Categories</h2>
        <p className="text-slate-500 text-sm mb-7">52 skills covering the full engineering lifecycle. Choose by intent, not by tool name.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <div key={i} className={`${cat.color} border rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="font-semibold text-slate-900 text-sm">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s, j) => (
                  <span key={j} className="bg-white border border-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top 10 ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">High-Frequency Top 10</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {top10.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 hover:border-violet-300 transition-colors">
              <span className="text-xs font-black text-slate-400 w-6 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-mono font-semibold text-violet-700 text-sm">{s.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Decision Router ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Routing Table</h2>
        <p className="text-slate-500 text-sm mb-6">Match your intent to the right Skill in under 10 seconds.</p>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Intent</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Skill</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Alternative</th>
              </tr>
            </thead>
            <tbody>
              {decisionRouter.map((r, i) => (
                <tr key={i} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                  <td className="px-5 py-3 text-slate-700">{r.trigger}</td>
                  <td className="px-5 py-3 font-mono text-violet-700 font-medium">{r.skill}</td>
                  <td className="px-5 py-3 text-slate-400 font-mono text-xs hidden md:table-cell">{r.alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Creation Guide ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">7-Step Creation Guide</h2>
        <p className="text-slate-500 text-sm mb-7">
          Total ~3.5 hours for a production-grade Skill. First time? Use fast mode (~1 hour): C-layer + 3 V-gates + 1 worked example only.
        </p>
        <div className="space-y-3">
          {creationSteps.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-5 items-start hover:shadow-sm transition-shadow">
              <div className="shrink-0 bg-slate-100 text-slate-600 text-xs font-black w-10 h-10 rounded-xl flex items-center justify-center font-mono">
                {s.step}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{s.time}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="font-semibold text-amber-800 text-sm mb-2">Three Mindset Shifts</p>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { from: "Feature-complete", to: "Minimum viable", note: "First Skill goal: works without big mistakes, not perfect" },
              { from: "Writing a manual", to: "Writing a trigger", note: "SKILL.md's reader is the Agent, not a human. 'What to do when' > 'why'" },
              { from: "Write once right", to: "Execute → Feedback → Iterate", note: "Step 7 review is the highest ROI action in Skill creation" }
            ].map((t, i) => (
              <div key={i} className="bg-white border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">
                  <span className="line-through text-red-400">{t.from}</span>
                  <span className="mx-1.5 text-amber-500">→</span>
                  <span className="text-emerald-700 font-medium">{t.to}</span>
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Failure Modes ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Failure Mode Dictionary</h2>
        <p className="text-slate-500 text-sm mb-3">
          F1 + F2 + F11 cover ~60% of all Skill failures. Always check these three first.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {failureModes.map((f) => (
            <div key={f.id} className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-red-300 transition-colors">
              <div className="flex items-start gap-3">
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-lg shrink-0 font-mono">{f.id}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{f.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 mb-2">{f.symptom}</p>
                  <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1">
                    Fix: {f.fix}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3">5 Fatal Anti-Patterns</h3>
        <div className="space-y-2">
          {antiPatterns.map((ap) => (
            <div key={ap.id} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-start">
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-lg shrink-0 font-mono">{ap.id}</span>
              <div className="flex-1 grid md:grid-cols-3 gap-2">
                <p className="font-semibold text-slate-800 text-sm">{ap.name}</p>
                <p className="text-xs text-slate-500">{ap.problem}</p>
                <p className="text-xs text-emerald-700">✓ {ap.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Minimum Checklist ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Minimum Viable Skill Checklist</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wider">Before Shipping</h3>
            <ul className="space-y-2.5">
              {[
                "description includes trigger words (EN + ZH) and 'Do not use for:'",
                "scope_out ≥ scope_in (lines)",
                "At least 2 V-layer hard gates",
                "Each gate is independent of any LLM call",
                "SKILL.md ≤ 1500 words (sweet spot: 500–1500)",
                "At least 1 worked example end-to-end"
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-slate-300 mt-0.5 shrink-0">☐</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wider">Production Deployment Guards</h3>
            <ul className="space-y-2.5">
              {[
                "Rollout starts as comment-only (non-blocking) for first 2 weeks",
                "Defined threshold to switch to blocking (e.g., adoption rate > 60%)",
                "Track P0 trends (month-over-month), not absolute counts",
                "Risk escalation: low-risk review → mid-risk gate → high-risk alert",
                "Changes are traceable and precisely rollback-able"
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-slate-300 mt-0.5 shrink-0">☐</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Context Engineering Layers ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Context Engineering — 4-Layer Model</h2>
        <p className="text-slate-500 text-sm mb-6">Skills live in Layer 1. Understanding all four layers explains where Skill knowledge flows and how it persists.</p>
        <div className="space-y-3">
          {[
            { layer: "Layer 1", name: "Working Context", color: "bg-violet-50 border-violet-200", badge: "bg-violet-100 text-violet-700", desc: "Immediate input per call: System Prompt + Skill instructions + current task. Must be present every call." },
            { layer: "Layer 2", name: "Session", color: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-700", desc: "Persistent log of current conversation: history, intermediate results, decision chain. Can be compressed." },
            { layer: "Layer 3", name: "Memory", color: "bg-emerald-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-700", desc: "Long-term knowledge retrieved on demand: team conventions, historical decisions, lessons learned." },
            { layer: "Layer 4", name: "Artifacts", color: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-700", desc: "Large data accessed by reference only: code files, documents, datasets. Never loaded into context directly." }
          ].map((l, i) => (
            <div key={i} className={`${l.color} border rounded-xl p-4 flex gap-4 items-start`}>
              <span className={`${l.badge} text-xs font-bold px-2 py-1 rounded-lg shrink-0`}>{l.layer}</span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{l.name}</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Insight ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-violet-50 to-slate-50 border border-violet-200 rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-slate-800 mb-3">
            "AI accelerates <span className="text-violet-600">orientation</span> and <span className="text-violet-600">context</span>."
          </p>
          <p className="text-slate-500 text-sm mb-6">
            Judgment, synthesis, and insight remain human responsibilities.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              { emoji: "🔺", title: "Highest ROI", body: "V-layer hard gates > trigger words > scope_out > worked examples" },
              { emoji: "⚖️", title: "Impossible Triangle", body: "Precision × Generality × Simplicity — pick two. Compose via skill-orchestrator for the third." },
              { emoji: "🔄", title: "Improvement Cadence", body: "Every edit: 2-min review. Monthly: reflect-skill. Quarterly: batch redesign." }
            ].map((c, i) => (
              <div key={i} className="bg-white border border-violet-100 rounded-xl p-4">
                <p className="text-xl mb-2">{c.emoji}</p>
                <p className="font-semibold text-slate-800 text-sm mb-1">{c.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400">Agentic Skills Engineering Guide · March 2026</p>
          <p className="text-xs text-slate-400">
            Based on 52-skill catalog, CEVF framework, 200+ synthesized papers
          </p>
        </div>
      </footer>

    </div>
  )
}
