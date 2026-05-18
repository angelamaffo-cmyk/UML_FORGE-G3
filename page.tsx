"use client";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { MessageSquare, Github, Twitter, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STR = {
  fr: {
    h1: "Rejoignez la communauté",
    sub: "Connectez-vous avec des milliers de praticiens UML.",
    cards: [
      { title: "Discord", desc: "Discutez avec l'équipe et d'autres modélisateurs.", cta: "Rejoindre Discord" },
      { title: "GitHub", desc: "Étoilez le dépôt, ouvrez des tickets, contribuez.", cta: "Voir le code source" },
      { title: "Twitter / X", desc: "Astuces, actualités, coulisses.", cta: "Suivre @umlforge" },
      { title: "Forum", desc: "Discussions longues et démonstrations.", cta: "Visiter le forum" },
    ],
  },
  en: {
    h1: "Join the community",
    sub: "Connect with thousands of UML practitioners.",
    cards: [
      { title: "Discord", desc: "Chat with the team and other modelers.", cta: "Join Discord" },
      { title: "GitHub", desc: "Star the repo, file issues, contribute.", cta: "View source" },
      { title: "Twitter / X", desc: "Tips, news, behind the scenes.", cta: "Follow @umlforge" },
      { title: "Forum", desc: "Long-form discussions and showcases.", cta: "Visit forum" },
    ],
  },
};

export default function Community() {
  const { lang } = useLang(); const t = STR[lang];
  const icons = [<MessageSquare key="d"/>, <Github key="g"/>, <Twitter key="t"/>, <Users key="u"/>];
  return (
    <div className="min-h-screen bg-background">
      <SiteNav/>
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-black">{t.h1}</h1>
          <p className="mt-3 text-muted-foreground">{t.sub}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {t.cards.map((c, i) => <Card key={c.title} icon={icons[i]} {...c}/>)}
        </div>
      </main>
      <SiteFooter/>
    </div>
  );
}
function Card({ icon, title, desc, cta }: { icon: React.ReactNode; title: string; desc: string; cta: string }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-lg transition">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">{icon}</div>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <button className="mt-4 text-sm font-semibold text-accent hover:underline">{cta} →</button>
    </div>
  );
}
