export default function WabiSabiProductDesignPage() {
  const principles = [
    {
      title: 'Imperfection',
      zh: '不完美',
      desc: 'Do not hide every flaw. Let character, texture, repair, and use history become part of the product’s identity.',
      learn: ['Show honest material behavior', 'Design for patina, not disposable perfection', 'Turn repair into a visible story'],
    },
    {
      title: 'Impermanence',
      zh: '无常',
      desc: 'Products live in time. Aging, wear, and evolution can be meaningful rather than treated as failure.',
      learn: ['Choose materials that age well', 'Plan for maintenance and replacement cycles', 'Accept change as part of experience'],
    },
    {
      title: 'Simplicity',
      zh: '简素',
      desc: 'Remove the nonessential until the core feeling and function remain calm, clear, and enough.',
      learn: ['Reduce feature clutter', 'Keep interfaces cognitively light', 'Let form serve essence'],
    },
    {
      title: 'Naturalness',
      zh: '自然',
      desc: 'Favor organic textures, honest materials, and forms that feel grounded in the physical world.',
      learn: ['Use wood, clay, linen, stone-like tactility', 'Prefer tactile warmth over sterile gloss', 'Create sensory closeness'],
    },
    {
      title: 'Asymmetry',
      zh: '不对称',
      desc: 'Perfect symmetry can feel distant. Small irregularities can create warmth, life, and memorability.',
      learn: ['Use controlled irregularity', 'Avoid over-standardized sameness', 'Let variation imply humanity'],
    },
    {
      title: 'Modesty',
      zh: '谦逊',
      desc: 'The product does not need to shout. Quiet confidence often produces deeper trust and longer affection.',
      learn: ['Use subdued visual language', 'Keep branding restrained', 'Let usefulness carry the product'],
    },
  ];

  const cases = [
    {
      name: 'Hagi Tea Bowl',
      tag: 'Wabi-sabi native example',
      insight: 'The bowl becomes more beautiful through use. Cracks, texture, and glaze changes make time visible.',
    },
    {
      name: 'Kintsugi Pottery',
      tag: 'Repair as meaning',
      insight: 'Repair is not concealed. Damage becomes narrative, emotional depth, and renewed value.',
    },
    {
      name: 'MUJI Solid Wood Furniture',
      tag: 'Minimal + natural',
      insight: 'Plain form, natural grain, and quiet aging show how simplicity and material honesty can coexist.',
    },
    {
      name: 'Apple iPhone',
      tag: 'Counter-example',
      insight: 'Excellent precision and clarity, but also a useful contrast: perfection alone does not always create warmth.',
    },
    {
      name: 'Nambu Iron Teapot',
      tag: 'Durability and patina',
      insight: 'Heft, texture, and gradual aging create attachment through ritual and repeated use.',
    },
    {
      name: 'IKEA Furniture',
      tag: 'Mass standardization',
      insight: 'Affordable and functional, but often lacking individuality. It shows the trade-off between consistency and soul.',
    },
  ];

  const productRules = [
    'Design for aging, not just launch-day perfection',
    'Make repair, replacement, and maintenance first-class experiences',
    'Reduce features until the product feels calm and legible',
    'Prefer honest materials over decorative simulation',
    'Allow controlled variation where it adds humanity',
    'Measure emotional durability, not only efficiency',
    'Respect cultural roots instead of copying surface style',
  ];

  const process = [
    { step: '01', title: 'Research', text: 'Study the cultural roots of wabi-sabi and understand how your users perceive imperfection, aging, and authenticity.' },
    { step: '02', title: 'Concept', text: 'Translate wabi-sabi into product principles: fewer features, honest materials, visible repair, and calm visual hierarchy.' },
    { step: '03', title: 'Prototype', text: 'Test natural textures, unfinished details, and simpler flows. Observe whether the product feels more human and grounded.' },
    { step: '04', title: 'Evaluate', text: 'Assess not only usability, but also emotional resonance, calmness, trust, and long-term attachment.' },
    { step: '05', title: 'Scale', text: 'Balance craftsmanship with manufacturability. Keep the spirit even when the system grows.' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-stone-300 px-3 py-1 text-xs tracking-[0.2em] text-stone-600 uppercase">
              Wabi-Sabi × Product Design
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl md:leading-[1.05]">
              What product design can learn from <span className="italic">Wabi-Sabi</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-stone-600 md:text-lg">
              Wabi-sabi is not just a visual style. It is a philosophy of accepting imperfection, transience, simplicity, and quiet naturalness.
              For product teams, it offers a different design lens: less obsession with sterile perfection, more attention to emotional durability,
              honest materials, repairability, and calm user experience.
            </p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white/70 p-6 shadow-sm">
            <div className="text-sm text-stone-500">Core idea</div>
            <div className="mt-3 text-2xl font-medium leading-snug">
              Great products do not need to feel flawless.
              <br />
              They need to feel alive, useful, and worth keeping.
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:col-span-2">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Wabi-Sabi in one sentence</div>
            <p className="mt-4 text-xl leading-8 text-stone-700">
              Beauty exists in the incomplete, the weathered, the modest, and the real.
            </p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-stone-900 p-6 text-stone-100 shadow-sm">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-400">Design translation</div>
            <p className="mt-4 text-lg leading-7">
              Build products that age with users instead of products that only impress on day one.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Principles</div>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Six lessons for product philosophy</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">{item.zh}</span>
                </div>
                <p className="mt-4 leading-7 text-stone-600">{item.desc}</p>
                <div className="mt-5 space-y-2">
                  {item.learn.map((point) => (
                    <div key={point} className="rounded-2xl bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-700">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Why this matters now</div>
            <h2 className="mt-3 text-2xl font-semibold">A modern product world has three excesses</h2>
            <div className="mt-6 space-y-4">
              {[
                'Too much polish, not enough personality',
                'Too many features, not enough clarity',
                'Too much replacement, not enough repair',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-stone-200 px-4 py-4 text-stone-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-stone-100 p-7 shadow-sm">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Wabi-sabi response</div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {productRules.map((rule, idx) => (
                <div key={rule} className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Rule {idx + 1}</div>
                  <div className="mt-2 leading-7 text-stone-700">{rule}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Case studies</div>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Examples and counter-examples</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((c) => (
              <div key={c.name} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400">{c.tag}</div>
                <h3 className="mt-3 text-xl font-semibold">{c.name}</h3>
                <p className="mt-4 leading-7 text-stone-600">{c.insight}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Implementation</div>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">How to apply it in a product process</h2>
            </div>
            <div className="max-w-xl text-sm leading-6 text-stone-500">
              Wabi-sabi should influence decisions from research to scaling—not as decoration, but as a product principle.
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-5">
            {process.map((p) => (
              <div key={p.step} className="rounded-3xl bg-stone-50 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400">{p.step}</div>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-stone-900 p-7 text-stone-100 shadow-sm">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-400">Key takeaway</div>
            <h2 className="mt-3 text-2xl font-semibold">Wabi-sabi is not anti-quality</h2>
            <p className="mt-4 leading-7 text-stone-300">
              It is anti-vanity. It asks designers to distinguish between genuine quality and superficial perfection.
              A product can be precise, functional, and excellent—while still remaining humble, repairable, textured, and emotionally resonant.
            </p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Cultural caution</div>
            <h2 className="mt-3 text-2xl font-semibold">Do not copy the surface only</h2>
            <p className="mt-4 leading-7 text-stone-600">
              Wabi-sabi comes from Japanese cultural and philosophical roots. Borrowing it well means respecting the deeper ideas—impermanence,
              humility, naturalness, and acceptance—not just adding rough textures or “aged” styling as a visual gimmick.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-100 to-white p-8 shadow-sm">
          <div className="max-w-4xl">
            <div className="text-sm uppercase tracking-[0.18em] text-stone-500">Final synthesis</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">A better product question</h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              Instead of asking, “How do we make this look perfect?” ask:
              <span className="block pt-3 text-2xl font-medium text-stone-900 md:text-3xl">
                “How do we make this worthy of being lived with?”
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
