import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Bell, Settings, User2, Database, Server, FileText, Copy, Download, RefreshCcw, CheckCircle2, Link as LinkIcon } from "lucide-react";

export const Route = createFileRoute("/export-sql")({
  component: ExportSQL,
  head: () => ({ meta: [{ title: "Export SQL — UML Forge" }] }),
});

const tabs = [
  { label: "Tableau de bord", to: "/tableau-de-bord" },
  { label: "Projets", to: "/editeur" },
  { label: "Documentation", to: "/documentation" },
  { label: "Exportation", to: "/export-sql", active: true },
];

function ExportSQL() {
  return (
    <div className="flex h-screen flex-col bg-surface">
      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          <Logo label="" />
          <nav className="flex items-center gap-8">
            {tabs.map(t => (
              <Link key={t.label} to={t.to} className={`text-sm ${t.active ? "border-b-2 border-accent pb-5 font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <Bell className="h-4 w-4 text-muted-foreground" />
            <div className="h-9 w-9 rounded-full bg-muted" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <aside className="w-72 border-r border-border bg-background p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Espace de travail</div>
          <div className="mt-1 text-sm text-muted-foreground">Classes Détectées (3)</div>

          <ul className="mt-6 space-y-2">
            {[{label: "User", active: true, icon: <User2 className="h-4 w-4" />}, {label: "Order", icon: <Database className="h-4 w-4" />}, {label: "Product", icon: <Database className="h-4 w-4" />}].map(i => (
              <li key={i.label}>
                <button className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm ${i.active ? "bg-primary text-primary-foreground" : "hover:bg-surface"}`}>
                  {i.icon} {i.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-xs font-bold uppercase tracking-wider text-muted-foreground">Relations</div>
          <div className="mt-3 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground">
            <LinkIcon className="h-4 w-4 text-accent" /> User 1 — * Order
          </div>

          <button className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card py-3 text-xs font-semibold uppercase tracking-wider hover:bg-surface" style={{ marginTop: "auto" }}>
            <RefreshCcw className="h-4 w-4" /> Ré-analyser le modèle
          </button>
        </aside>

        {/* Code viewer */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-background px-6 py-3">
            <div className="flex items-center gap-2 text-sm font-mono">
              <FileText className="h-4 w-4 text-muted-foreground" /> schema_export.sql
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Syntaxe prête
            </span>
          </div>
          <pre className="flex-1 overflow-auto bg-primary p-8 font-mono text-sm text-primary-foreground">
{`-- SQL Généré par UML Forge
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "orders" (
    "id" UUID PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"("id"),
    "total_amount" DECIMAL(10, 2),
    "status" VARCHAR(50)
);`}
          </pre>
          <footer className="flex items-center justify-between border-t border-border bg-background px-6 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Système en ligne</div>
            <div>UTF-8 | Conforme SQL:2016</div>
          </footer>
        </main>

        {/* Settings */}
        <aside className="w-80 overflow-y-auto border-l border-border bg-background p-6">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-accent" />
            <h3 className="text-lg font-bold">Paramètres d'exportation</h3>
          </div>

          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Base de données cible</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 rounded-md border-2 border-accent bg-accent/10 py-4 text-sm font-medium">
                <Database className="h-5 w-5" /> PostgreSQL
              </button>
              <button className="flex flex-col items-center gap-2 rounded-md border border-border bg-card py-4 text-sm font-medium hover:bg-surface">
                <Server className="h-5 w-5" /> MySQL
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Convention de nommage</div>
            <select className="mt-3 w-full rounded-md border border-border bg-surface px-3 py-3 text-sm">
              <option>snake_case (Défaut)</option>
              <option>camelCase</option>
              <option>PascalCase</option>
            </select>
          </div>

          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Options de génération</div>
            <div className="mt-3 space-y-3 text-sm">
              <Check label="Inclure les clés étrangères" defaultChecked />
              <Check label="Générer les commentaires" defaultChecked />
              <Check label="DROP TABLE IF EXISTS" />
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Copy className="h-4 w-4" /> Copier dans le presse-papier
            </button>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card py-3 text-sm font-medium hover:bg-surface">
              <Download className="h-4 w-4" /> Télécharger .sql
            </button>
          </div>

          <div className="mt-8 rounded-lg bg-primary p-6 text-center text-primary-foreground">
            <CheckCircle2 className="mx-auto h-8 w-8 text-accent" />
            <div className="mt-2 text-sm font-semibold uppercase tracking-widest">Prêt pour production</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Check({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3">
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 rounded border-border accent-accent" />
      {label}
    </label>
  );
}
