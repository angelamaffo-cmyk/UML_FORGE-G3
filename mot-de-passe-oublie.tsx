import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight, ChevronLeft, Mail, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/mot-de-passe-oublie")({
  component: ForgotPassword,
  head: () => ({ meta: [{ title: "Mot de passe oublié — UML Forge" }] }),
});

function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/documentation" className="hover:text-foreground">Documentation</Link>
            <Link to="/communaute" className="hover:text-foreground">Communauté</Link>
            <Link to="/connexion" className="hover:text-foreground">Connexion</Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h1 className="text-2xl font-bold leading-tight">Mot de passe oublié ?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Saisissez l'adresse e-mail associée à votre compte UML Forge. Nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>

            <form className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Adresse e-mail professionnelle</label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" placeholder="ingenieur@entreprise.fr" className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Envoyer le lien <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="my-5 h-px bg-border" />
            <Link to="/connexion" className="flex items-center justify-center gap-1 text-sm font-medium text-accent hover:underline">
              <ChevronLeft className="h-4 w-4" /> Retour à la connexion
            </Link>
          </div>

          <div className="flex gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <div className="font-semibold text-foreground">Note de sécurité</div>
              Si un compte existe pour cet e-mail, vous recevrez un lien de réinitialisation d'ici quelques minutes. Vérifiez votre dossier indésirables.
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-muted-foreground">
          <div>© 2026 UML Forge. Conçu pour la précision structurelle.</div>
          <div className="flex gap-4"><a href="#">Confidentialité</a><a href="#">Conditions</a><a href="#">Documentation API</a><a href="#">État du service</a></div>
        </div>
      </footer>
    </div>
  );
}
