import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight, Mail, Lock, Facebook } from "lucide-react";

export const Route = createFileRoute("/connexion")({
  component: Connexion,
  head: () => ({ meta: [{ title: "Connexion — UML Forge" }] }),
});

function Connexion() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left */}
      <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <Logo />
        <div>
          <h1 className="text-4xl font-bold leading-tight">L'ingénierie logicielle avec une précision chirurgicale.</h1>
          <p className="mt-4 max-w-md text-primary-foreground/70">Concevez des architectures complexes avec notre moteur de rendu haute performance. Une interface pensée par des ingénieurs, pour des ingénieurs.</p>
          <div className="mt-10 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-6">
            <div className="flex items-center gap-4">
              <div className="h-24 w-32 rounded bg-primary-foreground/10" />
              <ArrowRight className="h-4 w-4 text-accent" />
              <div className="h-24 w-32 rounded bg-primary-foreground/10" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-12 w-16 rounded bg-primary-foreground/10" />
              <div className="h-12 w-16 rounded bg-primary-foreground/10" />
            </div>
          </div>
        </div>
        <div />
      </div>

      {/* Right */}
      <div className="flex flex-col justify-between bg-surface p-8 lg:p-12">
        <div className="lg:hidden"><Logo /></div>
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-3xl font-bold">Bienvenue</h2>
          <p className="mt-2 text-sm text-muted-foreground">Connectez-vous à votre espace de travail professionnel.</p>

          <form className="mt-8 space-y-5">
            <Field label="Adresse email" icon={<Mail className="h-4 w-4" />} type="email" placeholder="nom@entreprise.com" />
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mot de passe</label>
                <Link to="/mot-de-passe-oublie" className="text-xs font-medium text-accent hover:underline">Mot de passe oublié ?</Link>
              </div>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="password" placeholder="••••••••" className="w-full rounded-md border border-border bg-card py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold tracking-widest text-primary-foreground hover:opacity-90">
              SE CONNECTER <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> Ou continuer avec <div className="h-px flex-1 bg-border" />
          </div>

          <Link to="/connexion-facebook" className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card py-3 text-sm font-medium hover:bg-surface">
            <Facebook className="h-4 w-4 text-[#1877F2]" /> Facebook
          </Link>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Pas encore de compte ? <Link to="/inscription" className="font-medium text-accent hover:underline">S'inscrire gratuitement</Link>
          </p>
        </div>
        <div className="flex justify-end gap-6 text-xs uppercase tracking-wider text-muted-foreground">
          <a href="#">Sécurité</a><a href="#">Confidentialité</a><a href="#">Conditions</a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, type, placeholder }: { label: string; icon: React.ReactNode; type: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="relative mt-2">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
        <input type={type} placeholder={placeholder} className="w-full rounded-md border border-border bg-card py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
      </div>
    </div>
  );
}
