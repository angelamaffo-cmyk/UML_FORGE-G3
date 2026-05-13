import { useState } from "react";

const SIDEBAR_SECTIONS = [
  {
    title: "INTRODUCTION",
    items: [
      { label: "Présentation", active: true },
      { label: "Démarrage Rapide", icon: "🚀" },
    ],
  },
  {
    title: "ÉLÉMENTS UML",
    items: [
      { label: "Diagrammes de Classes", icon: "▣" },
      { label: "Diagrammes de Séquence", icon: "⟷" },
      { label: "Relations", icon: "→" },
    ],
  },
  {
    title: "EXPORTATION",
    items: [
      { label: "SVG & PNG", icon: "⬇" },
      { label: "Génération de Code", icon: "</>" },
    ],
  },
  {
    title: "RÉFÉRENCE API",
    items: [
      { label: "Outil CLI", icon: "⌨" },
      { label: "API REST", icon: "✦" },
    ],
  },
];

const DSL_CODE = `class CompteUtilisateur {
  // Attributs
  - id: UUID
  - email: String
  + dernierAcces: DateTime

  // Méthodes
  + validerMotDePasse(pass: String): Boolean
  + miseAJourProfil(data: ProfileData)
}`;

export default function Documentation() {
  const [activeItem, setActiveItem] = useState("Présentation");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "white",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Topbar */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 24px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 26, height: 26, border: "2px solid #0f172a",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10,
            }}>⌘</div>
          </div>
          {["Éditeur", "Documentation", "Tarifs", "Communauté"].map(nav => (
            <button key={nav} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, padding: "4px 0",
              color: nav === "Documentation" ? "#0f172a" : "#64748b",
              fontWeight: nav === "Documentation" ? 700 : 400,
              borderBottom: nav === "Documentation" ? "2px solid #0284c7" : "2px solid transparent",
              fontFamily: "'DM Sans', sans-serif",
            }}>{nav}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 8, padding: "7px 14px",
          }}>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>🔍</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              style={{
                background: "none", border: "none", outline: "none",
                fontSize: 13, color: "#0f172a", width: 140,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
          </div>
          <button style={{
            background: "white", border: "1.5px solid #e2e8f0",
            borderRadius: 7, padding: "7px 16px",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            color: "#0f172a", fontFamily: "'DM Sans', sans-serif",
          }}>Connexion</button>
          <button style={{
            background: "#0f172a", color: "white",
            border: "none", borderRadius: 7, padding: "7px 16px",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>S'inscrire</button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left sidebar */}
        <div style={{
          width: 220,
          borderRight: "1px solid #e2e8f0",
          background: "white",
          overflow: "auto",
          padding: "24px 0",
          flexShrink: 0,
        }}>
          <div style={{ padding: "0 16px 12px" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>Documentation</div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>V2.4.0 STABLE</div>
          </div>

          {SIDEBAR_SECTIONS.map(section => (
            <div key={section.title} style={{ marginBottom: 20, padding: "0 8px" }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: "#94a3b8",
                letterSpacing: 0.8, padding: "4px 8px 8px",
                fontFamily: "'DM Mono', monospace",
              }}>{section.title}</div>
              {section.items.map(item => (
                <button
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 10px", borderRadius: 7, border: "none",
                    background: activeItem === item.label ? "#e0f2fe" : "transparent",
                    color: activeItem === item.label ? "#0369a1" : "#475569",
                    cursor: "pointer", fontSize: 13,
                    fontWeight: activeItem === item.label ? 600 : 400,
                    marginBottom: 2, fontFamily: "'DM Sans', sans-serif",
                    textAlign: "left",
                  }}
                >
                  {item.icon && <span style={{ fontSize: 13, width: 16 }}>{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{
          flex: 1, overflow: "auto",
          padding: "40px 60px",
          maxWidth: 860,
          position: "relative",
        }}>
          {/* Dot pattern background */}
          <div style={{
            position: "fixed", top: 56, right: 0, bottom: 0, width: 200,
            backgroundImage: "radial-gradient(circle, #e2e8f0 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
            opacity: 0.5,
            pointerEvents: "none",
          }} />

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <a href="#" style={{ fontSize: 13, color: "#0284c7", textDecoration: "none" }}>Docs</a>
            <span style={{ color: "#e2e8f0" }}>›</span>
            <a href="#" style={{ fontSize: 13, color: "#0284c7", textDecoration: "none" }}>Présentation</a>
          </div>

          <h1 style={{
            fontSize: 36, fontWeight: 800, color: "#0f172a",
            letterSpacing: -1.2, marginBottom: 24,
          }}>Introduction à UML Forge</h1>

          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 40 }}>
            UML Forge est une plateforme de modélisation de haute précision conçue pour les architectes système et les ingénieurs logiciel. Nous privilégions l'exactitude structurelle aux éléments décoratifs, offrant un outil qui s'apparente à un environnement CAO professionnel pour la conception logicielle.
          </p>

          {/* Two feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
            <div style={{
              border: "1px solid #e2e8f0", borderRadius: 12, padding: 24,
              background: "white",
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
                Intégrité Structurelle
              </h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>
                Chaque élément sur le canevas respecte une grille stricte de 4px. Maintenez un alignement parfait dans les architectures d'entreprise complexes grâce au magnétisme automatique et aux guides de précision.
              </p>
              {/* Grid illustration */}
              <div style={{
                background: "#f0f9ff",
                borderRadius: 8,
                height: 80,
                backgroundImage: `
                  linear-gradient(rgba(2,132,199,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(2,132,199,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "16px 16px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 32, height: 32,
                  border: "2px solid #0284c7",
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: 4,
                }} />
              </div>
            </div>
            <div style={{
              background: "#0f172a", borderRadius: 12, padding: 24,
            }}>
              <div style={{
                width: 32, height: 32, background: "#1e3a5f",
                borderRadius: 8, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 14, marginBottom: 12,
              }}>⚡</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 10 }}>
                Haute Performance
              </h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
                Rendu de milliers de nœuds avec une fluidité de 60fps grâce à notre moteur de canevas accéléré par WebGL.
              </p>
            </div>
          </div>

          {/* DSL Section */}
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.5, marginBottom: 16 }}>
            Définition des Éléments de Classe
          </h2>
          <div style={{
            background: "#0d1117",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 48,
          }}>
            {/* Window chrome */}
            <div style={{
              padding: "10px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace" }}>Exemple DSL</span>
            </div>
            {/* Code */}
            <div style={{
              padding: "16px 20px 24px",
              fontFamily: "'DM Mono', monospace",
              fontSize: 12.5,
              lineHeight: 2,
            }}>
              {DSL_CODE.split("\n").map((line, i) => {
                const isComment = line.trim().startsWith("//");
                const isMethod = line.includes("+ ");
                const isAttr = line.includes("- ");
                const isKeyword = line.includes("class ");
                const color = isComment ? "#475569"
                  : isMethod ? "#7dd3fc"
                  : isAttr ? "#94a3b8"
                  : isKeyword ? "#c4b5fd"
                  : "#e2e8f0";
                return (
                  <div key={i} style={{ color }}>
                    <span style={{ color: "#2d3748", marginRight: 16, userSelect: "none", fontSize: 11 }}>{i + 1}</span>
                    {line}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Relations section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", marginBottom: 56 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.5, marginBottom: 12 }}>
                Cartographie des Relations
              </h2>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>
                Visualisez l'héritage, la composition et l'agrégation complexes en un clic. Notre moteur de relations calcule automatiquement le chemin le plus court entre les nœuds pour éviter l'encombrement visuel.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Connecteurs auto-adaptatifs", "Support de la notation de multiplicité", "Personnalisation des flèches directionnelles"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: "#0284c7", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: 10, flexShrink: 0,
                    }}>✓</div>
                    <span style={{ fontSize: 13, color: "#0f172a" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              border: "1px solid #e2e8f0", borderRadius: 12, padding: 20,
              background: "#fafafa",
            }}>
              {/* Relation diagram */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{
                  border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 12px",
                  background: "white", fontSize: 12, fontWeight: 600, color: "#0f172a",
                  textAlign: "center", alignSelf: "center", width: 80,
                }}>System</div>
                <svg width="100%" height="80" style={{ overflow: "visible" }}>
                  <line x1="50%" y1="0" x2="25%" y2="60" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="50%" y1="0" x2="50%" y2="60" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="50%" y1="0" x2="75%" y2="60" stroke="#cbd5e1" strokeWidth="1.5" />
                  {["Viewer", "Module", "Module"].map((n, i) => (
                    <foreignObject key={i} x={`${12 + i * 28}%`} y="50" width="60" height="28">
                      <div style={{
                        border: "1px solid #e2e8f0", borderRadius: 5,
                        background: "white", fontSize: 10, color: "#475569",
                        fontWeight: 600, padding: "3px 6px", textAlign: "center",
                        fontFamily: "'DM Sans', sans-serif",
                      }}>{n}</div>
                    </foreignObject>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation footer */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            borderTop: "1px solid #f1f5f9", paddingTop: 32,
          }}>
            {[
              { dir: "PRÉCÉDENT", label: "Configuration du Projet", arrow: "←" },
              { dir: "SUIVANT", label: "Diagrammes de Classes", arrow: "→" },
            ].map(nav => (
              <div key={nav.dir} style={{
                border: "1px solid #e2e8f0", borderRadius: 10,
                padding: "16px 20px", cursor: "pointer",
                transition: "border-color 0.2s",
              }}>
                <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: 0.5, marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>
                  {nav.dir}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0284c7" }}>
                  {nav.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: "white", borderTop: "1px solid #f1f5f9",
        padding: "16px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>—</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>UML Forge</span>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>© 2026 UML Forge. Conçu pour la précision structurelle.</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Confidentialité", "Conditions", "API", "Statut"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button style={{
        position: "fixed", bottom: 72, left: 16,
        background: "#0f172a", color: "white",
        border: "none", borderRadius: 10, padding: "10px 16px",
        fontSize: 12, fontWeight: 700, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}>
        + Nouveau Diagramme
      </button>
    </div>
  );
}
