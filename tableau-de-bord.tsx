import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Bell, Settings, Search, Compass, Users, History, Cloud, Filter, Plus, Pencil, Trash2, MoreVertical } from "lucide-react";

export const Route = createFileRoute("/tableau-de-bord")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Tableau de bord — UML Forge" }] }),
});

const tabs = [
  { to: "/tableau-de-bord", label: "Mes projets" },
  { to: "/tableau-de-bord", label: "Tableau de bord", active: true },
  { to: "/documentation", label: "Documentation" },
  { to: "/export-sql", label: "Exportations" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Logo label="UML FORGE" />
          <nav className="flex items-center gap-8">
            {tabs.map(t => (
              <Link key={t.label} to={t.to} className={`text-sm ${t.active ? "border-b-2 border-accent pb-4 font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Rechercher..." className="w-72 rounded-md border border-border bg-surface py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <button className="rounded-md p-2 hover:bg-surface"><Bell className="h-4 w-4" /></button>
            <button className="rounded-md p-2 hover:bg-surface"><Settings className="h-4 w-4" /></button>
            <div className="h-9 w-9 rounded-full bg-muted" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="grid grid-cols-4 gap-4">
          <Stat icon={<Compass className="h-4 w-4" />} label="Projets Actifs" value="12" />
          <Stat icon={<Users className="h-4 w-4" />} label="Collaborateurs" value="04" />
          <Stat icon={<History className="h-4 w-4" />} label="Modifications (24h)" value="38" />
          <Stat icon={<Cloud className="h-4 w-4" />} label="Espace Cloud" value="24%" />
        </div>

        <div className="mt-10 grid grid-cols-[1fr_320px] gap-8">
          <div>
            <div className="flex items-end justify-between">
              <div className="border-l-4 border-accent pl-4">
                <h1 className="text-3xl font-bold">Maquettage Professionnel</h1>
                <p className="mt-1 text-sm text-muted-foreground">Architecture logicielle de précision structurelle.</p>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-surface"><Filter className="h-4 w-4" /> Filtrer</button>
                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /> Nouveau Projet</button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-5">
              <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></div>
                <div>
                  <div className="font-semibold">Nouvelle Architecture</div>
                  <div className="text-xs text-muted-foreground">Modèle vierge ou import</div>
                </div>
              </div>
              <ProjectCard title="API E-commerce" subtitle="Dernière modif : 2h" tags={["Diagramme classe", "Public"]} />
              <ProjectCard title="Flux Auth Utilisateur" subtitle="Dernière modif : Hier" tags={["Séquence", "Brouillon"]} />
              <ProjectCard title="Maillage Microservices" subtitle="Dernière modif : 1 semaine" tags={["Déploiement"]} />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 font-semibold"><span className="text-accent">⚡</span> Activité Récente</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <Activity icon={<Pencil className="h-3 w-3" />} text={<><strong>Jean D.</strong> a mis à jour <strong>E-commerce API</strong></>} time="Il y a 10 min" tone="accent" />
                <Activity icon={<Plus className="h-3 w-3" />} text={<><strong>Sophie M.</strong> a créé <strong>Schema V3</strong></>} time="Il y a 1 heure" tone="accent" />
                <Activity icon={<Trash2 className="h-3 w-3" />} text={<><strong>Marc L.</strong> a archivé <strong>Old Legacy</strong></>} time="Hier, 16:45" tone="destructive" />
              </ul>
              <button className="mt-4 w-full rounded-md border border-border py-2 text-xs font-semibold uppercase tracking-wider hover:bg-surface">Voir tout le log</button>
            </div>

            <div className="rounded-xl bg-primary p-6 text-primary-foreground">
              <div className="text-sm">Stockage Enterprise</div>
              <div className="mt-2 text-4xl font-bold">4.8 GB</div>
              <div className="mt-1 text-sm text-primary-foreground/70">Utilisé sur 20 GB disponibles</div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary-foreground/15">
                <div className="h-full w-1/4 bg-accent" />
              </div>
              <button className="mt-4 rounded-md bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-primary-foreground/15">Optimiser l'espace</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">{icon}</div>
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, subtitle, tags }: { title: string; subtitle: string; tags: string[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-video bg-surface p-6">
        <div className="flex h-full items-center justify-center gap-3">
          <div className="h-16 w-24 rounded border border-border bg-card" />
          <div className="h-16 w-24 rounded border border-border bg-card" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{subtitle}</div>
          </div>
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(t => <span key={t} className="rounded-md bg-accent/10 px-2 py-1 text-xs uppercase tracking-wider text-accent">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Activity({ icon, text, time, tone }: { icon: React.ReactNode; text: React.ReactNode; time: string; tone: "accent" | "destructive" }) {
  return (
    <li className="flex gap-3">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${tone === "accent" ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`}>{icon}</div>
      <div>
        <div>{text}</div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
    </li>
  );
}
