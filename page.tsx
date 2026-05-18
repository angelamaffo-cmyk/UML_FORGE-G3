"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";
import { UmlEditor } from "@/components/UmlEditor";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getProject, newProject, saveProject, type Project } from "@/lib/projects";
import type { UmlModel } from "@/lib/uml";
import { useLang } from "@/lib/i18n";
import Link from "next/link";

const STR = {
  fr: { savedAt: (t: string) => `Enregistré ${t}`, importSql: "Importer SQL", dashboard: "Tableau de bord" },
  en: { savedAt: (t: string) => `Saved ${t}`, importSql: "Import SQL", dashboard: "Dashboard" },
};

export default function EditorPage() {
  return <Suspense fallback={null}><AuthGuard><EditorPageInner /></AuthGuard></Suspense>;
}

function EditorPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { lang } = useLang(); const t = STR[lang];
  const id = params.get("id");
  const [project, setProject] = useState<Project | null>(null);
  const [saved, setSaved] = useState<string>("");

  useEffect(() => {
    if (id) {
      const p = getProject(id);
      if (p) setProject(p); else router.replace("/dashboard");
    } else {
      const p = newProject();
      saveProject(p); setProject(p);
      router.replace(`/editor?id=${p.id}`);
    }
  }, [id, router]);

  if (!project) return null;

  const onSave = (m: UmlModel) => {
    const next = { ...project, model: m, updatedAt: Date.now() };
    saveProject(next); setProject(next);
    setSaved(t.savedAt(new Date().toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-US")));
    setTimeout(() => setSaved(""), 2000);
  };
  const onChange = (m: UmlModel) => {
    const next = { ...project, model: m, updatedAt: Date.now() };
    saveProject(next);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-16 flex items-center justify-between border-b border-border px-4 bg-card">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-sm text-muted-foreground">/</span>
          <input
            value={project.name}
            onChange={e => setProject({ ...project, name: e.target.value })}
            onBlur={() => saveProject(project)}
            className="bg-transparent text-sm font-medium outline-none border-b border-transparent hover:border-border focus:border-accent px-1"
          />
          {saved && <span className="text-xs text-success animate-fade-in">● {saved}</span>}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sql-import" className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-surface">{t.importSql}</Link>
          <Link href="/dashboard" className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-surface">{t.dashboard}</Link>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>
      <UmlEditor initial={project.model} onChange={onChange} onSave={onSave} />
    </div>
  );
}
