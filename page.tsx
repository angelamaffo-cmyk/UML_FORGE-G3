"use client";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ArrowRight, Sparkles, Zap, Database, Shield, Code2, Layers, GitBranch, Check, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    badge: "v2.0 — Éditeur React Flow, mode sombre & import SQL",
    h1a: "Concevez des diagrammes UML",
    h1b: "avec une précision chirurgicale.",
    sub: "Un éditeur de diagrammes de classes professionnel construit sur un canevas haute performance. Glissez, connectez, définissez les multiplicités, puis exportez du SQL prêt pour la production en un clic.",
    ctaStart: "Commencer gratuitement",
    ctaTry: "Essayer l'éditeur",
    trustedBy: "Adopté par les équipes d'ingénierie de",
    featuresH2: "Tout ce qu'il faut pour modéliser votre domaine.",
    featuresSub: "Un flux de travail abouti, du croquis au schéma.",
    features: [
      { title: "Canevas React Flow", desc: "Déplacement et zoom fluides, multi-sélection, mini-carte. Conçu pour les gros diagrammes." },
      { title: "Toutes les multiplicités UML", desc: "1, 0..1, *, 1..*, 0..*. Association, composition, agrégation, héritage." },
      { title: "Import & export SQL", desc: "Collez un CREATE TABLE pour générer un diagramme. Générez du DDL Postgres ou MySQL en un clic." },
      { title: "Sauvegarde automatique", desc: "Chaque changement est conservé dans votre navigateur. Aucune inscription requise pour essayer." },
      { title: "Privé par conception", desc: "Toutes vos données restent sur votre appareil. Aucun aller-retour serveur." },
      { title: "Interface pensée pour les développeurs", desc: "Raccourcis clavier, mode sombre et une mise en page qui ne vous gêne pas." },
    ],
    showcaseTag: "Import SQL",
    showcaseH2: "Collez votre schéma. Obtenez un diagramme.",
    showcaseDesc: "Déposez n'importe quel script CREATE TABLE et UML Forge fait l'ingénierie inverse pour le transformer en diagramme entièrement éditable — colonnes, clés primaires, clés étrangères et relations comprises.",
    showcasePoints: ["Dialectes PostgreSQL & MySQL", "Détecte les FK et déduit les multiplicités", "Export aller-retour sans perte"],
    showcaseCta: "Essayer l'import SQL",
    statsTitle: "Adopté par des équipes qui modélisent en grand",
    stats: [
      { v: "12k+", l: "diagrammes créés" },
      { v: "98%", l: "satisfaction" },
      { v: "<40ms", l: "rendu canevas" },
      { v: "2", l: "dialectes SQL" },
    ],
    pricingH2: "Une tarification qui évolue avec vous.",
    pricingSub: "Commencez gratuitement. Passez au niveau supérieur quand vous livrez plus.",
    seePricing: "Voir tous les plans",
    ctaH2: "Prêt à livrer plus vite ?",
    ctaSub: "Rejoignez des milliers d'ingénieurs qui modélisent avec UML Forge.",
    ctaBtn: "Créer mon compte",
    diagramFile: "gestion-utilisateurs.uml",
  },
  en: {
    badge: "v2.0 — React Flow editor, dark mode & SQL import",
    h1a: "Design UML diagrams",
    h1b: "with surgical precision.",
    sub: "A professional class diagram editor built on a high-performance canvas. Drag, connect, set multiplicities, then export production-ready SQL in a single click.",
    ctaStart: "Start building free",
    ctaTry: "Try the editor",
    trustedBy: "Trusted by engineering teams at",
    featuresH2: "Everything you need to model your domain.",
    featuresSub: "An opinionated workflow from sketch to schema.",
    features: [
      { title: "React Flow canvas", desc: "Smooth pan, zoom, multi-select, minimap. Built for big diagrams." },
      { title: "All UML multiplicities", desc: "1, 0..1, *, 1..*, 0..*. Association, composition, aggregation, inheritance." },
      { title: "SQL import & export", desc: "Paste CREATE TABLE to scaffold a diagram. Generate Postgres or MySQL DDL in one click." },
      { title: "Auto-save", desc: "Every change is persisted in your browser. No sign-up needed to try." },
      { title: "Private by design", desc: "All your data stays in your device storage. No server roundtrip." },
      { title: "Developer-first UI", desc: "Keyboard shortcuts, dark mode, and a layout that gets out of your way." },
    ],
    showcaseTag: "SQL Import",
    showcaseH2: "Paste schema. Get a diagram.",
    showcaseDesc: "Drop any CREATE TABLE script and UML Forge reverse-engineers it into a fully editable diagram — columns, primary keys, foreign keys and relations included.",
    showcasePoints: ["PostgreSQL & MySQL dialects","Detects FK and inferred multiplicities","Round-trip safe export"],
    showcaseCta: "Try SQL import",
    statsTitle: "Adopted by teams modeling at scale",
    stats: [
      { v: "12k+", l: "diagrams created" },
      { v: "98%", l: "satisfaction" },
      { v: "<40ms", l: "canvas render" },
      { v: "2", l: "SQL dialects" },
    ],
    pricingH2: "Pricing that scales with you.",
    pricingSub: "Start free. Upgrade when you ship more.",
    seePricing: "See all plans",
    ctaH2: "Ready to ship faster?",
    ctaSub: "Join thousands of engineers modeling with UML Forge.",
    ctaBtn: "Create my account",
    diagramFile: "user-management.uml",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <Logos />
      <Features />
      <Showcase />
      <Stats />
      <PricingTeaser />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const { lang } = useLang(); const t = STR[lang];
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50" />
      <div className="pointer-events-none absolute -top-32 -left-20 -z-10 h-96 w-96 bg-accent/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-96 w-96 bg-primary/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }}/>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>{t.badge}</span>
        </div>
        <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight animate-slide-up">
          {t.h1a}<br/>
          <span className="gradient-text">{t.h1b}</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground animate-slide-up delay-1">{t.sub}</p>
        <div className="mt-10 flex items-center justify-center gap-4 animate-slide-up delay-2">
          <Link href="/signup" className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all animate-pulse-glow">
            {t.ctaStart} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
          </Link>
          <Link href="/editor" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-surface transition">
            <Play className="h-4 w-4"/> {t.ctaTry}
          </Link>
        </div>
        <div className="relative mt-20 mx-auto max-w-4xl animate-fade-in delay-3">
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-2xl rounded-3xl" />
          <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="h-9 border-b border-border bg-surface flex items-center px-3 gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive"/>
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"/>
              <span className="h-2.5 w-2.5 rounded-full bg-success"/>
              <span className="ml-3 text-xs text-muted-foreground font-mono">{t.diagramFile}</span>
            </div>
            <div className="relative h-96 grid-bg p-8">
              <FloatingClass title="User" attrs={["+id: UUID","+email: String","+name: String"]} className="absolute top-8 left-12 animate-float" />
              <FloatingClass title="Order" attrs={["+id: UUID","+total: Decimal","+status: Enum"]} className="absolute top-16 right-12 animate-float" style={{animationDelay:"1s"}}/>
              <FloatingClass title="Product" attrs={["+id: UUID","+name: String","+price: Decimal"]} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" style={{animationDelay:"2s"}}/>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 380">
                <path d="M180 80 Q 400 80 580 100" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent" strokeDasharray="4 4"/>
                <text x="380" y="70" className="fill-muted-foreground text-xs">1 — *</text>
                <path d="M400 280 Q 300 220 180 160" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent"/>
                <path d="M400 280 Q 500 220 600 180" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingClass({ title, attrs, className, style }: { title: string; attrs: string[]; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`w-44 rounded-lg border-2 border-accent/40 bg-card shadow-xl ${className}`} style={style}>
      <div className="border-b border-border px-3 py-2 text-center font-bold text-sm">{title}</div>
      <div className="px-3 py-2 font-mono text-[10px] space-y-0.5">{attrs.map(a => <div key={a} className="text-muted-foreground">{a}</div>)}</div>
    </div>
  );
}

