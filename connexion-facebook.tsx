import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Facebook, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/connexion-facebook")({
  component: FacebookConnect,
  head: () => ({ meta: [{ title: "Connexion à Facebook — UML Forge" }] }),
});

function FacebookConnect() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-md border border-border bg-background">
              <Logo label="" />
            </div>
            <div className="text-2xl tracking-widest text-muted-foreground">···</div>
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#1877F2]">
              <Facebook className="h-7 w-7 text-white" />
            </div>
          </div>

          <h1 className="mt-8 text-2xl font-bold">Connexion à Facebook…</h1>
          <p className="mt-3 text-sm text-muted-foreground">Veuillez patienter pendant que nous synchronisons vos informations en toute sécurité avec UML Forge.</p>

          <div className="my-8 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Établissement du pont sécurisé</p>

          <div className="mt-8 flex gap-3 rounded-md border border-border bg-muted/40 p-4 text-left text-sm">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <div className="font-semibold">Confidentialité des données</div>
              <p className="mt-1 text-muted-foreground">UML Forge demande uniquement l'accès à votre profil public et votre adresse e-mail. Nous ne publierons jamais sur Facebook sans votre accord.</p>
            </div>
          </div>

          <Link to="/connexion" className="mt-6 block w-full rounded-md border border-border py-3 text-sm font-semibold hover:bg-surface">Annuler</Link>
          <p className="mt-3 text-xs text-muted-foreground">C'est trop long ? <Link to="/connexion" className="font-medium text-accent hover:underline">Essayer une autre méthode</Link></p>
        </div>
      </main>

      <footer className="py-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
        <strong className="text-foreground">UML FORGE</strong> · Service d'Authentification Sécurisé
      </footer>
    </div>
  );
}
