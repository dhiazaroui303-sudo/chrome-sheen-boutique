import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Sparkles, Wrench } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "LUXE Atelier — Premium Hair Tools for Master Craftsmen" },
      {
        name: "description",
        content:
          "Discover hand-engineered clippers, dryers and shears built for elite barbers and stylists. Lifetime warranty. Free worldwide shipping.",
      },
    ],
  }),
});

const featuredCats = categories.filter((c) => c.slug !== "all").slice(0, 4);

function Home() {
  const featured = products.slice(0, 4);
  const { t, category } = useLanguage();

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 hero-ambient">
          <img
            src={heroImg}
            alt="Premium hair clipper"
            width={1920}
            height={1080}
            className="w-full h-full object-cover hero-image-motion"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 py-20 grid lg:grid-cols-2 gap-10 items-center w-full">
          <div className="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold hero-line-motion" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold">
                {t("home.eyebrow")}
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              {t("home.titleA")}
              <span className="text-gradient-gold italic hero-gold-motion"> {t("home.titleB")} </span>
              {t("home.titleC")}
            </h1>
            <p className="mt-7 text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t("home.copy")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:opacity-90 transition-all shadow-gold hero-cta-motion"
              >
                {t("home.shop")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 border border-border hover:border-gold hover:text-gold px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-colors"
              >
                {t("home.craft")}
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="font-display text-3xl text-gradient-gold">12</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {t("home.stat1")}
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-gradient-gold">48</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {t("home.stat2")}
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-gradient-gold">∞</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {t("home.stat3")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold">
               {t("home.explore")}
            </p>
            <h2 className="font-display text-4xl lg:text-5xl mt-3">
              {t("home.collection")}
            </h2>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase hover:text-gold transition-colors"
          >
            {t("home.viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {featuredCats.map((cat) => (
            <Link
              key={cat.slug}
              to="/products"
              search={{ category: cat.slug }}
              className="luxe-card group p-8 rounded-sm aspect-[3/4] flex flex-col justify-end relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-radial opacity-60" />
              <div className="relative">
                <h3 className="font-display text-2xl group-hover:text-gold transition-colors">
                  {category(cat.slug)}
                </h3>
                <span className="inline-flex items-center gap-2 mt-3 text-[10px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-gold transition-colors">
                  {t("home.cardExplore")} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold">
            {t("home.signature")}
          </p>
          <h2 className="font-display text-4xl lg:text-5xl mt-3">
            {t("home.featured")}
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: t("home.innovation"),
                text: t("home.innovationText"),
              },
              {
                icon: Award,
                title: t("home.design"),
                text: t("home.designText"),
              },
              {
                icon: Wrench,
                title: t("home.performance"),
                text: t("home.performanceText"),
              },
            ].map((b) => (
              <div key={b.title} className="luxe-card p-10 rounded-sm">
                <div className="w-14 h-14 rounded-sm bg-gradient-gold flex items-center justify-center text-primary-foreground">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl mt-6">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
