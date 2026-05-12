import { useState, useEffect } from "react";

const NAV_LINKS = ["Éditeur", "Documentation", "Tarifs", "Communauté"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 60,
        background: scrolled ? "rgba(255,255,255,0.97)" : "white",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid #f0f0f0",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.07)" : "none",
        transition: "all 0.3s",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28,
          border: "2px solid #0f172a",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 700, letterSpacing: -0.5
        }}>
          ⌘
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", letterSpacing: -0.5 }}>UML Forge</span>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {NAV_LINKS.map((l, i) => (
          <a key={l} href="#" style={{
            fontSize: 14,
            color: i === 0 ? "#0f172a" : "#64748b",
            textDecoration: "none",
            fontWeight: i === 0 ? 600 : 400,
            borderBottom: i === 0 ? "2px solid #0284c7" : "none",
            paddingBottom: i === 0 ? 2 : 0,
          }}>{l}</a>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 14, color: "#0f172a", fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
        }}>Connexion</button>
        <button style={{
          background: "#0f172a", color: "white",
          border: "none", borderRadius: 6, padding: "8px 18px",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.2s",
        }}>Commencer Gratuitement</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section style={{
      paddingTop: 120,
      paddingBottom: 80,
      paddingLeft: 80,
      paddingRight: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 60,
      maxWidth: 1200,
      margin: "0 auto",
    }}>
      <div style={{ flex: 1, maxWidth: 500 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#e0f2fe", color: "#0369a1",
          padding: "5px 12px", borderRadius: 20, fontSize: 11,
          fontWeight: 700, letterSpacing: 0.5, marginBottom: 24,
          fontFamily: "'DM Mono', monospace",
        }}>
          ⚙ STANDARD D'INGÉNIERIE v2.4
        </div>
        <h1 style={{
          fontSize: 44,
          fontWeight: 800,
          lineHeight: 1.15,
          color: "#0f172a",
          marginBottom: 20,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: -1.5,
        }}>
          L'ingénierie logicielle avec une{" "}
          <span style={{ color: "#0284c7" }}>précision chirurgicale.</span>
        </h1>
        <p style={{
          fontSize: 16, color: "#475569", lineHeight: 1.7, marginBottom: 36,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Concevez des architectures systèmes complexes avec un moteur UML haute performance. Générez du code propre, exportez des schémas SQL et collaborez en temps réel.
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32 }}>
          <button style={{
            background: "#0f172a", color: "white",
            border: "none", borderRadius: 8, padding: "14px 28px",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
            fontFamily: "'DM Sans', sans-serif",
          }}>Démarrer Gratuitement →</button>
          <button style={{
            background: "white", color: "#0f172a",
            border: "1.5px solid #cbd5e1", borderRadius: 8, padding: "14px 28px",
            fontSize: 15, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>Voir la Démo Live</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex" }}>
            {["#94a3b8", "#64748b", "#475569"].map((c, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: "50%",
                background: c, border: "2px solid white",
                marginLeft: i > 0 ? -8 : 0,
              }} />
            ))}
          </div>
          <span style={{ fontSize: 13, color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>
            Rejoint par <b style={{ color: "#0f172a" }}>+50,000</b> architectes
          </span>
        </div>
      </div>

      {/* Hero diagram */}
      <div style={{
        flex: 1, maxWidth: 520,
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        position: "relative",
      }}>
        {/* OrderProcessor class */}
        <div style={{
          background: "#1e293b", color: "white",
          borderRadius: 8, padding: "0 0 12px 0", width: 220,
          fontFamily: "'DM Mono', monospace", fontSize: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}>
          <div style={{
            background: "#1e3a5f", padding: "10px 16px",
            borderRadius: "8px 8px 0 0",
            fontWeight: 700, fontSize: 13, textAlign: "center",
          }}>OrderProcessor</div>
          <div style={{ padding: "10px 16px", borderTop: "1px solid #334155" }}>
            <div style={{ color: "#94a3b8", fontSize: 11 }}>- orders: list&lt;Order&gt;</div>
            <div style={{ color: "#94a3b8", fontSize: 11 }}>- validator: IValidator</div>
          </div>
          <div style={{ padding: "4px 16px", borderTop: "1px solid #334155" }}>
            <div style={{ color: "#7dd3fc", fontSize: 11 }}>+ processOrder(): void</div>
            <div style={{ color: "#7dd3fc", fontSize: 11 }}>+ cancelOrder(): bool</div>
          </div>
        </div>

        {/* SQL badge */}
        <div style={{
          position: "absolute", top: 100, right: 50,
          background: "#eff6ff", border: "1.5px solid #93c5fd",
          color: "#1d4ed8", borderRadius: 8, padding: "6px 14px",
          fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
          fontFamily: "'DM Mono', monospace",
        }}>
          &lt;&gt; Génération du schéma SQL...
        </div>

        {/* Arrow */}
        <div style={{
          position: "absolute", top: 120, right: 160,
          color: "#94a3b8", fontSize: 20,
        }}>⤵</div>

        {/* PaymentGateway class */}
        <div style={{
          background: "white", border: "1.5px dashed #94a3b8",
          borderRadius: 8, padding: "0 0 10px 0", width: 200,
          fontFamily: "'DM Mono', monospace", fontSize: 12,
          position: "absolute", bottom: 40, right: 32,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}>
          <div style={{
            padding: "8px 14px", borderBottom: "1px solid #e2e8f0",
            fontWeight: 700, fontSize: 13, color: "#0f172a",
          }}>PaymentGateway</div>
          <div style={{ padding: "8px 14px" }}>
            <div style={{ color: "#64748b", fontSize: 11 }}>- apiKey: String</div>
          </div>
          <div style={{ padding: "4px 14px", borderTop: "1px solid #e2e8f0" }}>
            <div style={{ color: "#0284c7", fontSize: 11 }}>+ authorize(): Token</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "🔧",
    title: "Canevas Interactif Infini",
    desc: "Un plan de travail de précision avec magnétisme, mise en page automatique et inférence de relations.",
    dark: false,
    wide: true,
    extra: (
      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: i === 2 ? 70 : 60, height: i === 2 ? 80 : 70,
            border: i === 2 ? "2px solid #0284c7" : "1.5px solid #e2e8f0",
            borderRadius: 6, background: "white",
          }} />
        ))}
      </div>
    ),
  },
  {
    icon: "🗄",
    title: "Auto-génération SQL",
    desc: "Modélisez visuellement et exportez instantanément du SQL prêt pour la production ou des schémas Prisma.",
    dark: true,
    wide: false,
    extra: (
      <div style={{
        background: "#0f172a", borderRadius: 6, padding: "10px 14px",
        fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#7dd3fc",
        marginTop: 16, lineHeight: 1.8,
      }}>
        <span style={{ color: "#64748b" }}>CREATE TABLE orders (</span><br />
        &nbsp;&nbsp;id UUID PRIMARY KEY,<br />
        &nbsp;&nbsp;status VARCHAR(20)<br />
        <span style={{ color: "#64748b" }}>);</span>
      </div>
    ),
  },
  {
    icon: "👥",
    title: "Multi-Architecte Sync",
    desc: "Édition collaborative en temps réel avec contrôle de version granulaire et commentaires contextuels.",
    dark: false,
    wide: false,
    extra: (
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {["#0ea5e9", "#64748b", "#1e293b", "#0284c7"].map((c, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "50%", background: c,
            border: "2px solid white", marginLeft: i > 0 ? -6 : 0,
          }} />
        ))}
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#f1f5f9", border: "2px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: "#64748b", fontWeight: 700, marginLeft: -6,
        }}>+12</div>
      </div>
    ),
  },
  {
    icon: "⚡",
    title: "Performance Sub-Milliseconde",
    desc: "Affichez des diagrammes de plus de 10 000 nœuds à 60 FPS. Optimisé avec WebGL pour une exploration fluide.",
    dark: false,
    wide: true,
    img: true,
  },
];

