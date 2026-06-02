import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Compass,
  MessageSquare,
  FolderCog,
  Code2,
  FlaskConical,
  Hammer,
  Rocket,
  TrendingUp,
  Star,
  Layers,
  Server,
  Cpu,
  Palette,
  Scale,
  ArrowRight,
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

const shift = [
  {
    axis: "The Time Axis",
    sub: "Anthropic's playbook",
    title: "Founder as orchestrator of agents",
    body:
      "Work used to be scarce, so the founder lived in execution mode. AI made executable work cheap and elastic. The founder's attention moves up the stack: from doing the work to directing the systems that do it.",
    icon: Compass,
  },
  {
    axis: "The Org Axis",
    sub: "The AI-first product team",
    title: "Teams sized by kinds of judgment",
    body:
      "Stop sizing a team by how much work there is. Size it by how many distinct kinds of judgment the product deserves. The org chart stops mapping who does what and becomes a map of where human judgment is irreducible.",
    icon: Layers,
  },
];

const surfaces = [
  {
    name: "Chat",
    icon: MessageSquare,
    reach: "A question, a rewrite, a quick brainstorm.",
    why: "Fast, conversational, no setup.",
  },
  {
    name: "Claude Cowork",
    icon: FolderCog,
    reach: "Research, analysis, a finished doc built from your files.",
    why: "Folder access, connectors, skills, scheduled runs.",
  },
  {
    name: "Claude Code",
    icon: Code2,
    reach: "Writing, testing, shipping software across a codebase.",
    why: "Codebase access, diffs, git, dev environments.",
  },
];

const stages = [
  {
    icon: FlaskConical,
    step: "01",
    name: "Idea",
    question: "Is this worth building?",
    goal: "Research-driven validation to problem-solution fit.",
    exit: "The problem is real and specific, the solution fits the revealed problem, and there is enough signal to commit.",
    trap: "Mistaking building for validating.",
  },
  {
    icon: Hammer,
    step: "02",
    name: "MVP",
    question: "What should we build first?",
    goal: "The smallest product that generates real evidence of fit.",
    exit: "Genuine product-market fit: retention, revenue, or referral.",
    trap: "Zero-friction scope creep.",
  },
  {
    icon: Rocket,
    step: "03",
    name: "Launch",
    question: "Does the business deserve to grow?",
    goal: "Turn traction into a repeatable, channel-driven growth engine.",
    exit: "Repeatable growth, hardened infra, ops without a founder bottleneck.",
    trap: "The founder becomes the bottleneck.",
  },
  {
    icon: TrendingUp,
    step: "04",
    name: "Scale",
    question: "From a bet to a business.",
    goal: "Systematic growth and a defensible moat under external scrutiny.",
    exit: "The company is sustainable even when the founder is not running day-to-day.",
    trap: "Expanding before you are ready.",
  },
];

const seats = [
  {
    icon: Star,
    name: "The Polar Star",
    owns: "what to build and why",
    body: "The pentagon-warrior across product, tech, business, design, and story. The scarce thing is the courage to see the future before it is obvious.",
  },
  {
    icon: Sparkles,
    name: "Client Experience",
    owns: "how it should feel",
    body: "The bridge between human intention and machine capability. Interaction, motion, speed, the texture of the first touch and the thousandth.",
  },
  {
    icon: Server,
    name: "Backend & Systems",
    owns: "what must not break",
    body: "Data, reliability, the parts that stay invisible so the visible product can shine.",
  },
  {
    icon: Cpu,
    name: "AI & Agentic Engineering",
    owns: "how the team itself runs",
    body: "Turns human tasks into agent sessions and builds the execution lanes the other six ride on.",
  },
  {
    icon: Palette,
    name: "Design & Taste",
    owns: "who the product is",
    body: "Not decoration but personality. Where it gets decided whether the product is merely strong or actually remembered.",
  },
  {
    icon: TrendingUp,
    name: "Growth & Business",
    owns: "whether the world adopts and pays",
    body: "A product is not successful because it is well built. It is successful when it is understood, trusted, and paid for.",
  },
  {
    icon: Scale,
    name: "Legal, Finance, Ops",
    owns: "whether the company survives its own success",
    body: "Maybe not full-time on day one, but never absent.",
  },
];

const reconciliation = [
  {
    stage: "Idea",
    lead: "The Polar Star",
    why: "Conviction plus the discipline to validate before building.",
  },
  {
    stage: "MVP",
    lead: "AI Engineering · Client Experience",
    why: "Build the right thing the right way, with context that compounds.",
  },
  {
    stage: "Launch",
    lead: "Growth · Backend & Systems",
    why: "Harden the product and make growth repeatable.",
  },
  {
    stage: "Scale",
    lead: "Growth · Legal-Finance-Ops · Taste",
    why: "Moat, governance, and the soul that survives scrutiny.",
  },
];

const rules = [
  {
    title: "Quarters compress into weeks",
    body: "Validation cycles shrink to afternoons. A prototype needs a clear problem and a few focused sessions, not a co-founder with the right stack.",
  },
  {
    title: "Building got cheap, so restraint is the discipline",
    body: "The natural forcing function against bad bets was the cost of building. Remove it and you remove the pause. Keep sense-making ahead of building.",
  },
  {
    title: "Distribution is the wall",
    body: "The playbook assumes building is the hard part. For a lean product it is backwards. Getting users is the wall, and the Growth seat is the one no agent can hold for you.",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" />
      <span>{children}</span>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.01 }}
      className={
        "rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 text-white shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl " +
        className
      }
    >
      {children}
    </motion.div>
  );
}

