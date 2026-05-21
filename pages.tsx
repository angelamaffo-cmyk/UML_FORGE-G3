"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";
import { SiteNav } from "@/components/SiteNav";
import { parseSQL } from "@/lib/uml";
import { saveProject, newProject } from "@/lib/projects";
import { Database, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";

const SAMPLE = `CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "name" VARCHAR(255)
);

CREATE TABLE "orders" (
  "id" UUID PRIMARY KEY,
  "user_id" INTEGER REFERENCES "users"("id"),
  "total" DECIMAL(10,2),
  "status" VARCHAR(50)
);

CREATE TABLE "order_items" (
  "id" SERIAL PRIMARY KEY,
  "order_id" UUID REFERENCES "orders"("id"),
  "product_name" VARCHAR(255),
  "quantity" INTEGER NOT NULL
);`;

const STR = {
  fr: {
    h1: "Importer depuis SQL",
    sub: "Collez un script CREATE TABLE et nous ferons l'ingénierie inverse du diagramme.",
    loadSample: "Charger l'exemple",
    placeholder: `-- Collez votre script CREATE TABLE ici\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255)\n);`,
    nameLabel: "Nom du diagramme",
    defaultName: "Diagramme importé",
    noStatements: "Aucune instruction CREATE TABLE détectée.",
    nothing: "Rien à importer.",
    ready: "Prêt à importer",
    tables: (n: number) => `${n} classe${n !== 1 ? "s" : ""} détectée${n !== 1 ? "s" : ""}`,
    rels: (n: number) => `${n} relation${n !== 1 ? "s" : ""} déduite${n !== 1 ? "s" : ""} des FK`,
    analyze: "Analyser",
    importBtn: "Importer dans l'éditeur",
    supported: "Syntaxe prise en charge",
    syntax: [
      "CREATE TABLE avec PK / UNIQUE / NOT NULL",
      "FOREIGN KEY en ligne et autonomes",
      "Dialectes PostgreSQL & MySQL",
    ],
  },
  en: {
    h1: "Import from SQL",
    sub: "Paste a CREATE TABLE script and we'll reverse-engineer the diagram.",
    loadSample: "Load sample",
    placeholder: `-- Paste your CREATE TABLE script here\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255)\n);`,
    nameLabel: "Diagram name",
    defaultName: "Imported diagram",
    noStatements: "No CREATE TABLE statements detected.",
    nothing: "Nothing to import.",
    ready: "Ready to import",
    tables: (n: number) => `${n} class${n !== 1 ? "es" : ""} detected`,
    rels: (n: number) => `${n} relation${n !== 1 ? "s" : ""} inferred from FK`,
    analyze: "Analyze",
    importBtn: "Import to editor",
    supported: "Supported syntax",
    syntax: [
      "CREATE TABLE with PK / UNIQUE / NOT NULL",
      "Inline & standalone FOREIGN KEY",
      "PostgreSQL & MySQL dialects",
    ],
  },
};

export default function SqlImport() { return <AuthGuard><Inner/></AuthGuard>; }

function Inner() {
  const router = useRouter();
  const { lang } = useLang(); const t = STR[lang];
  const [sql, setSql] = useState("");
  const [name, setName] = useState(t.defaultName);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ tables: number; rels: number } | null>(null);

  function analyze() {
    try {
      const m = parseSQL(sql);
      if (m.classes.length === 0) { setError(t.noStatements); setPreview(null); return; }
      setPreview({ tables: m.classes.length, rels: m.relations.length });
      setError("");
    } catch(e:any) { setError(e.message); }
  }
  function importIt() {
    try {
      const m = parseSQL(sql);
      if (m.classes.length === 0) { setError(t.nothing); return; }
      const p = newProject(name); p.model = m; saveProject(p);
      router.push(`/editor?id=${p.id}`);
    } catch(e:any) { setError(e.message); }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav/>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent"><Database className="h-6 w-6"/></div>
          <div>
            <h1 className="text-3xl font-bold">{t.h1}</h1>
            <p className="text-sm text-muted-foreground">{t.sub}</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-surface px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">schema.sql</span>
              <button onClick={() => setSql(SAMPLE)} className="text-xs text-accent hover:underline">{t.loadSample}</button>
            </div>
            <textarea
              value={sql} onChange={e => { setSql(e.target.value); setPreview(null); setError(""); }}
              placeholder={t.placeholder}
              spellCheck={false}
              className="w-full min-h-96 bg-primary text-primary-foreground font-mono text-sm p-4 outline-none resize-y"
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.nameLabel}</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"/>
            </div>

            {error && <div className="flex gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0"/>{error}</div>}

            {preview && (
              <div className="rounded-xl border border-success/30 bg-success/5 p-5 animate-fade-in">
                <Sparkles className="h-5 w-5 text-success mb-2"/>
                <div className="font-semibold text-sm">{t.ready}</div>
                <ul className="mt-2 text-xs space-y-1 text-muted-foreground">
                  <li>• {t.tables(preview.tables)}</li>
                  <li>• {t.rels(preview.rels)}</li>
                </ul>
              </div>
            )}

            <button onClick={analyze} disabled={!sql.trim()} className="w-full rounded-md border border-border bg-card py-2.5 text-sm font-medium hover:bg-surface disabled:opacity-40">{t.analyze}</button>
            <button onClick={importIt} disabled={!sql.trim()} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-accent py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-40 transition">
              {t.importBtn} <ArrowRight className="h-4 w-4"/>
            </button>

            <div className="rounded-md border border-border bg-surface p-3 text-xs text-muted-foreground">
              <div className="font-semibold text-foreground mb-1">{t.supported}</div>
              <ul className="space-y-0.5 list-disc list-inside">
                {t.syntax.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