function FeaturesSection() {
  return (
    <section style={{
      background: "#f8fafc", padding: "80px 80px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: "#0f172a", letterSpacing: -1, marginBottom: 12 }}>
          Conçu pour la Complexité
        </h2>
        <p style={{ fontSize: 16, color: "#64748b" }}>L'outil indispensable pour gérer les architectures systèmes les plus exigeantes.</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            background: f.dark ? "#0f172a" : "white",
            borderRadius: 16,
            padding: 32,
            border: f.dark ? "none" : "1px solid #e2e8f0",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: f.dark ? "#1e3a5f" : "#f0f9ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, marginBottom: 16,
            }}>{f.icon}</div>
            <h3 style={{
              fontSize: 18, fontWeight: 700,
              color: f.dark ? "white" : "#0f172a",
              marginBottom: 8, letterSpacing: -0.3,
            }}>{f.title}</h3>
            <p style={{
              fontSize: 14, color: f.dark ? "#94a3b8" : "#64748b",
              lineHeight: 1.6, marginBottom: 0,
            }}>{f.desc}</p>
            {f.extra}
            {f.img && (
              <div style={{
                marginTop: 20, borderRadius: 10, overflow: "hidden", height: 160,
                background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  color: "#334155", fontSize: 48,
                  textShadow: "0 0 60px rgba(14,165,233,0.6)",
                }}>◈</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div style={{
      background: "white",
      borderTop: "1px solid #f1f5f9",
      borderBottom: "1px solid #f1f5f9",
      padding: "24px 80px",
      display: "flex",
      alignItems: "center",
      gap: 48,
      fontFamily: "'DM Mono', monospace",
    }}>
      <span style={{ fontSize: 11, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
        APPROUVÉ PAR LES ARCHITECTES DE :
      </span>
      {["NEXUS_SYSTEMS", "STRUCT_CORE", "QUANTUM_LOGIC", "FORGE_TECH"].map(n => (
        <span key={n} style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1", letterSpacing: 1 }}>{n}</span>
      ))}
    </div>
  );
}

function CtaSection() {
  return (
    <section style={{
      background: "#0f172a",
      padding: "100px 80px",
      textAlign: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <h2 style={{
        fontSize: 42, fontWeight: 800, color: "white",
        letterSpacing: -1.5, marginBottom: 16,
      }}>Prêt à bâtir des fondations solides ?</h2>
      <p style={{ fontSize: 17, color: "#64748b", marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
        Rejoignez la communauté d'ingénieurs qui façonnent les systèmes les plus résilients au monde.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <button style={{
          background: "#0284c7", color: "white",
          border: "none", borderRadius: 8, padding: "16px 32px",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}>Démarrer l'aventure gratuitement</button>
        <button style={{
          background: "transparent", color: "white",
          border: "1.5px solid #334155", borderRadius: 8, padding: "16px 32px",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}>Demander une démo Enterprise</button>
      </div>
      <p style={{ marginTop: 20, fontSize: 13, color: "#475569", fontStyle: "italic" }}>
        Aucune carte de crédit requise pour les projets open-source.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "white", borderTop: "1px solid #f1f5f9",
      padding: "24px 80px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>— UML Forge</span>
        </div>
        <div style={{ fontSize: 12, color: "#94a3b8" }}>© 2026 UML Forge. Conçu pour la précision structurelle.</div>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {["Confidentialité", "Conditions", "API", "Statut"].map(l => (
          <a key={l} href="#" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

export default function Accueil() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "white", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TrustBar />
      <CtaSection />
      <Footer />
    </div>
  );
}
