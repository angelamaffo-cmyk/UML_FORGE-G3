"use client";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    h1: "Une tarification qui évolue avec vous.",
    sub: "Commencez gratuitement. Passez au niveau supérieur quand vous livrez plus.",
    perMonth: "/mois",
    popular: "Le plus populaire",
    tiers: [
      { name: "Gratuit", price: "0 $", desc: "Pour les développeurs solo.", feat: ["3 diagrammes","Export SQL","Mode sombre","Support communautaire"], cta: "Commencer gratuitement" },
      { name: "Pro", price: "12 $", desc: "Pour les utilisateurs avancés.", feat: ["Diagrammes illimités","Synchronisation cloud","Historique des versions","Export SVG","Support prioritaire"], cta: "Passer Pro", highlight: true },
      { name: "Équipe", price: "29 $", desc: "Pour les équipes de modélisation.", feat: ["Collaboration en temps réel","Espaces partagés","SSO / SAML","Journal d'audit","CSM dédié"], cta: "Contacter les ventes" },
    ],
  },
  en: {
    h1: "Pricing that scales with you.",
    sub: "Start free. Upgrade when you ship more.",
    perMonth: "/mo",
    popular: "Most popular",
    tiers: [
      { name: "Free", price: "$0", desc: "For solo developers.", feat: ["3 diagrams","SQL export","Dark mode","Community support"], cta: "Start free" },
      { name: "Pro", price: "$12", desc: "For power users.", feat: ["Unlimited diagrams","Cloud sync","Version history","SVG export","Priority support"], cta: "Upgrade", highlight: true },
      { name: "Team", price: "$29", desc: "For modeling teams.", feat: ["Real-time collaboration","Shared workspaces","SSO / SAML","Audit log","Dedicated CSM"], cta: "Contact sales" },
    ],
  },
};

export default function Pricing() {
  const { lang } = useLang(); const t = STR[lang];
  return (
    <div className="min-h-screen bg-background">
      <SiteNav/>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-black">{t.h1}</h1>
          <p className="mt-3 text-muted-foreground">{t.sub}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {t.tiers.map(ti => (
            <div key={ti.name} className={`rounded-2xl border p-8 transition-all hover:-translate-y-1 ${ti.highlight ? "border-accent bg-accent/5 shadow-2xl shadow-accent/20" : "border-border bg-card"}`}>
              {ti.highlight && <div className="inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground mb-3">{t.popular}</div>}
              <div className="font-bold text-lg">{ti.name}</div>
              <div className="text-xs text-muted-foreground">{ti.desc}</div>
              <div className="mt-4"><span className="text-5xl font-black">{ti.price}</span><span className="text-muted-foreground">{t.perMonth}</span></div>
              <ul className="mt-8 space-y-3 text-sm">{ti.feat.map(f => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-success shrink-0 mt-0.5"/>{f}</li>)}</ul>
              <Link href="/signup" className={`mt-8 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition ${ti.highlight ? "bg-accent text-accent-foreground hover:opacity-90" : "border border-border hover:bg-surface"}`}>{ti.cta}</Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter/>
    </div>
  );
}
