import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — LUXE Atelier" },
      {
        name: "description",
        content:
          "Speak with our concierge team. We respond within 4 hours, 24/7, in 12 languages.",
      },
      { property: "og:title", content: "Contact — LUXE Atelier" },
      { property: "og:description", content: "Concierge support, 24/7." },
    ],
  }),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { t } = useLanguage();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("contact.received"), {
      description: t("contact.response"),
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 lg:py-16">
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold">{t("contact.label")}</p>
        <h1 className="font-display text-5xl lg:text-6xl mt-3">{t("contact.title")}</h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          {t("contact.copy")}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <form onSubmit={submit} className="luxe-card p-8 lg:p-10 rounded-sm space-y-6">
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">
              {t("contact.name")}
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-base transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">
              {t("contact.email")}
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-base transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">
              {t("contact.message")}
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-base transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-gold text-primary-foreground px-10 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:opacity-90 transition-opacity shadow-gold"
          >
            {t("contact.send")}
          </button>
        </form>

        <aside className="space-y-6">
          <div className="luxe-card p-7 rounded-sm">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
               {t("contact.atelier")}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Via della Spiga 14<br />20121 Milano, Italia
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a href="mailto:concierge@luxeatelier.com" className="text-muted-foreground hover:text-gold">
                  concierge@luxeatelier.com
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a href="tel:+390212345678" className="text-muted-foreground hover:text-gold">
                  +39 02 1234 5678
                </a>
              </li>
            </ul>
          </div>

          <div className="luxe-card rounded-sm aspect-[4/3] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial opacity-50" />
            <div className="relative text-center">
              <MapPin className="w-10 h-10 text-gold mx-auto" />
              <p className="font-display text-xl mt-3">Milano</p>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                {t("contact.visit")}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
