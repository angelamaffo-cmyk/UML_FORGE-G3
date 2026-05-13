import { useState } from "react";

const SQL_LINES = [
  { n: 1, content: "-- SQL Généré par UML Forge", comment: true },
  { n: 2, content: 'CREATE TABLE "users" (', keyword: true },
  { n: 3, content: '    "id" SERIAL PRIMARY KEY,', pk: true },
  { n: 4, content: '    "username" VARCHAR(255) UNIQUE NOT NULL,', unique: true },
  { n: 5, content: '    "email" VARCHAR(255) NOT NULL,', notnull: true },
  { n: 6, content: '    "created_at" TIMESTAMP DEFAULT NOW()', fn: true },
  { n: 7, content: ');', keyword: true },
  { n: 8, content: "" },
  { n: 9, content: 'CREATE TABLE "orders" (', keyword: true },
  { n: 10, content: '    "id" UUID PRIMARY KEY,', pk: true },
  { n: 11, content: '    "user_id" INTEGER REFERENCES "users"("id"),', fk: true },
  { n: 12, content: '    "total_amount" DECIMAL(10, 2),', num: true },
  { n: 13, content: '    "status" VARCHAR(50)', str: true },
  { n: 14, content: ");", keyword: true },
];

function sqlTokenColor(line) {
  if (line.comment) return "#475569";
  if (line.pk) return "#7dd3fc";
  if (line.unique) return "#f9a8d4";
  if (line.fk) return "#7dd3fc";
  if (line.notnull) return "#e2e8f0";
  if (line.fn) return "#a5f3fc";
  if (line.num) return "#fde68a";
  if (line.str) return "#e2e8f0";
  if (line.keyword) return "#94a3b8";
  return "#cbd5e1";
}

const CLASSES = ["User", "Order", "Product"];
const RELATIONS = ["User 1 — * Order"];

