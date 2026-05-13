import { useState } from "react";

const SIDEBAR_TOOLS = [
  { icon: "↖", label: "Sélectionneur" },
  { icon: "▣", label: "Classe", active: true },
  { icon: "⬡", label: "Interface" },
  { icon: "📦", label: "Paquetage" },
  { icon: "→", label: "Relation" },
  { icon: "≡", label: "Commentaire" },
];

const COLORS = ["#1e293b", "#0d9488", "#dc2626", "#ffffff"];

export default function EditeurUML() {
  const [activeTool, setActiveTool] = useState("Classe");
  const [className, setClassName] = useState("UserAccount");
  const [selectedColor, setSelectedColor] = useState("#1e293b");

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#f8fafc",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Top nav */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 24px",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{
            width: 26, height: 26, border: "2px solid #0f172a",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10,
          }}>⌘</div>
          {["Tableau de bord", "Projets", "Documentation", "Exporter"].map(nav => (
            <button key={nav} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, padding: "4px 0",
              color: nav === "Projets" ? "#0f172a" : "#64748b",
              fontWeight: nav === "Projets" ? 700 : 400,
              borderBottom: nav === "Projets" ? "2px solid #0284c7" : "2px solid transparent",
              fontFamily: "'DM Sans', sans-serif",
            }}>{nav}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={{
            width: 32, height: 32, background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14,
          }}>🔍</button>
          <button style={{
            width: 32, height: 32, background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14,
          }}>⚙</button>
          <button style={{
            width: 32, height: 32, background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14, position: "relative",
          }}>
            🔔
            <div style={{
              position: "absolute", top: 5, right: 5,
              width: 7, height: 7, background: "#ef4444",
              borderRadius: "50%", border: "1.5px solid white",
            }} />
          </button>
          <div style={{
            width: 32, height: 32, background: "#0f172a",
            borderRadius: 8, display: "flex", alignItems: "center",
            justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700,
          }}>F</div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left sidebar */}
        <div style={{
          width: 200,
          background: "white",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
          {/* Atelier header */}
          <div style={{ padding: "16px 16px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 28, height: 28, background: "#0f172a",
                borderRadius: 6, display: "flex", alignItems: "center",
                justifyContent: "center", color: "white", fontSize: 12,
              }}>A</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Atelier</div>
                <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: "'DM Mono', monospace", letterSpacing: 0.5 }}>ÉLÉMENTS UML</div>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div style={{ padding: "8px 8px", flex: 1 }}>
            {SIDEBAR_TOOLS.map(t => (
              <button
                key={t.label}
                onClick={() => setActiveTool(t.label)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 8, border: "none",
                  background: activeTool === t.label ? "#0f172a" : "transparent",
                  color: activeTool === t.label ? "white" : "#475569",
                  cursor: "pointer", fontSize: 13, fontWeight: activeTool === t.label ? 600 : 400,
                  marginBottom: 2, fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Usage */}
          <div style={{
            padding: 16, margin: 12,
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.5, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
              UTILISATION
            </div>
            <div style={{ height: 6, background: "#e2e8f0", borderRadius: 3, marginBottom: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "70%", background: "#0f172a", borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>14/20 objets utilisés</div>
          </div>

          {/* Status */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid #f1f5f9",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 11, color: "#64748b" }}>Synchronisé avec le cloud</span>
          </div>
        </div>

        {/* Canvas */}
        <div style={{
          flex: 1,
          background: "white",
          backgroundImage: `
            radial-gradient(circle, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          position: "relative",
          overflow: "hidden",
          cursor: "crosshair",
        }}>
          {/* UserAccount class */}
          <div style={{
            position: "absolute", top: 80, left: 200,
            border: "2px solid #0284c7",
            borderRadius: 0,
            background: "white",
            width: 230,
            boxShadow: "0 4px 20px rgba(2,132,199,0.15)",
            userSelect: "none",
          }}>
            {/* Resize handles */}
            {[
              { top: -4, left: -4 }, { top: -4, right: -4 },
              { bottom: -4, left: -4 }, { bottom: -4, right: -4 },
            ].map((pos, i) => (
              <div key={i} style={{
                position: "absolute", ...pos,
                width: 8, height: 8,
                border: "2px solid #0284c7", background: "white",
                cursor: "nw-resize",
              }} />
            ))}
            {/* Header */}
            <div style={{
              padding: "10px 16px", borderBottom: "1px solid #e2e8f0",
              textAlign: "center", background: "white",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>UserAccount</div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic", fontFamily: "'DM Mono', monospace" }}>«Entity»</div>
            </div>
            {/* Attributes */}
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #f1f5f9", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
              {["- id: UUID", "- email: String", "- passwordHash: String", "- isActive: Boolean"].map(a => (
                <div key={a} style={{ color: "#475569", marginBottom: 3 }}>{a}</div>
              ))}
            </div>
            {/* Methods */}
            <div style={{ padding: "10px 16px", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
              {["+ login(): Boolean", "+ resetPassword(): void", "+ updateProfile(): void"].map(m => (
                <div key={m} style={{ color: "#0284c7", marginBottom: 3 }}>{m}</div>
              ))}
            </div>
          </div>

          {/* Relation line */}
          <div style={{
            position: "absolute", top: 160, left: 430,
            fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace",
          }}>1..*</div>
          <svg style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%", pointerEvents: "none",
          }}>
            <line x1="430" y1="195" x2="575" y2="260" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="530" y="280" fill="#94a3b8" fontSize="11" fontFamily="DM Mono">0..1</text>
          </svg>

          {/* SessionManager class */}
          <div style={{
            position: "absolute", top: 250, left: 500,
            border: "1.5px solid #e2e8f0",
            background: "white",
            width: 240,
            borderRadius: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #f1f5f9", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>SessionManager</div>
            </div>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #f1f5f9", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
              <div style={{ color: "#475569", marginBottom: 3 }}>- activeSessions: List</div>
              <div style={{ color: "#475569" }}>- maxIdleTime: Int</div>
            </div>
            <div style={{ padding: "10px 16px", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
              <div style={{ color: "#0284c7", marginBottom: 3 }}>+ createSession(): void</div>
              <div style={{ color: "#0284c7" }}>+ invalidateSession(): void</div>
            </div>
          </div>

          {/* Oval ghost element */}
          <div style={{
            position: "absolute", top: 370, left: 460,
            width: 48, height: 48, borderRadius: "50%",
            background: "#e2e8f0", opacity: 0.5,
          }} />

          {/* Canvas footer status */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "rgba(255,255,255,0.95)", borderTop: "1px solid #f1f5f9",
            padding: "8px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 11, color: "#64748b" }}>2 Classes, 1 Relation</span>
            <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>
              X: 104px Y: 320px &nbsp; 100%
            </span>
          </div>
        </div>

        {/* Right panel - Properties */}
        <div style={{
          width: 280,
          background: "white",
          borderLeft: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflow: "auto",
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Propriétés</h3>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16 }}>⋮</button>
          </div>

          <div style={{ padding: "20px 20px", overflow: "auto" }}>
            {/* Class name */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8",
                letterSpacing: 0.8, marginBottom: 8, fontFamily: "'DM Mono', monospace",
              }}>NOM DE LA CLASSE</label>
              <input
                value={className}
                onChange={e => setClassName(e.target.value)}
                style={{
                  width: "100%", border: "1.5px solid #e2e8f0",
                  borderRadius: 8, padding: "10px 12px",
                  fontSize: 14, color: "#0f172a", outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Stereotype */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8",
                letterSpacing: 0.8, marginBottom: 8, fontFamily: "'DM Mono', monospace",
              }}>STÉRÉOTYPE</label>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{
                  background: "#f1f5f9", border: "1.5px solid #e2e8f0",
                  borderRadius: 6, padding: "6px 12px",
                  fontSize: 11, fontWeight: 700, color: "#475569",
                  fontFamily: "'DM Mono', monospace",
                }}>«ENTITY»</span>
                <button style={{
                  width: 32, height: 32, border: "1.5px dashed #e2e8f0",
                  borderRadius: 6, background: "none", cursor: "pointer",
                  color: "#94a3b8", fontSize: 16,
                }}>+</button>
              </div>
            </div>

            {/* Attributes */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <label style={{
                  fontSize: 10, fontWeight: 700, color: "#94a3b8",
                  letterSpacing: 0.8, fontFamily: "'DM Mono', monospace",
                }}>ATTRIBUTS (4)</label>
                <button style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 11, color: "#0284c7", fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                }}>+ AJOUTER</button>
              </div>
              {["- id: UUID", "- email: String"].map((attr, i) => (
                <div key={i} style={{
                  border: "1px solid #e2e8f0", borderRadius: 6,
                  padding: "9px 12px", marginBottom: 6,
                  fontSize: 12, color: "#475569",
                  fontFamily: "'DM Mono', monospace",
                  background: "#fafafa",
                }}>{attr}</div>
              ))}
            </div>

            {/* Methods */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <label style={{
                  fontSize: 10, fontWeight: 700, color: "#94a3b8",
                  letterSpacing: 0.8, fontFamily: "'DM Mono', monospace",
                }}>MÉTHODES (3)</label>
                <button style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 11, color: "#0284c7", fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                }}>+ AJOUTER</button>
              </div>
              <div style={{
                border: "1px solid #e2e8f0", borderRadius: 6,
                padding: "9px 12px", marginBottom: 6,
                fontSize: 12, color: "#0284c7",
                fontFamily: "'DM Mono', monospace",
                background: "#fafafa",
              }}>+ login(): Boolean</div>
            </div>

            {/* Appearance */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8",
                letterSpacing: 0.8, marginBottom: 10, fontFamily: "'DM Mono', monospace",
              }}>APPARENCE</label>
              <div style={{ display: "flex", gap: 8 }}>
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: c, cursor: "pointer",
                      border: selectedColor === c ? "2.5px solid #0284c7" : "1.5px solid #e2e8f0",
                      transition: "border 0.15s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Save button */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f1f5f9", marginTop: "auto" }}>
            <button style={{
              width: "100%", background: "#0f172a", color: "white",
              border: "none", borderRadius: 8, padding: "13px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 0.3,
            }}>
              💾 SAUVEGARDER LES MODIFICATIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
