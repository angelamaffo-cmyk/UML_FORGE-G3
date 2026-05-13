import { useState } from "react";

const STATS = [
  { icon: "✦", label: "Projets Actifs", value: "12", color: "#0284c7" },
  { icon: "👥", label: "Collaborateurs", value: "04", color: "#0284c7" },
  { icon: "↺", label: "Modifications (24h)", value: "38", color: "#0284c7" },
  { icon: "☁", label: "Espace Cloud", value: "24%", color: "#0284c7" },
];

const PROJECTS = [
  {
    id: 1,
    title: "API E-commerce",
    lastModif: "DERNIÈRE MODIF : 2H",
    tags: [{ label: "DIAGRAMME CLASSE", dark: true }, { label: "PUBLIC", light: true }],
    preview: "grid",
  },
  {
    id: 2,
    title: "Flux Auth Utilisateur",
    lastModif: "DERNIÈRE MODIF : HIER",
    tags: [{ label: "SÉQUENCE", dark: true }, { label: "BROUILLON", cyan: true }],
    preview: "single",
  },
  {
    id: 3,
    title: "Maillage Microservices",
    lastModif: "DERNIÈRE MODIF : 1 SEMAINE",
    tags: [{ label: "DÉPLOIEMENT", dark: true }],
    preview: "diamond",
    wide: true,
  },
];

const ACTIVITY = [
  { icon: "✏", bg: "#e0f2fe", text: "Jean D. a mis à jour E-commerce API", time: "Il y a 10 min" },
  { icon: "+", bg: "#dcfce7", text: "Sophie M. a créé Schema V3", time: "Il y a 1 heure" },
  { icon: "🗑", bg: "#fee2e2", text: "Marc L. a archivé Old Legacy", time: "Hier, 16:45" },
];

function ProjectPreviewGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "12px 16px 0" }}>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 6, height: 60, background: "white" }}>
        <div style={{ height: 12, margin: 10, background: "#f1f5f9", borderRadius: 3 }} />
        <div style={{ height: 8, margin: "6px 10px", background: "#f8fafc", borderRadius: 3, width: "70%" }} />
      </div>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 6, height: 60, background: "white" }}>
        <div style={{ height: 12, margin: 10, background: "#f1f5f9", borderRadius: 3 }} />
        <div style={{ height: 8, margin: "6px 10px", background: "#f8fafc", borderRadius: 3 }} />
      </div>
    </div>
  );
}

function ProjectPreviewSingle() {
  return (
    <div style={{ padding: "12px 16px 0" }}>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 6, height: 70, background: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, border: "1px solid #e2e8f0", borderRadius: 6 }} />
        <div style={{ width: 48, height: 36, border: "1px solid #e2e8f0", borderRadius: 6 }} />
      </div>
    </div>
  );
}

function ProjectPreviewDiamond() {
  return (
    <div style={{ padding: "12px 16px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: -8 }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            width: 50, height: 50,
            border: "1.5px solid #cbd5e1",
            transform: "rotate(45deg)",
            marginLeft: i > 0 ? -8 : 0,
          }} />
        ))}
      </div>
    </div>
  );
}

function TagBadge({ tag }) {
  const bg = tag.cyan ? "#e0f2fe" : tag.dark ? "#0f172a" : "#f1f5f9";
  const color = tag.cyan ? "#0369a1" : tag.dark ? "white" : "#475569";
  return (
    <span style={{
      background: bg, color,
      fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
      padding: "3px 8px", borderRadius: 4,
      fontFamily: "'DM Mono', monospace",
    }}>{tag.label}</span>
  );
}

