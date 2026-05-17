"use client";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { BookOpen, Zap, Database, MousePointer, GitBranch } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    tag: "Documentation",
    h1: "Démarrez en 5 minutes",
    sub: "Un tour rapide des concepts principaux de UML Forge.",
    sections: [
      { title: "1. Créer des classes",
        body: <>Cliquez sur <strong>Ajouter une classe</strong> dans la boîte à outils de l'éditeur pour déposer une nouvelle classe sur le canevas. Double-cliquez sur le nom de la classe dans le panneau de droite pour la renommer. Ajoutez attributs et méthodes via les boutons <em>+ Ajouter</em> en ligne.</> },
      { title: "2. Tracer des relations",
        body: <>Survolez une classe pour faire apparaître ses poignées de connexion. Glissez d'une poignée à une autre pour créer une association. Cliquez sur une arête pour changer son type (association, composition, agrégation, héritage) et définir les multiplicités (<code className="rounded bg-surface px-1.5 py-0.5">1</code>, <code className="rounded bg-surface px-1.5 py-0.5">0..1</code>, <code className="rounded bg-surface px-1.5 py-0.5">*</code>, <code className="rounded bg-surface px-1.5 py-0.5">1..*</code>).</> },
      { title: "3. Importer depuis SQL",
        body: <>Une base existante ? Collez votre script <code>CREATE TABLE</code> dans <strong>Import SQL</strong>. UML Forge détecte colonnes, clés primaires et étrangères pour générer un diagramme entièrement éditable.</> },
      { title: "4. Exporter en SQL",
        body: <>Depuis <strong>Export SQL</strong>, choisissez PostgreSQL ou MySQL, activez DROP / commentaires, puis copiez ou téléchargez. Les relations N-à-N produisent automatiquement des tables de jointure.</> },
      { title: "5. Raccourcis",
        body: (
          <ul className="list-disc list-inside space-y-1">
            <li><kbd className="rounded bg-surface px-2 py-0.5 text-xs border border-border">Espace</kbd> + glisser pour déplacer le canevas</li>
            <li><kbd className="rounded bg-surface px-2 py-0.5 text-xs border border-border">Molette</kbd> pour zoomer</li>
            <li><kbd className="rounded bg-surface px-2 py-0.5 text-xs border border-border">Suppr</kbd> pour supprimer la classe ou l'arête sélectionnée</li>
          </ul>
        ) },
    ],
  },
  en: {
    tag: "Documentation",
    h1: "Get started in 5 minutes",
    sub: "A quick tour of UML Forge's main concepts.",
    sections: [
      { title: "1. Creating classes",
        body: <>Click <strong>Add Class</strong> in the editor toolbox to drop a new class on the canvas. Double-click the class name in the right panel to rename it. Add attributes and methods with the inline <em>+ Add</em> buttons.</> },
      { title: "2. Drawing relations",
        body: <>Hover any class to reveal its connection handles. Drag from one handle to another to create an association. Click an edge to change its type (association, composition, aggregation, inheritance) and set multiplicities (<code className="rounded bg-surface px-1.5 py-0.5">1</code>, <code className="rounded bg-surface px-1.5 py-0.5">0..1</code>, <code className="rounded bg-surface px-1.5 py-0.5">*</code>, <code className="rounded bg-surface px-1.5 py-0.5">1..*</code>).</> },
      { title: "3. Importing from SQL",
        body: <>Have an existing database? Paste your <code>CREATE TABLE</code> script in <strong>Import SQL</strong>. UML Forge detects columns, primary keys and foreign keys to scaffold a fully editable diagram.</> },
      { title: "4. Exporting SQL",
        body: <>From <strong>Export SQL</strong>, pick PostgreSQL or MySQL, toggle DROP/comments, then copy or download. Many-to-many relations automatically produce join tables.</> },
      { title: "5. Shortcuts",
        body: (
          <ul className="list-disc list-inside space-y-1">
            <li><kbd className="rounded bg-surface px-2 py-0.5 text-xs border border-border">Space</kbd> + drag to pan the canvas</li>
            <li><kbd className="rounded bg-surface px-2 py-0.5 text-xs border border-border">Scroll</kbd> to zoom</li>
            <li><kbd className="rounded bg-surface px-2 py-0.5 text-xs border border-border">Del</kbd> to delete the selected class or edge</li>
          </ul>
        ) },
    ],
  },
};

export default function Docs() {
  const { lang } = useLang(); const t = STR[lang];
  const icons = [<MousePointer key="1"/>, <GitBranch key="2"/>, <Database key="3"/>, <Zap key="4"/>, <BookOpen key="5"/>];
  return (
    <div className="min-h-screen bg-background">
      <SiteNav/>
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-xs uppercase tracking-widest text-accent">{t.tag}</div>
        <h1 className="mt-2 text-4xl font-bold">{t.h1}</h1>
        <p className="mt-3 text-muted-foreground">{t.sub}</p>
        <div className="mt-12 space-y-10">
          {t.sections.map((s, i) => (
            <Section key={s.title} icon={icons[i]} title={s.title}>{s.body}</Section>
          ))}
        </div>
      </main>
      <SiteFooter/>
    </div>
  );
}
function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 hover:border-accent/40 transition">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="mt-4 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}
