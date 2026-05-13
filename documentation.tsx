import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Search, Plus, Compass, Rocket, Square, ArrowLeftRight, Network, FileImage, Code2, Terminal, Globe, Zap, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/documentation")({
  component: Documentation,
  head: () => ({ meta: [{ title: "Documentation — UML Forge" }] }),
});

const tabs = [
  { label: "Éditeur", to: "/editeur" },
  { label: "Documentation", to: "/documentation", active: true },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Communauté", to: "/communaute" },
];

const sections = [
  { title: "Introduction", items: [
    { icon: <Compass className="h-4 w-4" />, label: "Présentation", active: true },
    { icon: <Rocket className="h-4 w-4" />, label: "Démarrage Rapide" },
  ]},
  { title: "Éléments UML", items: [
    { icon: <Square className="h-4 w-4" />, label: "Diagrammes de Classes" },
    { icon: <ArrowLeftRight className="h-4 w-4" />, label: "Diagrammes de Séquence" },
    { icon: <Network className="h-4 w-4" />, label: "Relations" },
  ]},
  { title: "Exportation", items: [
    { icon: <FileImage className="h-4 w-4" />, label: "SVG & PNG" },
    { icon: <Code2 className="h-4 w-4" />, label: "Génération de Code" },
  ]},
  { title: "Référence API", items: [
    { icon: <Terminal className="h-4 w-4" />, label: "Outil CLI" },
    { icon: <Globe className="h-4 w-4" />, label: "API REST" },
  ]},
];

function Documentation() {
  return (
    <div className="min-h-screen bg-background" style={{ backgroundImage: "radial-gradient(circle, var(--color-border) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Logo label="" />
          <nav className="flex items-center gap-8">
            {tabs.map(t => (
              <Link key={t.label} to={t.to} className={`text-sm ${t.active ? "border-b-2 border-accent pb-5 font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Rechercher..." className="w-64 rounded-md border border-border bg-surface py-2 pl-10 pr-3 text-sm outline-none" />
            </div>
            <Link to="/connexion" className="text-sm text-muted-foreground hover:text-foreground">Connexion</Link>
            <Link to="/inscription" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">S'inscrire</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-6 py-8">
        <aside className="w-64 shrink-0">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="font-bold">Documentation</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">V2.4.0 stable</div>
          </div>
          <nav className="mt-6 space-y-6">
            {sections.map(s => (
              <div key={s.title}>
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.title}</div>
                <ul className="space-y-1">
                  {s.items.map(it => (
                    <li key={it.label}>
                      <a href="#" className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${it.active ? "bg-accent/15 font-semibold text-accent" : "hover:bg-surface"}`}>
                        {it.icon} {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <button className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /> Nouveau Diagramme</button>
        </aside>

        <main className="flex-1 rounded-xl border border-border bg-card p-10 shadow-sm">
          <div className="text-sm text-muted-foreground">Docs &gt; <span className="text-accent">Présentation</span></div>
          <h1 className="mt-3 text-3xl font-bold">Introduction à UML Forge</h1>
          <p className="mt-4 text-muted-foreground">UML Forge est une plateforme de modélisation de haute précision conçue pour les architectes système et les ingénieurs logiciel. Nous privilégions l'exactitude structurelle aux éléments décoratifs, offrant un outil qui s'apparente à un environnement CAO professionnel pour la conception logicielle.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="font-bold">Intégrité Structurelle</h3>
              <p className="mt-2 text-sm text-muted-foreground">Chaque élément sur le canevas respecte une grille stricte de 4px. Maintenez un alignement parfait dans les architectures d'entreprise complexes grâce au magnétisme automatique et aux guides de précision.</p>
              <div className="mt-4 h-24 rounded bg-accent/10" style={{ backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
            </div>
            <div className="rounded-lg bg-primary p-6 text-primary-foreground">
              <Zap className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-bold">Haute Performance</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">Rendu de milliers de nœuds avec une fluidité de 60fps grâce à notre moteur de canevas accéléré par WebGL.</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Définition des Éléments de Classe</h2>
              <span className="rounded-md border border-border bg-surface px-2 py-1 text-xs">Exemple DSL</span>
            </div>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-primary p-5 font-mono text-xs text-primary-foreground">
{`class CompteUtilisateur {
  // Attributs
  - id: UUID
  - email: String
  + dernierAcces: DateTime

  // Méthodes
  + validerMotDePasse(pass: String): Boolean
  + miseAJourProfil(data: ProfileData)
}`}
            </pre>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold">Cartographie des Relations</h2>
              <p className="mt-3 text-sm text-muted-foreground">Visualisez l'héritage, la composition et l'agrégation complexes en un clic. Notre moteur de relations calcule automatiquement le chemin le plus court entre les nœuds pour éviter l'encombrement visuel.</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Connecteurs auto-adaptatifs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Support de la notation de multiplicité</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Personnalisation des flèches directionnelles</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface p-8">
              <div className="relative h-48">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-md border border-border bg-card px-4 py-2 text-xs font-mono">System</div>
                <div className="absolute bottom-0 left-0 rounded-md border border-border bg-card px-4 py-2 text-xs font-mono">Module</div>
                <div className="absolute bottom-0 right-0 rounded-md border border-border bg-card px-4 py-2 text-xs font-mono">Module</div>
                <svg className="absolute inset-0 h-full w-full">
                  <line x1="50%" y1="20%" x2="20%" y2="80%" stroke="currentColor" className="text-muted-foreground" />
                  <line x1="50%" y1="20%" x2="80%" y2="80%" stroke="currentColor" className="text-muted-foreground" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <a href="#" className="rounded-lg border border-border p-5 hover:bg-surface">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Précédent</div>
              <div className="mt-1 font-bold">Configuration du Projet</div>
            </a>
            <a href="#" className="rounded-lg border border-border p-5 text-right hover:bg-surface">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Suivant</div>
              <div className="mt-1 font-bold">Diagrammes de Classes</div>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
