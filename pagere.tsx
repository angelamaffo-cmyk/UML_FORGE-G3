"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Lock, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    h1: "Définissez un nouveau mot de passe",
    p1: "Nouveau mot de passe", p2: "Confirmer le mot de passe",
    mismatch: "Les mots de passe ne correspondent pas",
    update: "Mettre à jour",
    done: "Mot de passe mis à jour",
    signin: "Se connecter maintenant",
  },
  en: {
    h1: "Set a new password",
    p1: "New password", p2: "Confirm password",
    mismatch: "Passwords don't match",
    update: "Update password",
    done: "Password updated",
    signin: "Sign in now",
  },
};

export default function ResetPassword() {
  const { lang } = useLang(); const t = STR[lang];
  const [p1, setP1] = useState(""); const [p2, setP2] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="absolute top-6 left-6"><Logo/></div>
      <div className="absolute top-6 right-6 flex gap-2"><LanguageToggle/><ThemeToggle/></div>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl animate-scale-in">
        <h1 className="text-2xl font-bold">{t.h1}</h1>
        {done ? (
          <div className="mt-6 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-success/15 flex items-center justify-center"><Check className="h-7 w-7 text-success"/></div>
            <div className="mt-4 font-semibold">{t.done}</div>
            <Link href="/login" className="mt-4 inline-flex items-center justify-center w-full rounded-md bg-accent py-3 text-sm font-semibold text-accent-foreground">{t.signin}</Link>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (p1 && p1 === p2) setDone(true); }} className="mt-6 space-y-4">
            <PwField value={p1} onChange={setP1} placeholder={t.p1}/>
            <PwField value={p2} onChange={setP2} placeholder={t.p2}/>
            {p1 && p2 && p1 !== p2 && <div className="text-xs text-destructive">{t.mismatch}</div>}
            <button className="w-full rounded-md bg-accent py-3 text-sm font-semibold text-accent-foreground hover:opacity-90">{t.update}</button>
          </form>
        )}
      </div>
    </div>
  );
}
function PwField({ value, onChange, placeholder }: { value: string; onChange: (v:string)=>void; placeholder: string }) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
      <input type="password" required value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent"/>
    </div>
  );
}
