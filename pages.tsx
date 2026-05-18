"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ArrowRight, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    h1: "Créez votre compte",
    sub: "Accès gratuit à l'éditeur UML Forge.",
    name: "Nom complet", email: "E-mail", password: "Mot de passe",
    weak: "Veuillez choisir un mot de passe plus robuste.",
    create: "Créer le compte",
    already: "Vous avez déjà un compte ?", signin: "Se connecter",
    fail: "Échec de l'inscription",
    strength: ["Trop faible","Faible","Correct","Robuste","Excellent"],
  },
  en: {
    h1: "Create your account",
    sub: "Get free access to the UML Forge editor.",
    name: "Full name", email: "Email", password: "Password",
    weak: "Please choose a stronger password.",
    create: "Create account",
    already: "Already have an account?", signin: "Sign in",
    fail: "Signup failed",
    strength: ["Too weak","Weak","Okay","Strong","Excellent"],
  },
};

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { lang } = useLang(); const t = STR[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const strength = passwordStrength(password, t.strength);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (strength.score < 2) { setErr(t.weak); return; }
    setErr(""); setLoading(true);
    try { await signup(name, email, password); router.push("/dashboard"); }
    catch(e:any) { setErr(e.message || t.fail); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      <div className="absolute -top-32 -left-20 h-96 w-96 bg-accent/20 blur-3xl animate-blob"/>
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-primary/20 blur-3xl animate-blob" style={{animationDelay:"3s"}}/>
      <div className="absolute top-6 left-6"><Logo/></div>
      <div className="absolute top-6 right-6 flex gap-2"><LanguageToggle/><ThemeToggle/></div>

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl animate-scale-in">
        <h1 className="text-3xl font-bold">{t.h1}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.sub}</p>

        {err && <div className="mt-4 flex gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"><AlertCircle className="h-4 w-4"/>{err}</div>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <IconInput icon={<User className="h-4 w-4"/>} placeholder={t.name} value={name} onChange={setName} required/>
          <IconInput icon={<Mail className="h-4 w-4"/>} type="email" placeholder={t.email} value={email} onChange={setEmail} required/>
          <div>
            <IconInput icon={<Lock className="h-4 w-4"/>} type="password" placeholder={t.password} value={password} onChange={setPassword} required/>
            {password && (
              <div className="mt-2 space-y-1 animate-fade-in">
                <div className="flex gap-1">
                  {[0,1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < strength.score ? strength.color : "bg-border"}`}/>)}
                </div>
                <div className="text-[10px] text-muted-foreground">{strength.label}</div>
              </div>
            )}
          </div>
          <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50">
            {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground"/> : <>{t.create} <ArrowRight className="h-4 w-4"/></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t.already} <Link href="/login" className="font-medium text-accent hover:underline">{t.signin}</Link>
        </p>
      </div>
      <style jsx global>{`.auth-input2{width:100%;border-radius:6px;border:1px solid var(--color-border);background:var(--color-background);padding:12px 12px 12px 40px;font-size:14px;outline:none}.auth-input2:focus{box-shadow:0 0 0 2px color-mix(in oklab,var(--color-accent) 50%,transparent)}`}</style>
    </div>
  );
}

function IconInput({ icon, value, onChange, ...rest }: any) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
      <input {...rest} value={value} onChange={e => onChange(e.target.value)} className="auth-input2"/>
    </div>
  );
}

function passwordStrength(p: string, labels: string[]) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^a-zA-Z0-9]/.test(p)) s++;
  const colors = ["bg-destructive","bg-destructive","bg-yellow-500","bg-success","bg-success"];
  return { score: s, label: labels[s], color: colors[s] };
}
