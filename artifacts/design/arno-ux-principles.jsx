import React from 'react';

const principles = [
  ['01', 'Begin with people and their stories', 'Know who the product serves, the situation they are in, and the outcome they need. Design the whole journey around that value, then observe real people using it.'],
  ['02', 'Make the essential effortless', 'Bring the few scenarios that matter most to the first glance. Use fewer steps, fewer clicks, and fewer elements. Let deeper layers offer discoverable power for long-tail and professional needs. We take on the complexity so people do not have to.'],
  ['03', 'Show value before configuration', 'Give people a useful result they can see and understand. Thoughtful defaults and an experience ready to use out of the box should bring them to value before asking for professional setup.'],
  ['04', 'Make conversation a doorway', 'In AI products, a prompt is an invitation. Show what people can ask with concrete examples and clear input affordances. Make agent progress, uncertainty, and actions visible; keep people in control, with ways to correct and recover.'],
  ['05', 'Feel smooth. Feel elegant.', 'Craft continuity from beginning to end: responsive feedback, predictable transitions, preserved context, and graceful recovery. Apply the 3E: effectiveness, efficiency, and elegance.'],
  ['06', 'Make it feel human', 'A product should feel welcoming, intuitive, inspiring, and joyful. Guide without intimidating; respect attention and make room for confidence, curiosity, and delight.'],
  ['07', 'Details win the whole game', 'Care for the empty state, the default, the words, the motion, the error, and the last click. Small moments add up to trust. Own the experience end to end.'],
];

export default function App() {
  return (
    <main className="min-h-screen bg-[#f8f7f3] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-amber-200">
      <header className="max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-700 dark:text-amber-400">A living guide · Arno</p>
        <h1 className="mt-8 max-w-4xl text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.03]">We simplify.<br /><span className="text-zinc-400">We perfect.</span></h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">Principles for UX and product design: make powerful things feel simple, useful, and human.</p>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500">Rooted in my admiration for Apple’s approach to design and inspired by the <a className="underline underline-offset-4 hover:text-amber-700" href="/knowledge/design/apple-design-principle">Apple design guide</a>. What follows is my own evolving interpretation and practice.</p>
      </header>
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-6 py-14 grid gap-8 md:grid-cols-3">
          {[['Effectiveness', 'Does it deliver the outcome that matters?'], ['Efficiency', 'Can people reach it with less effort?'], ['Elegance', 'Does the whole journey feel clear and considered?']].map(([title, text]) => <div key={title}><h2 className="text-xl font-semibold tracking-tight">{title}</h2><p className="mt-2 text-sm leading-relaxed text-zinc-500">{text}</p></div>)}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12"><p className="text-xs uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">The principles</p><h2 className="mt-4 text-4xl font-semibold tracking-tight">A compass for the work.</h2></div>
        <div className="grid gap-4 md:grid-cols-2">{principles.map(([number, title, description]) => <article key={number} className="rounded-3xl bg-white dark:bg-zinc-900 p-8 md:p-10 border border-zinc-200/70 dark:border-zinc-800"><span className="text-sm font-mono text-amber-700 dark:text-amber-400">{number}</span><h3 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h3><p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p></article>)}</div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-24"><div className="rounded-3xl bg-zinc-900 text-white p-8 md:p-14"><p className="text-xs uppercase tracking-[0.2em] text-amber-300">A practical check</p><h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight">Would I love using this?</h2><ul className="mt-8 grid gap-4 md:grid-cols-2 text-zinc-300 leading-relaxed"><li>Who is this for, and what meaningful story does it serve?</li><li>Can someone reach a valuable result without setup anxiety?</li><li>Is the essential path calm, and is deeper capability discoverable?</li><li>Does it feel smooth and elegant, including errors and recovery?</li><li>Can people understand and steer the AI’s actions?</li><li>Have we tested the journey with real people and refined its details?</li></ul><p className="mt-10 text-sm text-zinc-400">Avoid the old enterprise trap: exposing every setting and feature before people can experience the value.</p></div></section>
      <footer className="px-6 pb-16 text-center text-sm text-zinc-500">Make useful things. Make people feel good. Keep refining. ♥</footer>
    </main>
  );
}
