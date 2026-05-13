import { useState } from "react";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) setSent(true);
  };

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
            fontSize: 12,
          }}>⌘</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>UML FORGE</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Documentation</a>
          <a href="#" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Communauté</a>
          <a href="#" style={{ fontSize: 14, color: "#0f172a", textDecoration: "none", fontWeight: 600 }}>Connexion</a>
        </div>
      </div>

      {/* Main */}
      <div style={{
        flex: 1, display: "flex", alignItems: "flex-start",
        justifyContent: "center", paddingTop: 80, paddingBottom: 40, paddingLeft: 24, paddingRight: 24,
      }}>
        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* Main card */}
          <div style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "48px 44px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            marginBottom: 20,
          }}>
            {!sent ? (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h1 style={{
                    fontSize: 32, fontWeight: 800, color: "#0f172a",
                    letterSpacing: -1, marginBottom: 16, lineHeight: 1.15,
                  }}>Mot de passe<br />oublié ?</h1>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>
                    Saisissez l'adresse e-mail associée à votre compte UML Forge. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
                  </p>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{
                    display: "block", fontSize: 11, fontWeight: 700,
                    color: "#0f172a", letterSpacing: 0.5, marginBottom: 8,
                    textTransform: "uppercase",
                  }}>Adresse E-mail Professionnelle</label>
                  <div style={{
                    display: "flex", alignItems: "center",
                    border: "1.5px solid #e2e8f0", borderRadius: 8,
                    padding: "0 14px", gap: 10,
                    background: "white",
                  }}>
                    <span style={{ color: "#94a3b8", fontSize: 14 }}>✉</span>
                    <input
                      type="email"
                      placeholder="ingenieur@entreprise.fr"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      style={{
                        flex: 1, border: "none", outline: "none",
                        padding: "14px 0", fontSize: 14, color: "#0f172a",
                        background: "transparent", fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  style={{
                    width: "100%", background: "#0f172a", color: "white",
                    border: "none", borderRadius: 8, padding: "15px",
                    fontSize: 15, fontWeight: 700, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 24,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}>
                  Envoyer le lien →
                </button>

                <div style={{ height: 1, background: "#f1f5f9", marginBottom: 20 }} />

                <div style={{ textAlign: "center" }}>
                  <a href="#" style={{
                    fontSize: 14, color: "#0284c7",
                    textDecoration: "none", fontWeight: 600,
                  }}>‹ Retour à la connexion</a>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, background: "#f0fdf4",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 28, margin: "0 auto 24px",
                }}>✉</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>
                  E-mail envoyé !
                </h2>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 32 }}>
                  Si un compte est associé à <strong>{email}</strong>, vous recevrez un lien de réinitialisation dans quelques minutes.
                </p>
                <a href="#" style={{
                  fontSize: 14, color: "#0284c7",
                  textDecoration: "none", fontWeight: 600,
                }}>‹ Retour à la connexion</a>
              </div>
            )}
          </div>

          {/* Security note */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: "20px 24px",
            display: "flex", gap: 14,
          }}>
            <div style={{
              width: 32, height: 32, background: "#f1f5f9",
              borderRadius: 8, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 14, flexShrink: 0,
            }}>🛡</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                Note de sécurité
              </p>
              <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
                Si un compte existe pour cet e-mail, vous recevrez un lien de réinitialisation d'ici quelques minutes. Vérifiez votre dossier indésirables.
              </p>
            </div>
          </div>
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
        <p style={{ fontSize: 12, color: "#94a3b8" }}>
          © 2026 UML Forge. Conçu pour la précision structurelle.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Confidentialité", "Conditions", "Documentation API", "État du service"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