export default function ExportSQL() {
  const [selectedDb, setSelectedDb] = useState("postgresql");
  const [naming, setNaming] = useState("snake_case (Défaut)");
  const [includeFk, setIncludeFk] = useState(true);
  const [includeComments, setIncludeComments] = useState(true);
  const [dropIfExists, setDropIfExists] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeClass, setActiveClass] = useState("User");

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

      {/* Topbar */}
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
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10,
          }}>⌘</div>
          {["Tableau de bord", "Projets", "Documentation", "Exportation"].map(nav => (
            <button key={nav} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, padding: "4px 0",
              color: nav === "Exportation" ? "#0f172a" : "#64748b",
              fontWeight: nav === "Exportation" ? 700 : 400,
              borderBottom: nav === "Exportation" ? "2px solid #0284c7" : "2px solid transparent",
              fontFamily: "'DM Sans', sans-serif",
            }}>{nav}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={{
            width: 32, height: 32, background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer",
          }}>⚙</button>
          <button style={{
            width: 32, height: 32, background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer",
          }}>🔔</button>
          <div style={{
            width: 32, height: 32, background: "#0f172a",
            borderRadius: 8, display: "flex", alignItems: "center",
            justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700,
          }}>F</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left sidebar */}
        <div style={{
          width: 220,
          background: "white",
          borderRight: "1px solid #e2e8f0",
          padding: "20px 0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
          <div style={{ padding: "0 16px 16px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>
              ESPACE DE TRAVAIL
            </div>
            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>Classes Détectées (3)</div>
          </div>

          <div style={{ padding: "12px 8px", flex: 1 }}>
            {CLASSES.map(cls => (
              <button
                key={cls}
                onClick={() => setActiveClass(cls)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 8, border: "none",
                  background: activeClass === cls ? "#0f172a" : "transparent",
                  color: activeClass === cls ? "white" : "#475569",
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                  marginBottom: 2, fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{
                  width: 20, height: 20,
                  border: activeClass === cls ? "1.5px solid rgba(255,255,255,0.3)" : "1.5px solid #e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, borderRadius: 4,
                }}>◻</span>
                {cls}
              </button>
            ))}

            <div style={{ padding: "12px 12px 8px", marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>
                RELATIONS
              </div>
              {RELATIONS.map(r => (
                <div key={r} style={{
                  fontSize: 12, color: "#64748b",
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 0",
                }}>
                  <span style={{ fontSize: 14 }}>🔗</span> {r}
                </div>
              ))}
            </div>
          </div>

          {/* Re-analyze */}
          <div style={{ padding: "12px 12px", borderTop: "1px solid #f1f5f9" }}>
            <button style={{
              width: "100%", background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: 8, padding: "10px",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              color: "#475569", fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>⟳ RÉ-ANALYSER LE MODÈLE</button>
          </div>

          {/* Status bar */}
          <div style={{
            padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 10, color: "#64748b" }}>SYSTÈME EN LIGNE</span>
            <span style={{ color: "#e2e8f0" }}>·</span>
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>UTF-8 | SQL:2016</span>
          </div>
        </div>

        {/* Code editor */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tab bar */}
          <div style={{
            background: "white", borderBottom: "1px solid #e2e8f0",
            padding: "0 20px", height: 44,
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              borderBottom: "2px solid #0f172a", paddingBottom: 2,
              height: "100%", alignItems: "center",
            }}>
              <span style={{ fontSize: 14 }}>📄</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", fontFamily: "'DM Mono', monospace" }}>
                schema_export.sql
              </span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", fontFamily: "'DM Mono', monospace" }}>
                SYNTAXE PRÊTE
              </span>
            </div>
          </div>

          {/* Code area */}
          <div style={{
            flex: 1,
            background: "#0d1117",
            overflow: "auto",
            padding: "24px 0",
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            lineHeight: 1.9,
          }}>
            {SQL_LINES.map(line => (
              <div key={line.n} style={{
                display: "flex", gap: 0,
                paddingRight: 24,
              }}>
                <span style={{
                  color: "#2d3748", fontSize: 12,
                  userSelect: "none", minWidth: 48,
                  textAlign: "right", paddingRight: 20,
                  paddingLeft: 12,
                  flexShrink: 0,
                }}>{line.n}</span>
                <span style={{ color: sqlTokenColor(line) }}>{line.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          width: 290,
          background: "white",
          borderLeft: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflow: "auto",
          padding: "20px",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 24,
          }}>
            <span style={{ fontSize: 16 }}>⚙</span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Paramètres d'exportation</h3>
          </div>

          {/* DB Target */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8",
              letterSpacing: 0.8, marginBottom: 12, fontFamily: "'DM Mono', monospace",
            }}>BASE DE DONNÉES CIBLE</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { id: "postgresql", label: "PostgreSQL", icon: "🐘" },
                { id: "mysql", label: "MySQL", icon: "🐬" },
              ].map(db => (
                <button
                  key={db.id}
                  onClick={() => setSelectedDb(db.id)}
                  style={{
                    flex: 1, padding: "14px 8px",
                    border: selectedDb === db.id ? "2px solid #0284c7" : "1.5px solid #e2e8f0",
                    borderRadius: 10, background: selectedDb === db.id ? "#f0f9ff" : "white",
                    cursor: "pointer", textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{db.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: selectedDb === db.id ? "#0284c7" : "#0f172a" }}>
                    {db.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Naming convention */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8",
              letterSpacing: 0.8, marginBottom: 8, fontFamily: "'DM Mono', monospace",
            }}>CONVENTION DE NOMMAGE</label>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "10px 14px",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: 13, color: "#0f172a" }}>{naming}</span>
              <span style={{ color: "#94a3b8" }}>▾</span>
            </div>
          </div>

          {/* Options */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8",
              letterSpacing: 0.8, marginBottom: 12, fontFamily: "'DM Mono', monospace",
            }}>OPTIONS DE GÉNÉRATION</label>
            {[
              { label: "Inclure les clés étrangères", value: includeFk, set: setIncludeFk },
              { label: "Générer les commentaires", value: includeComments, set: setIncludeComments },
              { label: "DROP TABLE IF EXISTS", value: dropIfExists, set: setDropIfExists },
            ].map(opt => (
              <label key={opt.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 12, cursor: "pointer",
              }}>
                <input
                  type="checkbox"
                  checked={opt.value}
                  onChange={e => opt.set(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#0284c7" }}
                />
                <span style={{ fontSize: 13, color: "#0f172a" }}>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Actions */}
          <button
            onClick={handleCopy}
            style={{
              width: "100%", background: "#0f172a", color: "white",
              border: "none", borderRadius: 8, padding: "13px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 12, transition: "background 0.2s",
            }}
          >
            {copied ? "✓ Copié !" : "⧉ Copier dans le presse-papier"}
          </button>
          <button style={{
            width: "100%", background: "white", color: "#0f172a",
            border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "13px",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            marginBottom: 20,
          }}>
            ⬇ Télécharger .sql
          </button>

          {/* Production ready badge */}
          <div style={{
            background: "#0f172a",
            borderRadius: 12,
            padding: "24px 20px",
            textAlign: "center",
          }}>
            <div style={{
              width: 44, height: 44, background: "rgba(34,197,94,0.15)",
              borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 18, margin: "0 auto 12px",
              border: "1.5px solid rgba(34,197,94,0.3)",
            }}>✓</div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#22c55e",
              letterSpacing: 1.5, fontFamily: "'DM Mono', monospace",
            }}>PRÊT POUR PRODUCTION</div>
          </div>
        </div>
      </div>
    </div>
  );
}