export default function TableauDeBord() {
  const [activeNav, setActiveNav] = useState("Tableau de bord");

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      background: "#f8fafc",
      display: "flex",
      flexDirection: "column",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Topbar */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, border: "2px solid #0f172a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11,
            }}>⌘</div>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", letterSpacing: -0.3 }}>UML FORGE</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["Mes projets", "Tableau de bord", "Documentation", "Exportations"].map(nav => (
              <button
                key={nav}
                onClick={() => setActiveNav(nav)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "6px 14px", borderRadius: 6, fontSize: 14,
                  color: nav === activeNav ? "#0f172a" : "#64748b",
                  fontWeight: nav === activeNav ? 700 : 400,
                  borderBottom: nav === activeNav ? "2px solid #0284c7" : "2px solid transparent",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{nav}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 8, padding: "7px 14px",
          }}>
            <span style={{ color: "#94a3b8", fontSize: 14 }}>🔍</span>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>Rechercher...</span>
          </div>
          <div style={{
            position: "relative",
            width: 36, height: 36, background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
            🔔
            <div style={{
              position: "absolute", top: 6, right: 6,
              width: 8, height: 8, background: "#ef4444",
              borderRadius: "50%", border: "2px solid white",
            }} />
          </div>
          <div style={{
            width: 36, height: 36, background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>⚙</div>
          <div style={{
            width: 36, height: 36, background: "#0f172a",
            borderRadius: 8, overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 14, fontWeight: 700,
            cursor: "pointer",
          }}>F</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "32px", maxWidth: 1300, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              background: "white", border: "1px solid #e2e8f0",
              borderRadius: 12, padding: "20px 24px",
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{
                width: 40, height: 40, background: "#f0f9ff",
                borderRadius: 10, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 16, flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: 0.3, marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", letterSpacing: -0.5 }}>
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24 }}>
          <div>
            {/* Section header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24,
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 4, height: 28, background: "#0284c7", borderRadius: 2 }} />
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: -0.7 }}>
                    Maquettage Professionnel
                  </h2>
                </div>
                <p style={{ fontSize: 13, color: "#94a3b8", paddingLeft: 14 }}>
                  Architecture logicielle de précision structurelle.
                </p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{
                  background: "white", border: "1.5px solid #e2e8f0",
                  borderRadius: 8, padding: "9px 18px", fontSize: 13,
                  fontWeight: 600, cursor: "pointer", color: "#0f172a",
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "'DM Sans', sans-serif",
                }}>⚖ Filtrer</button>
                <button style={{
                  background: "#0f172a", color: "white",
                  border: "none", borderRadius: 8, padding: "9px 18px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "'DM Sans', sans-serif",
                }}>+ Nouveau Projet</button>
              </div>
            </div>

            {/* Projects grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {/* New project card */}
              <div style={{
                border: "2px dashed #e2e8f0", borderRadius: 12,
                padding: 24, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer", minHeight: 160,
                gap: 12, background: "white",
              }}>
                <div style={{
                  width: 48, height: 48, background: "#0f172a",
                  borderRadius: 12, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 22, color: "white",
                }}>+</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                    Nouvelle Architecture
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Modèle vierge ou import</div>
                </div>
              </div>

              {/* Existing projects */}
              {PROJECTS.map(p => (
                <div key={p.id} style={{
                  background: "white", border: "1px solid #e2e8f0",
                  borderRadius: 12, overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s",
                  minHeight: 160,
                }}>
                  {/* Preview area */}
                  <div style={{ background: "#f8fafc", minHeight: 90 }}>
                    {p.preview === "grid" && <ProjectPreviewGrid />}
                    {p.preview === "single" && <ProjectPreviewSingle />}
                    {p.preview === "diamond" && <ProjectPreviewDiamond />}
                  </div>
                  {/* Info */}
                  <div style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                        {p.title}
                      </div>
                      <button style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "#94a3b8", fontSize: 16, padding: 0, lineHeight: 1,
                      }}>⋮</button>
                    </div>
                    <div style={{
                      fontSize: 10, color: "#94a3b8", fontWeight: 600,
                      letterSpacing: 0.5, marginBottom: 8,
                      fontFamily: "'DM Mono', monospace",
                    }}>{p.lastModif}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.tags.map((tag, i) => <TagBadge key={i} tag={tag} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Recent activity */}
            <div style={{
              background: "white", border: "1px solid #e2e8f0",
              borderRadius: 12, padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ color: "#f59e0b" }}>⚡</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Activité Récente</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: a.bg, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 12, flexShrink: 0,
                    }}>{a.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, color: "#0f172a", lineHeight: 1.5, marginBottom: 2 }}>{a.text}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{
                width: "100%", marginTop: 20,
                background: "white", border: "1.5px solid #e2e8f0",
                borderRadius: 7, padding: "9px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                color: "#0f172a", fontFamily: "'DM Sans', sans-serif",
                letterSpacing: 0.5,
              }}>VOIR TOUT LE LOG</button>
            </div>

            {/* Storage */}
            <div style={{
              background: "#0f172a",
              borderRadius: 12, padding: 24,
              color: "white",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>
                Stockage Enterprise
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.5, marginBottom: 4 }}>
                4.8 GB
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginBottom: 16 }}>
                Utilisé sur 20 GB disponibles
              </div>
              <div style={{
                height: 6, background: "#1e293b", borderRadius: 3, marginBottom: 20,
              }}>
                <div style={{
                  height: "100%", width: "24%",
                  background: "linear-gradient(90deg, #0284c7, #38bdf8)",
                  borderRadius: 3,
                }} />
              </div>
              <button style={{
                width: "100%", background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 7, padding: "10px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                color: "white", fontFamily: "'DM Sans', sans-serif",
                letterSpacing: 0.5,
              }}>OPTIMISER L'ESPACE</button>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div style={{
        position: "fixed", bottom: 32, right: 32,
        width: 48, height: 48, background: "#0f172a",
        borderRadius: 12, display: "flex", alignItems: "center",
        justifyContent: "center", color: "white", fontSize: 22,
        cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}>+</div>
    </div>
  );
}
