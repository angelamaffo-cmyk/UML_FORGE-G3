"use client";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    back: "Retour à la connexion",
    h1: "Réinitialiser le mot de passe",
    sub: "Saisissez votre e-mail et nous vous enverrons un lien de réinitialisation.",
    placeholder: "vous@entreprise.com",
    send: "Envoyer le lien",
    sent: (e: string) => <>Nous avons envoyé un lien de réinitialisation à <strong>{e}</strong>. Vérifiez votre boîte de réception.</>,
    open: "Ouvrir la page de réinitialisation →",
  },
  en: {
    back: "Back to sign in",
    h1: "Reset password",
    sub: "Enter your email and we'll send you a reset link.",
    placeholder: "you@company.com",
    send: "Send reset link",
    sent: (e: string) => <>We sent a reset link to <strong>{e}</strong>. Check your inbox.</>,
    open: "Open reset page →",
  },
};

export default function ForgotPassword() {
  const { lang } = useLang(); const t = STR[lang];
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="absolute top-6 left-6"><Logo/></div>
      <div className="absolute top-6 right-6 flex gap-2"><LanguageToggle/><ThemeToggle/></div>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl animate-scale-in">
        <Link href="/login" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3 w-3"/>{t.back}</Link>
        <h1 className="mt-4 text-2xl font-bold">{t.h1}</h1>
        {sent ? (
          <div className="mt-6 rounded-md border border-success/30 bg-success/10 p-4 text-sm animate-fade-in">
            <Check className="h-5 w-5 text-success mb-2"/>
            {t.sent(email)}
            <Link href="/reset-password" className="mt-3 block text-accent hover:underline text-xs">{t.open}</Link>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">{t.sub}</p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.placeholder} className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent"/>
            </div>
            <button className="w-full rounded-md bg-accent py-3 text-sm font-semibold text-accent-foreground hover:opacity-90">{t.send}</button>
          </form>
        )}
      </div>
    </div>
  );
}
