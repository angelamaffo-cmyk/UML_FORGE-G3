"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LABELS = {
  fr: { home: "Accueil", pricing: "Tarifs", docs: "Docs", community: "Communauté",
        signin: "Se connecter", getstarted: "Commencer", signup: "S'inscrire", logout: "Déconnexion", menu: "Menu" },
  en: { home: "Home", pricing: "Pricing", docs: "Docs", community: "Community",
        signin: "Sign in", getstarted: "Get started", signup: "Sign up", logout: "Logout", menu: "Menu" },
};

const FOOTER = {
  fr: {
    tagline: "Diagrammes UML de qualité ingénierie, dans votre navigateur.",
    product: "Produit", resources: "Ressources", account: "Compte",
    editor: "Éditeur", exportSql: "Export SQL", importSql: "Import SQL", pricing: "Tarifs",
    documentation: "Documentation", community: "Communauté",
    signin: "Se connecter", signup: "S'inscrire", dashboard: "Tableau de bord",
    rights: "Tous droits réservés.",
  },
  en: {
    tagline: "Engineering-grade UML diagrams, in your browser.",
    product: "Product", resources: "Resources", account: "Account",
    editor: "Editor", exportSql: "SQL Export", importSql: "SQL Import", pricing: "Pricing",
    documentation: "Documentation", community: "Community",
    signin: "Sign in", signup: "Sign up", dashboard: "Dashboard",
    rights: "All rights reserved.",
  },
};

export function SiteNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { lang } = useLang();
  const t = NAV_LABELS[lang];
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: t.home },
    { href: "/pricing", label: t.pricing },
    { href: "/docs", label: t.docs },
    { href: "/community", label: t.community },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(n => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
                {active && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-accent rounded-full animate-scale-in" />}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:bg-surface">
                <User className="h-4 w-4" /> {user.name}
              </Link>
              <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" /> {t.logout}</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">{t.signin}</Link>
              <Link href="/signup" className="rounded-md bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">{t.getstarted}</Link>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={t.menu}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2 animate-fade-in">
          {navItems.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-surface text-sm">{n.label}</Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <LanguageToggle />
            <ThemeToggle />
            {user ? (
              <button onClick={logout} className="flex-1 rounded-md border border-border px-3 py-2 text-sm">{t.logout}</button>
            ) : (
              <>
                <Link href="/login" className="flex-1 rounded-md border border-border px-3 py-2 text-sm text-center">{t.signin}</Link>
                <Link href="/signup" className="flex-1 rounded-md bg-accent px-3 py-2 text-sm text-center text-accent-foreground">{t.signup}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { lang } = useLang();
  const t = FOOTER[lang];
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">{t.tagline}</p>
        </div>
        <FooterCol title={t.product} links={[[t.editor,"/editor"],[t.exportSql,"/export-sql"],[t.importSql,"/sql-import"],[t.pricing,"/pricing"]]} />
        <FooterCol title={t.resources} links={[[t.documentation,"/docs"],[t.community,"/community"]]} />
        <FooterCol title={t.account} links={[[t.signin,"/login"],[t.signup,"/signup"],[t.dashboard,"/dashboard"]]} />
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} UML Forge. {t.rights}</div>
    </footer>
  );
}
function FooterCol({ title, links }: { title: string; links: [string,string][] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([l,h]) => <li key={h}><Link href={h} className="hover:text-accent transition-colors">{l}</Link></li>)}
      </ul>
    </div>
  );
}