export default function AiNativeStartupPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#070b16] text-white [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-8rem] h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-[-8rem] top-[14rem] h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 md:px-8 lg:px-10"
      >
        {/* Hero */}
        <motion.header
          variants={fadeUp}
          className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.04] px-8 py-12 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-xl md:px-14 md:py-16"
        >
          <SectionLabel>Knowledge Artifact · AI-Native Startups</SectionLabel>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            The AI-Native Founder
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            Work got cheap. Judgment stayed scarce. The same shift, read two
            ways — a founder moving through four stages, and a team built around
            seven kinds of judgment no agent can hold.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/50">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <Compass className="h-4 w-4" /> Idea · MVP · Launch · Scale
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <Layers className="h-4 w-4" /> Seven seats of judgment
            </span>
          </div>
        </motion.header>

        {/* The Shift */}
        <section className="mt-20">
          <motion.div variants={fadeUp} className="mb-8">
            <SectionLabel>The Shift</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              One collapse, two axes
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              The founder moving up the stack and the team sized by judgment are
              the same argument from opposite ends. They meet at one word.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {shift.map((s) => {
              const Icon = s.icon;
              return (
                <GlassCard key={s.axis}>
                  <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/10 p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
                    {s.axis} · {s.sub}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{s.body}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Three Surfaces */}
        <section className="mt-20">
          <motion.div variants={fadeUp} className="mb-8">
            <SectionLabel>Three Surfaces</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Pick the surface by the shape of the task
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              The same intelligence underneath; what changes is the workspace
              around it.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {surfaces.map((s) => {
              const Icon = s.icon;
              return (
                <GlassCard key={s.name}>
                  <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/10 p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{s.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{s.reach}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/40">
                    {s.why}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Four Stages */}
        <section className="mt-20">
          <motion.div variants={fadeUp} className="mb-8">
            <SectionLabel>Four Stages</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              The lifecycle, rebooted
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              Each stage is still an evidence-gathering exercise. Every stage
              also has a signature trap that AI makes easier to fall into.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {stages.map((s) => {
              const Icon = s.icon;
              return (
                <GlassCard key={s.name}>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 p-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-3xl font-semibold text-white/15">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm italic text-white/55">
                    {s.question}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/72">{s.goal}</p>
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                        Exit
                      </span>
                      <p className="mt-1 text-white/65">{s.exit}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300/80">
                        Trap
                      </span>
                      <p className="mt-1 text-white/65">{s.trap}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Seven Seats */}
        <section className="mt-20">
          <motion.div variants={fadeUp} className="mb-8">
            <SectionLabel>Seven Seats</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              The judgment an agent cannot hold
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              Play the delete game on any org chart — cross out every box an
              agent could do today, keep the judgment. About seven seats
              survive. Each is a human plus a swarm of agents.
            </p>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {seats.map((s) => {
              const Icon = s.icon;
              return (
                <GlassCard key={s.name} className="p-6">
                  <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/10 p-2.5">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm text-white/55">
                    Owns <span className="text-white/80">{s.owns}</span>.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/65">{s.body}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Reconciliation */}
        <section className="mt-20">
          <motion.div variants={fadeUp} className="mb-8">
            <SectionLabel>The Reconciliation</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              The stages are the seats, in sequence
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              One founder moving from Idea to Scale is the seven seats taken on
              one at a time. At each stage, a different seat leads.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
            {reconciliation.map((r, i) => (
              <div
                key={r.stage}
                className={
                  "grid grid-cols-1 gap-2 px-7 py-6 md:grid-cols-[8rem_minmax(0,1fr)] md:items-center md:gap-6 " +
                  (i !== reconciliation.length - 1
                    ? "border-b border-white/10"
                    : "")
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold text-white">
                    {r.stage}
                  </span>
                  <ArrowRight className="hidden h-4 w-4 text-white/30 md:block" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-indigo-200/90">
                    {r.lead}
                  </div>
                  <p className="mt-1 text-sm text-white/60">{r.why}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* New Rules */}
        <section className="mt-20">
          <motion.div variants={fadeUp} className="mb-8">
            <SectionLabel>Same Job, New Rules</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              The bottleneck moved
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              The founder's job has not changed: find a real problem, build
              something that solves it, scale it into a company that matters.
              What changed is the path.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {rules.map((r) => (
              <GlassCard key={r.title}>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{r.body}</p>
              </GlassCard>
            ))}
          </div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-12 max-w-3xl text-center text-2xl font-medium leading-snug text-white/85 md:text-3xl"
          >
            The bottleneck is no longer what you can build, but what you choose
            to build — and whether you keep the courage to talk to real people
            before you let the agents run.
          </motion.p>
        </section>

        {/* Footer */}
        <motion.footer
          variants={fadeUp}
          className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-white/40"
        >
          Synthesized from Anthropic's <em>The Founder's Playbook: Building an
          AI-Native Startup</em> and the essay <em>The AI-First Product
          Team</em>.
        </motion.footer>
      </motion.div>
    </div>
  );
}
