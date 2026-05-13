import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight, Eye, Facebook } from "lucide-react";

export const Route = createFileRoute("/inscription")({
  component: Inscription,
  head: () => ({ meta: [{ title: "S'inscrire — UML Forge" }] }),
});

function Inscription() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-6">
            <Link to="/documentation" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link>
            <Link to="/connexion" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface">Connexion</Link>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-3xl font-bold">S'inscrire</h1>
          <p className="mt-2 text-sm text-muted-foreground">Rejoignez le standard professionnel de la modélisation de systèmes structurels.</p>

          <form className="mt-6 space-y-5">
            <Field label="Nom complet" placeholder="Franck Keudem" />
            <Field label="E-mail professionnel" placeholder="nom@entreprise.fr" type="email" />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mot de passe</label>
              <div className="relative mt-2">
                <input type="password" placeholder="••••••••" className="w-full rounded-md border border-border bg-background py-3 pl-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-accent" />
                <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Min. 12 caract., 1 spécial, 1 chiffre</p>
            </div>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Initialiser l'Espace de Travail <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> Intégrations <div className="h-px flex-1 bg-border" />
          </div>

          <Link to="/connexion-facebook" className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background py-3 text-sm font-medium hover:bg-surface">
            <Facebook className="h-4 w-4 text-[#1877F2]" /> S'inscrire avec Facebook
          </Link>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Vous avez déjà une instance active ? <Link to="/connexion" className="font-medium text-accent hover:underline">Se connecter</Link>
          </p>
        </div>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-muted-foreground">
          <div><strong className="text-foreground">UML Forge</strong> · © 2026 UML Forge. Conçu pour la précision structurelle.</div>
          <div className="flex gap-4"><a href="#">Confidentialité</a><a href="#">Conditions</a><a href="#">Documentation API</a><a href="#">État du système</a></div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input type={type} placeholder={placeholder} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
    </div>
  );
}