function Logos() {
  const { lang } = useLang(); const t = STR[lang];
  return (
    <section className="border-y border-border bg-card/30 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">{t.trustedBy}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
          {["ACME Corp","Northwind","Globex","Initech","Umbrella","Hooli","Pied Piper"].map(n => (
            <div key={n} className="text-sm font-bold tracking-widest">{n.toUpperCase()}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { lang } = useLang(); const t = STR[lang];
  const icons = [Layers, GitBranch, Database, Zap, Shield, Code2];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold">{t.featuresH2}</h2>
        <p className="mt-3 text-muted-foreground">{t.featuresSub}</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {t.features.map((it, i) => {
          const Icon = icons[i];
          return (
            <div key={it.title} className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/50 animate-fade-in" style={{ animationDelay: `${i*60}ms` }}>
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold">{it.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Showcase() {
  const { lang } = useLang(); const t = STR[lang];
  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-accent">{t.showcaseTag}</div>
          <h2 className="mt-3 text-4xl font-bold">{t.showcaseH2}</h2>
          <p className="mt-4 text-muted-foreground">{t.showcaseDesc}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {t.showcasePoints.map(p => (
              <li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 text-success"/> {p}</li>
            ))}
          </ul>
          <Link href="/sql-import" className="mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-card/80">
            {t.showcaseCta} <ArrowRight className="h-4 w-4"/>
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-2 bg-accent/20 blur-2xl rounded-2xl"/>
          <pre className="relative rounded-xl border border-border bg-primary p-6 text-xs font-mono text-primary-foreground overflow-x-auto shadow-2xl">
{`CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255)
);

CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total DECIMAL(10,2),
  status VARCHAR(50)
);`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { lang } = useLang(); const t = STR[lang];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-2xl font-bold">{t.statsTitle}</h2>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {t.stats.map(s => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="text-4xl font-black gradient-text">{s.v}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingTeaser() {
  const { lang } = useLang(); const t = STR[lang];
  return (
    <section className="border-t border-border bg-card/30 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold">{t.pricingH2}</h2>
        <p className="mt-3 text-muted-foreground">{t.pricingSub}</p>
        <Link href="/pricing" className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90">
          {t.seePricing} <ArrowRight className="h-4 w-4"/>
        </Link>
      </div>
    </section>
  );
}

function CTA() {
  const { lang } = useLang(); const t = STR[lang];
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2 className="text-4xl font-black">{t.ctaH2}</h2>
      <p className="mt-3 text-muted-foreground">{t.ctaSub}</p>
      <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 animate-pulse-glow">
        {t.ctaBtn} <ArrowRight className="h-4 w-4"/>
      </Link>
    </section>
  );
}
