import { Menu } from "./components/Menu";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16 pt-10 sm:pt-16">
        <div className="rounded-3xl bg-forest p-8 sm:p-12 text-cream shadow-sm">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cream/70">
            Toreshan Baby Shower · May 3
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] sm:text-7xl">
            Lil&rsquo; Bean
            <br />
            <span className="italic font-light">Coffeehouse</span>
          </h1>
          <p className="mt-4 max-w-md font-serif text-base text-cream/85">
            Drop-in café for the day. Pre-order ahead or order at the counter — your drinks ping the barista on Discord.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
            <Detail term="Date" def="Sun · May 3, 2026" />
            <Detail term="Hours" def="12 PM – 4 PM" />
            <Detail term="Address" def="2181 Madison Ave, Burnaby" />
            <Detail term="Buzzer" def="7340 · 4th-floor party room" />
          </dl>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <p className="mb-2 font-display text-xs uppercase tracking-[0.3em] text-forest/60">
          The menu
        </p>
        <h2 className="mb-10 font-display text-4xl italic text-forestDark">
          What can we make you?
        </h2>
        <Menu />
      </section>

      <footer className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16 pb-16 text-center text-xs uppercase tracking-[0.25em] text-forest/50">
        Bring your own mug · Snacks provided
      </footer>
    </main>
  );
}

function Detail({ term, def }: { term: string; def: string }) {
  return (
    <div>
      <dt className="text-cream/60 text-[0.65rem] uppercase tracking-[0.25em]">{term}</dt>
      <dd className="mt-0.5 font-display">{def}</dd>
    </div>
  );
}
