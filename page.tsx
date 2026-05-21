"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AuthGuard } from "@/components/AuthGuard";
import { SiteNav } from "@/components/SiteNav";
import { loadProjects, getProject, type Project } from "@/lib/projects";
import { generateSQL } from "@/lib/uml";
import { Copy, Download, Database, Server, Check, FileCode2 } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    yours: "Vos diagrammes",
    none: "Aucun diagramme.", createOne: "Créez-en un",
    classes: (n: number) => `${n} classes`,
    ready: "Prêt",
    settings: "Paramètres d'export",
    dialect: "Dialecte",
    options: "Options",
    drop: "DROP TABLE IF EXISTS",
    includeComments: "Inclure les commentaires",
    copy: "Copier le SQL", copied: "Copié !",
    download: "Télécharger .sql",
    nothing: "-- Aucun diagramme sélectionné",
  },
  en: {
    yours: "Your diagrams",
    none: "No diagrams.", createOne: "Create one",
    classes: (n: number) => `${n} classes`,
    ready: "Ready",
    settings: "Export settings",
    dialect: "Dialect",
    options: "Options",
    drop: "DROP TABLE IF EXISTS",
    includeComments: "Include comments",
    copy: "Copy SQL", copied: "Copied!",
    download: "Download .sql",
    nothing: "-- No diagram selected",
  },
};

export default function ExportPage() { return <AuthGuard><Inner/></AuthGuard>; }

function Inner() {
  const { lang } = useLang(); const t = STR[lang];
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [dialect, setDialect] = useState<"postgres"|"mysql">("postgres");
  const [dropIfExists, setDrop] = useState(false);
  const [comments, setComments] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ps = loadProjects();
    setProjects(ps);
    if (ps.length) setSelectedId(ps[0].id);
  }, []);

  const project = useMemo(() => selectedId ? getProject(selectedId) : null, [selectedId]);
  const sql = useMemo(() => project ? generateSQL(project.model, { dialect, dropIfExists, comments }) : t.nothing, [project, dialect, dropIfExists, comments, t.nothing]);

  function copy() { navigator.clipboard.writeText(sql); setCopied(true); setTimeout(() => setCopied(false), 1500); }
  function download() {
    const blob = new Blob([sql], { type: "text/sql" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${project?.name || "schema"}.sql`; a.click();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav/>
      <div className="grid flex-1 grid-cols-[260px_1fr_320px] overflow-hidden">
        <aside className="border-r border-border bg-card p-5 overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.yours}</div>
          <ul className="mt-3 space-y-1.5">
            {projects.length === 0 && <li className="text-xs text-muted-foreground">{t.none} <Link href="/editor" className="text-accent">{t.createOne}</Link>.</li>}
            {projects.map(p => (
              <li key={p.id}>
                <button onClick={()=>setSelectedId(p.id)} className={`w-full text-left rounded-md px-3 py-2 text-sm transition ${selectedId === p.id ? "bg-accent text-accent-foreground" : "hover:bg-surface"}`}>
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-[10px] opacity-70">{t.classes(p.model.classes.length)}</div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
            <div className="flex items-center gap-2 text-sm font-mono"><FileCode2 className="h-4 w-4 text-muted-foreground"/>{project?.name || "schema"}.sql</div>
            <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"/> {t.ready}
            </span>
          </div>
          <pre className="flex-1 overflow-auto bg-primary p-8 font-mono text-sm text-primary-foreground whitespace-pre">{sql}</pre>
        </main>

        <aside className="border-l border-border bg-card p-5 overflow-y-auto">
          <h3 className="text-sm font-bold">{t.settings}</h3>
          <div className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.dialect}</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <DialectBtn active={dialect==="postgres"} onClick={()=>setDialect("postgres")} icon={<Database className="h-5 w-5"/>}>PostgreSQL</DialectBtn>
            <DialectBtn active={dialect==="mysql"} onClick={()=>setDialect("mysql")} icon={<Server className="h-5 w-5"/>}>MySQL</DialectBtn>
          </div>
          <div className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.options}</div>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={dropIfExists} onChange={e=>setDrop(e.target.checked)} className="h-4 w-4"/> {t.drop}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={comments} onChange={e=>setComments(e.target.checked)} className="h-4 w-4"/> {t.includeComments}</label>
          </div>
          <div className="mt-6 space-y-2">
            <button onClick={copy} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-accent py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">
              {copied ? <><Check className="h-4 w-4"/> {t.copied}</> : <><Copy className="h-4 w-4"/> {t.copy}</>}
            </button>
            <button onClick={download} className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border py-3 text-sm font-medium hover:bg-surface"><Download className="h-4 w-4"/> {t.download}</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
function DialectBtn({ active, onClick, icon, children }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 rounded-md border-2 py-3 text-xs font-medium transition ${active ? "border-accent bg-accent/10" : "border-border bg-background hover:bg-surface"}`}>
      {icon}{children}
    </button>
  );
}
