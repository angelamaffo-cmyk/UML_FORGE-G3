"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Facebook, ShieldCheck, Check, Loader2, Lock, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    steps: ["Établissement du pont sécurisé","Vérification de votre identité","Récupération des données de profil","Finalisation de la session"],
    titleProgress: "Connexion à Facebook…",
    titleDone: "Connecté !",
    subProgress: "Veuillez patienter pendant la synchronisation sécurisée de vos informations.",
    subDone: "Redirection vers votre tableau de bord.",
    complete: "complété",
    cancel: "Annuler",
    privacyTitle: "Confidentialité des données",
    privacy: "UML Forge demande uniquement l'accès à votre profil public et à votre e-mail. Nous ne publions jamais sur Facebook.",
  },
  en: {
    steps: ["Establishing secure bridge","Verifying your identity","Fetching profile data","Finalizing session"],
    titleProgress: "Connecting to Facebook…",
    titleDone: "Connected!",
    subProgress: "Please wait while we securely synchronize your information.",
    subDone: "Redirecting you to your dashboard.",
    complete: "complete",
    cancel: "Cancel",
    privacyTitle: "Data privacy",
    privacy: "UML Forge only requests access to your public profile and email. We never post to Facebook.",
  },
};

const ICONS = [Lock, ShieldCheck, User, Check];

export default function FacebookConnect() {
  const router = useRouter();
  const { loginWithFacebook } = useAuth();
  const { lang } = useLang(); const t = STR[lang];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const itv = setInterval(() => {
      i++;
      if (i >= t.steps.length) {
        clearInterval(itv);
        setDone(true);
        loginWithFacebook().then(() => setTimeout(() => router.push("/dashboard"), 900));
        return;
      }
      setStep(i);
    }, 900);
    return () => clearInterval(itv);
  }, [loginWithFacebook, router, t.steps.length]);

  const progress = done ? 100 : ((step + 1) / t.steps.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-surface relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-[#1877F2]/20 blur-3xl animate-blob"/>
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-accent/20 blur-3xl animate-blob" style={{animationDelay:"3s"}}/>

      <main className="relative flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-2xl animate-scale-in">
          <div className="flex items-center justify-center gap-3">
            <div className={`flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-background transition-transform ${done ? "scale-110" : ""}`}>
              <Logo label="" />
            </div>
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <span key={i} className="h-2 w-2 rounded-full bg-accent" style={{ animation: `pulse 1s ease-in-out ${i*0.2}s infinite` }}/>
              ))}
            </div>
            <div className={`relative flex h-16 w-16 items-center justify-center rounded-xl bg-[#1877F2] transition-all ${done ? "scale-110" : ""}`}>
              {!done && <div className="absolute inset-0 rounded-xl bg-[#1877F2] animate-ping opacity-30"/>}
              <Facebook className="h-8 w-8 text-white relative"/>
            </div>
          </div>

          <h1 className="mt-8 text-2xl font-bold">{done ? t.titleDone : t.titleProgress}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{done ? t.subDone : t.subProgress}</p>

          <div className="mt-6">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-gradient-to-r from-[#1877F2] to-accent transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">{Math.round(progress)}% {t.complete}</div>
          </div>

          <div className="mt-6 space-y-2 text-left">
            {t.steps.map((label, i) => {
              const Icon = ICONS[i];
              const isDone = done || i < step;
              const isActive = !done && i === step;
              return (
                <div key={label} className={`flex items-center gap-3 rounded-md border p-2.5 transition-all ${isActive ? "border-accent bg-accent/5 animate-fade-in" : isDone ? "border-success/30 bg-success/5" : "border-border"}`}>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full ${isDone ? "bg-success text-white" : isActive ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {isDone ? <Check className="h-3.5 w-3.5"/> : isActive ? <Loader2 className="h-3.5 w-3.5 animate-spin"/> : <Icon className="h-3.5 w-3.5"/>}
                  </div>
                  <div className={`text-xs ${isActive ? "font-semibold" : "text-muted-foreground"}`}>{label}</div>
                </div>
              );
            })}
          </div>

          {!done && (
            <Link href="/login" className="mt-6 block w-full rounded-md border border-border py-3 text-sm font-semibold hover:bg-surface transition">
              {t.cancel}
            </Link>
          )}

          <div className="mt-6 flex gap-3 rounded-md border border-border bg-muted/40 p-3 text-left text-xs">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success"/>
            <div>
              <div className="font-semibold">{t.privacyTitle}</div>
              <p className="mt-0.5 text-muted-foreground">{t.privacy}</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );
}
