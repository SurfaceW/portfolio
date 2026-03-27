import React from "react";
import { motion } from "framer-motion";
import {
  Aperture,
  ArrowRight,
  Boxes,
  Compass,
  Gauge,
  Layers3,
  Network,
  Orbit,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const highlights = [
  {
    value: "Manage Complexity",
    note:
      "Architecture is strategic structure. Its real job is to make a hard system understandable, buildable, and changeable.",
  },
  {
    value: "Lower Cognitive Cost",
    note:
      "Good architecture creates shared context, shared language, and calmer collaboration across a team.",
  },
  {
    value: "Evolve, Don’t Freeze",
    note:
      "There is no universally best architecture. There is only the most fitting decision for this stage, under these constraints.",
  },
];

const equation = [
  {
    title: "Components",
    body:
      "Choose the major building blocks and the responsibilities each one owns.",
    icon: Boxes,
  },
  {
    title: "Relationships",
    body:
      "Define dependencies, communication paths, and the boundaries of change between parts.",
    icon: Network,
  },
  {
    title: "Principles",
    body:
      "Use durable rules and guidelines so decisions stay coherent as the system grows.",
    icon: Compass,
  },
];

const drivers = [
  {
    title: "Functional Needs",
    body:
      "What the system must do for users, the product, and the business.",
    icon: Workflow,
  },
  {
    title: "Quality Attributes",
    body:
      "Scalability, availability, resilience, security, clarity, and performance.",
    icon: Gauge,
  },
  {
    title: "Constraints",
    body:
      "Time, budget, platform, regulations, legacy systems, and the architecture style they imply.",
    icon: ShieldCheck,
  },
  {
    title: "Context",
    body:
      "Organization shape, market pressure, team capability, and Conway-style realities.",
    icon: Users,
  },
];

const lifecycle = [
  {
    phase: "R0",
    title: "Set the Goal",
    body:
      "Separate functional and non-functional needs. Define the business problem, the system boundary, and the real architectural question.",
  },
  {
    phase: "R1",
    title: "Identify the Drivers",
    body:
      "Make the forces visible: features, quality goals, constraints, market pressure, resources, and organizational factors.",
  },
  {
    phase: "R2",
    title: "Shape the Design",
    body:
      "Move from macro to micro: business model to system model, major styles, key technology choices, and structural views.",
  },
  {
    phase: "R3",
    title: "Land the System",
    body:
      "Choose mature solutions, decide buy vs. build, reuse where possible, and make change strategies explicit.",
  },
  {
    phase: "R4",
    title: "Keep It Evolving",
    body:
      "Document, evaluate, refactor, and adapt. Architecture is a living decision system, not a one-time diagram.",
  },
];

const views = [
  {
    name: "Logical",
    focus: "Responsibilities, services, roles, behavior, and user-visible capabilities.",
  },
  {
    name: "Development",
    focus: "Modules, frameworks, languages, package structure, and developer ergonomics.",
  },
  {
    name: "Runtime",
    focus: "Concurrency, events, synchronization, runtime interaction, and operating behavior.",
  },
  {
    name: "Physical",
    focus: "Deployment, network environment, hardware, availability, and infrastructure security.",
  },
  {
    name: "Data",
    focus: "Storage models, transfer, replication, synchronization, and data lifecycle choices.",
  },
];

const principles = [
  {
    title: "Fit the Moment",
    body:
      "Architecture is contextual. The right answer is the one that best serves the present stage and its pressures.",
  },
  {
    title: "Trade Off Deliberately",
    body:
      "Architecture is central decision-making. It balances competing goals instead of maximizing a single metric.",
  },
  {
    title: "Prefer Simplicity",
    body:
      "Use Occam, KISS, and clear boundaries. A simpler system is easier to trust, explain, and evolve.",
  },
  {
    title: "Modularize Change",
    body:
      "Separate concerns, reduce coupling, and choose the right granularity so change stays local rather than systemic.",
  },
  {
    title: "Leverage Standards",
    body:
      "Mature technology, conventions, and governance lower collaboration cost and increase long-term extensibility.",
  },
  {
    title: "Refactor Continuously",
    body:
      "A living architecture pays down technical debt, keeps concepts clear, and preserves room for the next move.",
  },
];

const architectRoles = [
  {
    title: "Reduce Ambiguity",
    body:
      "Define boundaries, vocabulary, and system goals so teams can operate inside the same mental model.",
  },
  {
    title: "Create Concepts",
    body:
      "Generate and compare solution concepts, then select one that can evolve without collapsing under future pressure.",
  },
  {
    title: "Manage Complexity",
    body:
      "Use decomposition, abstraction, interfaces, and change control to keep the system operable at scale.",
  },
  {
    title: "Design for Evolution",
    body:
      "Think across horizons. Good architecture supports today’s delivery while leaving room for tomorrow’s direction.",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/75 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" />
      <span>{children}</span>
    </div>
  );
}

function FeatureCard({ item, dark = false }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.01 }}
      className={
        dark
          ? "rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]"
          : "rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 text-slate-900 shadow-[0_24px_80px_rgba(148,163,184,0.16)] backdrop-blur"
      }
    >
      <div
        className={
          dark
            ? "mb-5 inline-flex rounded-2xl border border-white/10 bg-white/10 p-3 text-white"
            : "mb-5 inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700"
        }
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className={dark ? "text-2xl font-semibold" : "text-2xl font-semibold text-slate-900"}>
        {item.title}
      </h3>
      <p className={dark ? "mt-3 text-sm leading-7 text-white/68" : "mt-3 text-sm leading-7 text-slate-600"}>
        {item.body}
      </p>
    </motion.div>
  );
}

export default function DesignOfSoftwareArchitecturePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4efe7] text-slate-900 [font-family:Avenir_Next,ui-sans-serif,system-ui,sans-serif]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#d8c3a5]/30 blur-3xl" />
        <div className="absolute right-[-6rem] top-[18rem] h-80 w-80 rounded-full bg-[#b8d4e3]/35 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-[#d9c2d8]/25 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-8 lg:px-10"
      >
        <motion.header variants={fadeUp} className="relative overflow-hidden rounded-[2.6rem] border border-slate-200/80 bg-white/72 px-8 py-10 shadow-[0_30px_120px_rgba(30,41,59,0.10)] backdrop-blur-xl md:px-12 md:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_30rem] lg:items-center">
            <div>
              <SectionLabel>Knowledge Artifact · Architecture</SectionLabel>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                Design of Software Architecture
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-slate-950 md:text-7xl [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
                Architecture is the art of making complexity inhabitable.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Software architecture is more than structure. It is a long-horizon system of decisions about components, relationships, constraints, and principles that lets a team ship quality without drowning in complexity.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.value} className="rounded-[1.8rem] border border-slate-200/80 bg-[#fbf8f3] px-5 py-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2.4rem] bg-slate-950 p-8 text-white shadow-[0_35px_120px_rgba(15,23,42,0.32)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.18),transparent_38%)]" />
              <div className="relative h-[23rem]">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/10 bg-white/10 text-center backdrop-blur"
                >
                  <Orbit className="mb-3 h-6 w-6 text-sky-200" />
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Core Job</p>
                  <p className="mt-2 max-w-[8rem] text-lg font-semibold leading-tight">Manage Complexity</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute left-2 top-4 w-40 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4"
                >
                  <Boxes className="h-5 w-5 text-amber-200" />
                  <p className="mt-3 text-sm font-semibold">Components</p>
                  <p className="mt-2 text-xs leading-6 text-white/62">Who owns which responsibility?</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                  className="absolute right-2 top-8 w-44 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4"
                >
                  <Network className="h-5 w-5 text-cyan-200" />
                  <p className="mt-3 text-sm font-semibold">Relationships</p>
                  <p className="mt-2 text-xs leading-6 text-white/62">How do parts depend, communicate, and change together?</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
                  className="absolute bottom-3 left-8 w-48 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4"
                >
                  <Compass className="h-5 w-5 text-emerald-200" />
                  <p className="mt-3 text-sm font-semibold">Principles</p>
                  <p className="mt-2 text-xs leading-6 text-white/62">Which rules keep the system coherent over time?</p>
                </motion.div>

                <div className="absolute bottom-6 right-6 max-w-[12rem] rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-3 text-right backdrop-blur">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Architectural Formula</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">Structure of components plus relationships plus enduring guidance.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>

        <section className="mt-24">
          <motion.div variants={fadeUp} className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>The Equation</SectionLabel>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
                Architecture is not code at every level.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-base">
              It focuses on the larger grain: major responsibilities, structure, and the decision rules that make a system understandable beyond individual implementations.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-10 grid gap-5 lg:grid-cols-3">
            {equation.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </motion.div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <motion.div variants={fadeUp} className="rounded-[2.4rem] border border-slate-200/80 bg-[#fbf8f3] p-8 shadow-[0_24px_80px_rgba(148,163,184,0.12)]">
            <SectionLabel>Decision Drivers</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
              Great systems begin with visible forces.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Before choosing patterns or tools, architecture asks a harder question: what exactly is pushing this system into shape?
            </p>

            <div className="mt-8 space-y-4">
              {lifecycle.map((item) => (
                <div key={item.phase} className="rounded-[1.6rem] border border-slate-200/80 bg-white px-5 py-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold tracking-[0.18em] text-white">
                      {item.phase}
                    </span>
                    <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            <motion.div variants={fadeUp} className="rounded-[2.4rem] bg-slate-950 p-8 text-white shadow-[0_32px_100px_rgba(15,23,42,0.30)]">
              <SectionLabel>Drivers in Practice</SectionLabel>
              <p className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
                Architecture quality comes from balancing pressure, not ignoring it.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
                Functional requirements matter, but they are never the full picture. Quality attributes, constraints, cost, organizational shape, and future workload all influence the right design.
              </p>

              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-4 md:grid-cols-2">
                {drivers.map((item) => (
                  <FeatureCard key={item.title} item={item} dark />
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 rounded-[2.2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_80px_rgba(148,163,184,0.15)] backdrop-blur">
              <div className="flex items-center gap-3 text-slate-500">
                <Aperture className="h-5 w-5" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em]">Abstraction Ladder</p>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  "L0 · Machine and operating foundations",
                  "L1 · Languages, tools, and programming structure",
                  "L2 · Low-level technical building blocks like libraries and middleware",
                  "L3 · Domain foundations and shared business capability",
                  "L4 · High-level problem abstraction for real business scenarios",
                ].map((line, index) => (
                  <div key={line} className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-[#faf7f2] px-4 py-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                      {index}
                    </span>
                    <p className="text-sm leading-6 text-slate-600">{line}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-24">
          <motion.div variants={fadeUp} className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Five Views</SectionLabel>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
                No single diagram tells the whole truth.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-base">
              Architecture becomes legible when we inspect the system through multiple lenses. Each view answers a different question and protects a different kind of quality.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {views.map((view, index) => (
              <motion.div
                key={view.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_20px_60px_rgba(148,163,184,0.14)] backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">View {index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">{view.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{view.focus}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <motion.div variants={fadeUp} className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_35px_120px_rgba(15,23,42,0.32)] md:p-10">
            <SectionLabel>Design Principles</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
              Elegant architecture is disciplined compromise.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              The goal is not technical purity. The goal is to solve the important problem with the right amount of structure, under real-world limits, while keeping room for change.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {principles.map((item) => (
                <div key={item.title} className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/68">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div variants={fadeUp} className="rounded-[2.4rem] border border-slate-200/80 bg-[#fbf8f3] p-8 shadow-[0_24px_80px_rgba(148,163,184,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Architect Mindset</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
                The architect’s role is not decoration. It is reduction.
              </h2>
              <div className="mt-8 space-y-4">
                {architectRoles.map((item) => (
                  <div key={item.title} className="rounded-[1.6rem] border border-slate-200/80 bg-white px-5 py-5">
                    <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-[2.2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_80px_rgba(148,163,184,0.15)] backdrop-blur">
              <div className="flex items-center gap-3 text-slate-700">
                <Layers3 className="h-5 w-5" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">A Closing Rule</p>
              </div>
              <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
                Architecture should serve the team, the strategy, and the product, not the architect’s ego.
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Good architecture makes quality, collaboration, and change cheaper. When it becomes a display of technical vanity, it stops serving its real purpose.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                <span>From structure to stewardship</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          </div>
        </section>

        <motion.footer variants={fadeUp} className="mt-24 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Software Architecture</p>
          <p className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 [font-family:Iowan_Old_Style,Palatino_Linotype,Book_Antiqua,Georgia,serif]">
            Start from a system simple enough to work. Then let evolution, not vanity, carry it forward.
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
