import { useState, useEffect } from "react";

export default function ConnexionFacebook() {
  const [dots, setDots] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(d => (d + 1) % 4);
    }, 500);
    const rotInterval = setInterval(() => {
      setRotation(r => r + 6);
    }, 50);
    return () => {
      clearInterval(dotsInterval);
      clearInterval(rotInterval);
    };
  }, []);

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      background: "#eef2f7",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Main card */}
      <div style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: "48px 40px",
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        marginBottom: 24,
      }}>

        {/* Logo connection display */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 16, marginBottom: 36,
        }}>
          {/* UML Forge logo */}
          <div style={{
            width: 56, height: 56,
            border: "1.5px solid #e2e8f0",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            flexShrink: 0,
          }}>
            <div style={{
              width: 32, height: 32,
              border: "2px solid #0f172a",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 14,
            }}>⌘</div>
          </div>

          {/* Animated dots */}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: dots === i ? "#0284c7" : "#e2e8f0",
                transition: "background 0.2s",
                transform: dots === i ? "scale(1.3)" : "scale(1)",
              }} />
            ))}
          </div>

          {/* Facebook logo */}
          <div style={{
            width: 56, height: 56,
            background: "#1877F2",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(24,119,242,0.3)",
            flexShrink: 0,
          }}>
            <span style={{ color: "white", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>f</span>
          </div>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 22, fontWeight: 800, color: "#0f172a",
          textAlign: "center", letterSpacing: -0.5, marginBottom: 12,
        }}>
          Connexion à Facebook...
        </h2>
        <p style={{
          fontSize: 14, color: "#64748b", textAlign: "center",
          lineHeight: 1.7, marginBottom: 40,
        }}>
          Veuillez patienter pendant que nous synchronisons vos informations en toute sécurité avec UML Forge.
        </p>

        {/* Spinner */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", marginBottom: 40,
        }}>
          <div style={{
            width: 44, height: 44,
            border: "3px solid #f1f5f9",
            borderTopColor: "#0284c7",
            borderRadius: "50%",
            transform: `rotate(${rotation}deg)`,
            marginBottom: 16,
          }} />
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#94a3b8",
            letterSpacing: 2, fontFamily: "'DM Mono', monospace",
          }}>ÉTABLISSEMENT DU PONT SÉCURISÉ</span>
        </div>

        {/* Privacy notice */}
        <div style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "16px 20px",
          marginBottom: 36,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 16, color: "#64748b", flexShrink: 0, marginTop: 1 }}>🛡</span>
          <div>
            <p style={{
              fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 6,
            }}>Confidentialité des données</p>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
              UML Forge demande uniquement l'accès à votre profil public et votre adresse e-mail. Nous ne publierons jamais sur Facebook sans votre accord.
            </p>
          </div>
        </div>

        {/* Cancel button */}
        <button style={{
          width: "100%", background: "white", color: "#0f172a",
          border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "14px",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 20,
          transition: "background 0.2s",
        }}>
          Annuler
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8" }}>
          C'est trop long ?{" "}
          <a href="#" style={{ color: "#0284c7", textDecoration: "none", fontWeight: 600 }}>
            Essayer une autre méthode
          </a>
        </p>
      </div>

      {/* Bottom attribution */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 20, height: 20, border: "1.5px solid #94a3b8",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9,
        }}>⌘</div>
        <span style={{
          fontSize: 12, color: "#94a3b8", fontWeight: 700,
          letterSpacing: 1.5, fontFamily: "'DM Mono', monospace",
        }}>UML FORGE</span>
        <span style={{ color: "#cbd5e1", fontSize: 12 }}>•</span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Service d'Authentification Sécurisé</span>
      </div>
    </div>
  );
}
