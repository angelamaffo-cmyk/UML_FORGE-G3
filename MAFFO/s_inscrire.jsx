import { useState } from "react";

export default function SInscrire() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const strength = password.length === 0 ? 0
    : password.length < 8 ? 1
    : password.length < 12 ? 2
    : /[!@#$%^&*]/.test(password) && /[0-9]/.test(password) ? 4
    : 3;

  const strengthColors = ["#e2e8f0", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  const strengthLabels = ["", "Trop court", "Faible", "Moyen", "Fort"];

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
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 60px",
        background: "white",
        borderBottom: "1px solid #f1f5f9",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, border: "2px solid #0f172a",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700,
          }}>⌘</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>UML FORGE</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a href="#" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Documentation</a>
          <button style={{
            background: "white", border: "1.5px solid #e2e8f0",
            borderRadius: 7, padding: "8px 20px", fontSize: 14,
            fontWeight: 600, cursor: "pointer", color: "#0f172a",
            fontFamily: "'DM Sans', sans-serif",
          }}>Connexion</button>
        </div>
      </div>

      {/* Main */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "60px 24px",
      }}>
        <div style={{
          background: "white",
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          padding: "48px 48px",
          width: "100%",
          maxWidth: 460,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{
              fontSize: 30, fontWeight: 800, color: "#0f172a",
              letterSpacing: -1, marginBottom: 8,
            }}>S'inscrire</h1>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
              Rejoignez le standard professionnel de la modélisation de systèmes structurels.
            </p>
          </div>

          {/* Nom */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: "#0f172a", letterSpacing: 0.5, marginBottom: 8,
              textTransform: "uppercase",
            }}>Nom Complet</label>
            <input
              type="text"
              placeholder="Franck Keudem"
              value={nom}
              onChange={e => setNom(e.target.value)}
              style={{
                width: "100%", border: "1.5px solid #e2e8f0",
                borderRadius: 8, padding: "13px 16px",
                fontSize: 14, color: "#0f172a", outline: "none",
                fontFamily: "'DM Sans', sans-serif",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: "#0f172a", letterSpacing: 0.5, marginBottom: 8,
              textTransform: "uppercase",
            }}>E-mail Professionnel</label>
            <input
              type="email"
              placeholder="nom@entreprise.fr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%", border: "1.5px solid #e2e8f0",
                borderRadius: 8, padding: "13px 16px",
                fontSize: 14, color: "#0f172a", outline: "none",
                fontFamily: "'DM Sans', sans-serif",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: "#0f172a", letterSpacing: 0.5, marginBottom: 8,
              textTransform: "uppercase",
            }}>Mot de passe</label>
            <div style={{
              display: "flex", alignItems: "center",
              border: "1.5px solid #e2e8f0", borderRadius: 8,
              padding: "0 14px", gap: 10,
            }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  flex: 1, border: "none", outline: "none",
                  padding: "13px 0", fontSize: 14, color: "#0f172a",
                  background: "transparent", fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94a3b8", fontSize: 16, padding: 0,
                }}>👁</button>
            </div>
            {/* Strength indicator */}
            {password.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{
                      flex: 1, height: 3, borderRadius: 2,
                      background: i <= strength ? strengthColors[strength] : "#e2e8f0",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: strengthColors[strength], fontWeight: 600 }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
            <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
              MIN. 12 CARACT., 1 SPÉCIAL, 1 CHIFFRE
            </p>
          </div>

          {/* CTA */}
          <button style={{
            width: "100%", background: "#0f172a", color: "white",
            border: "none", borderRadius: 8, padding: "15px",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 24,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            Initialiser l'Espace de Travail →
          </button>

          {/* Divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 16,
          }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, letterSpacing: 0.5 }}>INTÉGRATIONS</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* Facebook */}
          <button style={{
            width: "100%", background: "white", color: "#0f172a",
            border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "13px",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            fontFamily: "'DM Sans', sans-serif", marginBottom: 24,
          }}>
            <div style={{
              width: 20, height: 20, background: "#1877F2",
              borderRadius: 4, display: "flex", alignItems: "center",
              justifyContent: "center", color: "white", fontSize: 12, fontWeight: 900,
            }}>f</div>
            S'inscrire avec Facebook
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#64748b" }}>
            Vous avez déjà une instance active ?{" "}
            <a href="#" style={{ color: "#0284c7", textDecoration: "none", fontWeight: 600 }}>
              Se connecter
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "white",
        borderTop: "1px solid #f1f5f9",
        padding: "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>UML Forge</div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>© 2026 UML Forge. Conçu pour la précision structurelle.</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Confidentialité", "Conditions", "Documentation API", "État du système"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
