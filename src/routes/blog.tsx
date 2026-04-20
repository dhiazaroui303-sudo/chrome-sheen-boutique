import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import clipperImg from "@/assets/clipper.jpg";
import hairdryerImg from "@/assets/hairdryer.jpg";
import accessoriesImg from "@/assets/accessories.jpg";
import straightenerImg from "@/assets/straightener.jpg";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Journal — LUXE Atelier" },
      {
        name: "description",
        content:
          "Notes from the workshop. Interviews, technique guides, and the philosophy behind the craft.",
      },
      { property: "og:title", content: "Journal — LUXE Atelier" },
      { property: "og:description", content: "Notes from the workshop." },
    ],
  }),
});

const posts = [
  {
    title: "The Anatomy of a Perfect Fade",
    category: "Technique",
    preview:
      "Three master barbers from Milan, Tokyo and São Paulo break down the geometry of a flawless fade.",
    image: clipperImg,
    date: "Apr 12, 2026",
  },
  {
    title: "Why We Forge in Limited Series",
    category: "Philosophy",
    preview:
      "On the discipline of producing only what we can perfect — and never one piece more.",
    image: hairdryerImg,
    date: "Mar 28, 2026",
  },
  {
    title: "The Sharpening Ritual",
    category: "Care",
    preview:
      "Our maintenance master Hideo Tanaka on why a blade is never finished — only paused.",
    image: accessoriesImg,
    date: "Mar 14, 2026",
  },
  {
    title: "Heat, Memory, and the Strand",
    category: "Science",
    preview:
      "The molecular story of why titanium-ceramic plates outperform every alternative.",
    image: straightenerImg,
    date: "Feb 22, 2026",
  },
];

function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 lg:py-16">
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold">Journal</p>
        <h1 className="font-display text-5xl lg:text-6xl mt-3">Notes from the workshop</h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Interviews, techniques and reflections from the craftsmen and stylists
          who shape our work.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 stagger">
        {posts.map((post) => (
          <article
            key={post.title}
            className="luxe-card group rounded-sm overflow-hidden cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase">
                <span className="text-gold">{post.category}</span>
                <span className="text-muted-foreground">{post.date}</span>
              </div>
              <h2 className="font-display text-2xl mt-4 group-hover:text-gold transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {post.preview}
              </p>
              <span className="inline-flex items-center gap-2 mt-5 text-xs tracking-[0.25em] uppercase text-gold">
                Read <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
