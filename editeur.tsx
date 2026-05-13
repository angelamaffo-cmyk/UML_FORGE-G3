import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Search, Settings, Bell, MousePointer2, Square, FolderOpen, ArrowRight, MessageSquare, Save, Plus, MoreVertical, Layers } from "lucide-react";

export const Route = createFileRoute("/editeur")({
  component: Editor,
  head: () => ({ meta: [{ title: "Éditeur UML — UML Forge" }] }),
});

const tabs = [
  { label: "Tableau de bord", to: "/tableau-de-bord" },
  { label: "Projets", to: "/editeur", active: true },
  { label: "Documentation", to: "/documentation" },
  { label: "Exporter", to: "/export-sql" },
];

const tools = [
  { icon: <MousePointer2 className="h-4 w-4" />, label: "Sélectionneur" },
  { icon: <Square className="h-4 w-4" />, label: "Classe", active: true },
  { icon: <Layers className="h-4 w-4" />, label: "Interface" },
  { icon: <FolderOpen className="h-4 w-4" />, label: "Paquetage" },
  { icon: <ArrowRight className="h-4 w-4" />, label: "Relation" },
  { icon: <MessageSquare className="h-4 w-4" />, label: "Commentaire" },
];

function Editor() {
  return (
    <div className="flex h-screen flex-col bg-surface">
      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          <Logo />
          <nav className="flex items-center gap-8">
            {tabs.map(t => (
              <Link key={t.label} to={t.to} className={`text-sm ${t.active ? "border-b-2 border-accent pb-5 font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Settings className="h-4 w-4 text-muted-foreground" />
            <Bell className="h-4 w-4 text-muted-foreground" />
            <div className="h-9 w-9 rounded-full bg-muted" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Tools sidebar */}
        <aside className="flex w-64 flex-col border-r border-border bg-background p-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">A</div>
              <div>
                <div className="font-semibold">Atelier</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Éléments UML</div>
              </div>
            </div>
          </div>
          <ul className="mt-4 space-y-1">
            {tools.map(t => (
              <li key={t.label}>
                <button className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm ${t.active ? "bg-primary text-primary-foreground" : "hover:bg-surface"}`}>
                  {t.icon} {t.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto rounded-lg bg-surface p-4 text-xs">
            <div className="uppercase tracking-wider text-muted-foreground">Utilisation</div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
              <div className="h-full w-2/3 bg-primary" />
            </div>
            <div className="mt-2 text-muted-foreground">14/20 objets utilisés</div>
          </div>
        </aside>

        {/* Canvas */}
        <main className="relative flex-1 overflow-auto bg-surface p-12">
          <div className="relative mx-auto h-full max-w-3xl">
            <UMLClass title="UserAccount" stereotype="«Entity»" attrs={["- id: UUID", "- email: String", "- passwordHash: String", "- isActive: Boolean"]} methods={["+ login(): Boolean", "+ resetPassword(): void", "+ updateProfile(): void"]} selected />
            <div className="mt-12 ml-auto w-80">
              <UMLClass title="SessionManager" attrs={["- activeSessions: List", "- maxIdleTime: Int"]} methods={["+ createSession(): void", "+ invalidateSession(): void"]} />
            </div>
          </div>
        </main>

        {/* Properties */}
        <aside className="w-80 overflow-y-auto border-l border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Propriétés</h3>
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-6 space-y-5 text-sm">
            <Prop label="Nom de la classe">
              <input defaultValue="UserAccount" className="w-full rounded-md border border-border bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-accent" />
            </Prop>
            <Prop label="Stéréotype">
              <div className="flex gap-2">
                <span className="rounded-md bg-accent/10 px-3 py-2 text-xs font-medium text-accent">«ENTITY»</span>
                <button className="flex h-9 w-9 items-center justify-center rounded-md border border-dashed border-border"><Plus className="h-4 w-4" /></button>
              </div>
            </Prop>
            <PropList label="Attributs (4)" items={["- id: UUID", "- email: String"]} />
            <PropList label="Méthodes (3)" items={["+ login(): Boolean"]} />
            <Prop label="Apparence">
              <div className="flex gap-2">
                <button className="h-10 w-10 rounded-md bg-primary ring-2 ring-accent ring-offset-2 ring-offset-background" />
                <button className="h-10 w-10 rounded-md bg-accent" />
                <button className="h-10 w-10 rounded-md bg-destructive" />
                <button className="h-10 w-10 rounded-md border border-border bg-card" />
              </div>
            </Prop>
          </div>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:opacity-90">
            <Save className="h-4 w-4" /> Sauvegarder les modifications
          </button>
        </aside>
      </div>

      <footer className="flex h-9 items-center justify-between border-t border-border bg-background px-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Synchronisé avec le cloud · 2 Classes, 1 Relation</div>
        <div>X: 104px Y: 320px · 100%</div>
      </footer>
    </div>
  );
}

function UMLClass({ title, stereotype, attrs, methods, selected }: { title: string; stereotype?: string; attrs: string[]; methods: string[]; selected?: boolean }) {
  return (
    <div className={`relative w-72 rounded-lg border bg-card shadow-sm ${selected ? "border-accent ring-2 ring-accent/30" : "border-border"}`}>
      {selected && [
        "-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"
      ].map(p => <div key={p} className={`absolute h-3 w-3 rounded-full border-2 border-accent bg-background ${p}`} />)}
      <div className="border-b border-border px-4 py-3 text-center">
        <div className="font-bold">{title}</div>
        {stereotype && <div className="text-xs italic text-muted-foreground">{stereotype}</div>}
      </div>
      <div className="space-y-1 border-b border-border px-4 py-3 font-mono text-xs">{attrs.map(a => <div key={a}>{a}</div>)}</div>
      <div className="space-y-1 px-4 py-3 font-mono text-xs">{methods.map(m => <div key={m} className="text-accent">{m}</div>)}</div>
    </div>
  );
}

function Prop({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function PropList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <button className="flex items-center gap-1 text-accent"><Plus className="h-3 w-3" /> Ajouter</button>
      </div>
      <div className="space-y-2">
        {items.map(i => <div key={i} className="rounded-md border border-border bg-card px-3 py-2 font-mono text-xs">{i}</div>)}
      </div>
    </div>
  );
}
