import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Our Story — LUXE Atelier" },
      {
        name: "description",
        content:
          "Founded in 2014, LUXE Atelier crafts hair tools for the world's most demanding professionals.",
      },
      { property: "og:title", content: "Our Story — LUXE Atelier" },
      { property: "og:description", content: "Founded in 2014. Crafted in limited series." },
    ],
  }),
});

function About() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-5 lg:px-10 py-20 lg:py-28 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold">Our Story</p>
        <h1 className="font-display text-5xl lg:text-7xl mt-5 leading-[1.05]">
          Engineered for those who <span className="italic text-gradient-gold">refuse</span> compromise.
        </h1>
        <p className="text-lg text-muted-foreground mt-8 leading-relaxed max-w-2xl mx-auto">
          LUXE Atelier was founded in 2014 by a third-generation barber and an
          aerospace engineer. We were tired of tools designed for spreadsheets,
          not for the hand. So we built our own.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-3 gap-6 stagger">
          {[
            {
              n: "01",
              title: "Innovation",
              text: "Every tool begins with a question from a working barber. We prototype in our Milan workshop using brushless motors, Japanese steel and aerospace-grade alloys until the answer feels inevitable.",
            },
            {
              n: "02",
              title: "Design",
              text: "Form follows ritual. We obsess over weight, balance and the tactile language of every detail — because a tool used 200 times a day must disappear into the hand.",
            },
            {
              n: "03",
              title: "Professional Tools",
              text: "We do not make tools for the bathroom drawer. We make tools for the chair. Every piece is tested for 10,000 hours of professional use before it bears our mark.",
            },
          ].map((b) => (
            <article key={b.n} className="luxe-card p-10 rounded-sm">
              <p className="font-display text-5xl text-gradient-gold">{b.n}</p>
              <h3 className="font-display text-2xl mt-6">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                {b.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 lg:px-10 py-20 text-center">
        <div className="gold-divider w-24 mx-auto mb-10" />
        <p className="font-display text-3xl lg:text-4xl italic leading-snug">
          "A great tool is not a purchase. It is a partnership for the length of a career."
        </p>
        <p className="text-xs tracking-[0.3em] uppercase text-gold mt-8">
          — Marco Verdi, Founder
        </p>
      </section>
    </div>
  );
}
