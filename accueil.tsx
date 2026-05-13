import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ArrowRight, Wrench, Database, Users, Zap, ShieldCheck, Code2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "UML Forge — Ingénierie logicielle de précision" },
      { name: "description", content: "Concevez des architectures systèmes complexes avec un moteur UML haute performance." },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
              <ShieldCheck className="h-3 w-3" /> STANDARD D'INGÉNIERIE V2.4
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-foreground">
              L'ingénierie logicielle avec une <span className="text-accent">précision chirurgicale.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground">
              Concevez des architectures systèmes complexes avec un moteur UML haute performance. Générez du code propre, exportez des schémas SQL et collaborez en temps réel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inscription" className="inline-flex items-center gap-3 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Démarrer Gratuitement <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/editeur" className="rounded-md border border-border bg-card px-6 py-4 text-sm font-semibold hover:bg-surface">
                Voir la Démo Live
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[0,1,2].map(i => <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted" />)}
              </div>
              Rejoint par +50 000 architectes
            </div>
          </div>

          {/* UML preview */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="relative h-[380px]">
              <div className="absolute left-8 top-0 w-56 rounded-md border border-border bg-card shadow-sm">
                <div className="rounded-t-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">OrderProcessor</div>
                <div className="space-y-1 border-b border-border px-3 py-2 font-mono text-xs">
                  <div>- orders: List&lt;Order&gt;</div>
                  <div>- validator: IValidator</div>
                </div>
                <div className="space-y-1 px-3 py-2 font-mono text-xs">
                  <div className="text-accent">+ processOrder(): void</div>
                  <div className="text-accent">+ cancelOrder(): bool</div>
                </div>
              </div>
              <div className="absolute right-0 top-32 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs shadow-sm">
                <Code2 className="h-3 w-3 text-accent" /> Génération du schéma SQL...
              </div>
              <div className="absolute right-0 bottom-0 w-56 rounded-md border border-border bg-card shadow-sm">
                <div className="rounded-t-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">PaymentGateway</div>
                <div className="space-y-1 border-b border-border px-3 py-2 font-mono text-xs">
                  <div>- apiKey: String</div>
                </div>
                <div className="space-y-1 px-3 py-2 font-mono text-xs">
                  <div className="text-accent">+ authorize(): Token</div>
                </div>
              </div>
              <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
                <line x1="55%" y1="20%" x2="70%" y2="80%" stroke="currentColor" strokeDasharray="4" className="text-border" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Conçu pour la Complexité</h2>
            <p className="mt-3 text-muted-foreground">L'outil indispensable pour gérer les architectures systèmes les plus exigeantes.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Wrench className="h-5 w-5" />}
              title="Canevas Interactif Infini"
              text="Un plan de travail de précision avec magnétisme, mise en page automatique et inférence de relations."
              className="md:col-span-2"
            />
            <FeatureCard
              icon={<Database className="h-5 w-5" />}
              title="Auto-génération SQL"
              text="Modélisez visuellement et exportez instantanément du SQL prêt pour la production ou des schémas Prisma."
              dark
            />
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Multi-Architecte Sync"
              text="Édition collaborative en temps réel avec contrôle de version granulaire et commentaires contextuels."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Performance Sub-Milliseconde"
              text="Affichez des diagrammes de plus de 10 000 nœuds à 60 FPS. Optimisé avec WebGL pour une exploration fluide."
              className="md:col-span-2"
            />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8 text-xs uppercase tracking-wider text-muted-foreground">
            <span>Approuvé par les architectes de :</span>
            <div className="flex flex-wrap gap-8 font-mono">
              <span>NEXUS_SYSTEMS</span>
              <span>STRUCT_CORE</span>
              <span>QUANTUM_LOGIC</span>
              <span>FORGE_TECH</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">Prêt à bâtir des fondations solides ?</h2>
          <p className="mt-4 text-primary-foreground/70">Rejoignez la communauté d'ingénieurs qui façonnent les systèmes les plus résilients au monde.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/inscription" className="rounded-md bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground hover:opacity-90">Démarrer l'aventure gratuitement</Link>
            <Link to="/tarifs" className="rounded-md border border-primary-foreground/30 px-6 py-4 text-sm font-semibold hover:bg-primary-foreground/10">Demander une démo Enterprise</Link>
          </div>
          <p className="mt-6 text-xs italic text-primary-foreground/50">Aucune carte de crédit requise pour les projets open-source.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FeatureCard({ icon, title, text, dark, className = "" }: { icon: React.ReactNode; title: string; text: string; dark?: boolean; className?: string }) {
  return (
    <div className={`rounded-xl border p-6 ${dark ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"} ${className}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-md ${dark ? "bg-primary-foreground/10 text-accent" : "bg-accent/15 text-accent"}`}>
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className={`mt-2 text-sm ${dark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{text}</p>
    </div>
  );
}
