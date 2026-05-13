import { useState } from "react";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      height: "100vh",
      background: "white",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* LEFT PANEL */}
      <div style={{
        flex: "0 0 55%",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 70px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 60 }}>
          <div style={{
            width: 36, height: 36,
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: "white",
          }}>⌘</div>
        </div>

        {/* Headline */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 56 }}>
          <h1 style={{
            fontSize: 38, fontWeight: 800, color: "white",
            lineHeight: 1.2, letterSpacing: -1.5, marginBottom: 20,
          }}>
            L'ingénierie logicielle<br />avec une précision<br />chirurgicale.
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 380 }}>
            Concevez des architectures complexes avec notre moteur de rendu haute performance. Une interface pensée par des ingénieurs, pour des ingénieurs.
          </p>
        </div>

        {/* Diagram mockup */}
        <div style={{
          position: "relative", zIndex: 1,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12, padding: 28,
          maxWidth: 420,
        }}>
          {/* Two UML boxes connected */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              flex: 1, border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8, padding: 16, background: "rgba(255,255,255,0.03)",
            }}>
              <div style={{ height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 4, marginBottom: 8, width: "70%" }} />
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, marginBottom: 5, width: "90%" }} />
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, marginBottom: 5, width: "75%" }} />
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, width: "60%" }} />
              <div style={{ marginTop: 12, height: 4, background: "#0284c7", borderRadius: 2, width: "50%" }} />
            </div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>→</div>
            <div style={{
              flex: 0.7, border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8, padding: 16, background: "rgba(255,255,255,0.03)",
            }}>
              <div style={{ height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 4, marginBottom: 8, width: "80%" }} />
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, marginBottom: 5 }} />
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, width: "70%" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                flex: 1, height: 48, borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 70px",
        background: "white",
      }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 380 }}>
          <h2 style={{
            fontSize: 28, fontWeight: 800, color: "#0f172a",
            letterSpacing: -0.8, marginBottom: 8,
          }}>Bienvenue</h2>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 40 }}>
            Connectez-vous à votre espace de travail professionnel.
          </p>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: "#0f172a", letterSpacing: 0.5, marginBottom: 8,
              textTransform: "uppercase",
            }}>Adresse Email</label>
            <div style={{
              display: "flex", alignItems: "center",
              border: "1.5px solid #e2e8f0", borderRadius: 8,
              padding: "0 14px", gap: 10,
              transition: "border-color 0.2s",
            }}>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>✉</span>
              <input
                type="email"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, border: "none", outline: "none",
                  padding: "14px 0", fontSize: 14, color: "#0f172a",
                  background: "transparent", fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <label style={{
                fontSize: 11, fontWeight: 700, color: "#0f172a",
                letterSpacing: 0.5, textTransform: "uppercase",
              }}>Mot de passe</label>
              <a href="#" style={{ fontSize: 12, color: "#0284c7", textDecoration: "none", fontWeight: 600 }}>
                MOT DE PASSE OUBLIÉ ?
              </a>
            </div>
            <div style={{
              display: "flex", alignItems: "center",
              border: "1.5px solid #e2e8f0", borderRadius: 8,
              padding: "0 14px", gap: 10,
            }}>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  flex: 1, border: "none", outline: "none",
                  padding: "14px 0", fontSize: 14, color: "#0f172a",
                  background: "transparent", fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button style={{
            width: "100%", background: "#0f172a", color: "white",
            border: "none", borderRadius: 8, padding: "15px",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            letterSpacing: 0.5, fontFamily: "'DM Sans', sans-serif",
            marginBottom: 28,
          }}>
            SE CONNECTER →
          </button>

          {/* Divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
          }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>OU CONTINUER AVEC</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* Facebook */}
          <button style={{
            width: "100%", background: "white", color: "#0f172a",
            border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "13px",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            fontFamily: "'DM Sans', sans-serif", marginBottom: 32,
          }}>
            <div style={{
              width: 20, height: 20, background: "#1877F2",
              borderRadius: 4, display: "flex", alignItems: "center",
              justifyContent: "center", color: "white", fontSize: 12, fontWeight: 900,
            }}>f</div>
            Facebook
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#64748b" }}>
            Pas encore de compte ?{" "}
            <a href="#" style={{ color: "#0284c7", textDecoration: "none", fontWeight: 600 }}>
              S'inscrire gratuitement
            </a>
          </p>
        </div>

        {/* Footer links */}
        <div style={{
          display: "flex", gap: 24, justifyContent: "center",
          borderTop: "1px solid #f1f5f9", paddingTop: 24,
        }}>
          {["SÉCURITÉ", "CONFIDENTIALITÉ", "CONDITIONS"].map(l => (
            <a key={l} href="#" style={{
              fontSize: 11, color: "#94a3b8", textDecoration: "none",
              fontWeight: 600, letterSpacing: 0.5,
            }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
