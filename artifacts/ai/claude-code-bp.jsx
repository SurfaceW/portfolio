export default function ClaudeCodeGuidePage() {
  const highlights = [
    {
      icon: "🧠",
      title: "Think in loops",
      text: "Claude Code is an agent loop: collect context, act, verify, repeat."
    },
    {
      icon: "🧱",
      title: "Design six layers",
      text: "Context, tools, workflows, control, isolation, and verification must stay balanced."
    },
    {
      icon: "✅",
      title: "Define done early",
      text: "If pass/fail is unclear, autonomy will drift. Write verification before coding."
    }
  ]

  const sections = [
    {
      emoji: "1️⃣",
      title: "Core Mental Model",
      points: [
        "Treat Claude Code as an engineering system, not a chatbot.",
        "Use this loop for every task: Context → Action → Verification.",
        "Most failures come from noisy context or missing checks, not model IQ.",
        "Keep work observable: commands, outputs, and rollback notes."
      ],
      actions: [
        "Start each task with goal, scope, and constraints.",
        "Always end with executable verification commands."
      ]
    },
    {
      emoji: "2️⃣",
      title: "Use the Right Building Block",
      points: [
        "Tool / MCP: add a new action capability.",
        "Skill: add a reusable workflow with steps and stop conditions.",
        "Hook: enforce deterministic guardrails and audits.",
        "Subagent: isolate heavy exploration or parallel research."
      ],
      actions: [
        "Do not solve workflow problems by adding more tools.",
        "Do not use hooks for complex reasoning tasks."
      ]
    },
    {
      emoji: "3️⃣",
      title: "Context Engineering First",
      points: [
        "Your context budget is not fully free; fixed overhead is real.",
        "Keep always-on instructions short, hard, and executable.",
        "Move low-frequency or heavy knowledge into on-demand skills.",
        "Use handoff files between sessions to avoid compression loss."
      ],
      actions: [
        "Keep project contract small: build, test, boundaries, NEVER list.",
        "Track what must survive compression: architecture, changed files, verification status."
      ]
    },
    {
      emoji: "4️⃣",
      title: "Skill Design That Actually Works",
      points: [
        "Write skill descriptions as trigger conditions, not marketing text.",
        "Put long references into supporting files, not SKILL.md body.",
        "For side-effect workflows, require explicit invocation.",
        "Use clear output format and stop conditions."
      ],
      actions: [
        "Create three types: checklist, workflow, domain diagnosis.",
        "Split one giant skill into focused single-purpose skills."
      ]
    },
    {
      emoji: "5️⃣",
      title: "Hooks and Verification Closure",
      points: [
        "Run lightweight checks after edits by file type.",
        "Fail fast with short output to reduce noise.",
        "Enforce critical rails: protected files, lint/test gates, notifications.",
        "Verification stack: exit codes → tests → integration checks → manual review."
      ],
      actions: [
        "Document verification in your contract and skills.",
        "Treat 'Claude says done' as unverified until checks pass."
      ]
    },
    {
      emoji: "6️⃣",
      title: "Subagents, Caching, and Cost",
      points: [
        "Use subagents for isolation first, parallelism second.",
        "Constrain subagent tools and turn count to avoid drift.",
        "Prompt caching depends on stable static prefix content.",
        "Avoid random tool definition changes during a long session."
      ],
      actions: [
        "Keep static system/tool content stable; send dynamic info in user turns.",
        "For model changes, hand off via a clean task message when needed."
      ]
    },
    {
      emoji: "🛠️",
      title: "High-Value Daily Commands",
      points: [
        "/context: inspect token shape and noise sources.",
        "/clear: restart when correction loops repeat.",
        "/compact: keep momentum while preserving key state.",
        "/mcp, /hooks, /permissions, /sandbox: govern control plane.",
        "/insight: extract recurring rules into your contract."
      ],
      actions: [
        "Use commands proactively, not after quality collapse.",
        "Prefer small, frequent resets over long noisy sessions."
      ]
    },
    {
      emoji: "🚀",
      title: "30-Minute Setup Blueprint",
      points: [
        "Write a small project contract with build/test/run and hard constraints.",
        "Add path-level rules for language or directory differences.",
        "Create 2-3 practical skills: release-check, migration, diagnosis.",
        "Add 1-2 hooks for fast compile/lint checks.",
        "Define definition-of-done per change type (backend, API, UI)."
      ],
      actions: [
        "Run one real task and record misses.",
        "Update contract and skills from real failures, then repeat."
      ]
    }
  ]

  const quickChecklist = [
    "Project contract is short and executable.",
    "Rules are path-scoped, not dumped globally.",
    "Skills are on-demand and single-purpose.",
    "Hooks are deterministic and fast.",
    "Subagents are constrained and isolated.",
    "Verification commands are explicit and runnable."
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800">
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 shadow-sm">
            Claude Code · Practical Engineering Guide
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Build Stable Claude Code Workflows
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            A concise playbook from real usage: control context, design workflows, enforce
            verification, and keep autonomy reliable under constraints.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50"
            >
              <div className="text-2xl">{item.icon}</div>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                <span className="mr-2">{section.emoji}</span>
                {section.title}
              </h3>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 text-slate-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  Do this now
                </p>
                <ul className="mt-2 space-y-1 text-sm text-indigo-900">
                  {section.actions.map((action) => (
                    <li key={action} className="flex gap-2">
                      <span className="mt-1">→</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:mt-12">
          <h3 className="text-xl font-semibold text-slate-900">Quick Health Checklist</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {quickChecklist.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                ✅ {item}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-600">
          Keep it simple: clear contract, focused context, explicit verification. That is how
          Claude Code stays reliable at scale.
        </div>
      </footer>
    </div>
  )
}