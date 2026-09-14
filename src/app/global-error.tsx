"use client";

// Último recurso quando a página rebenta de forma que o layout não aguenta.
// Manda o erro para o Sentry e mostra uma saída limpa em vez de um ecrã branco.

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b0c", color: "#f2efe9", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ textAlign: "center", padding: 24 }}>
          <p style={{ fontSize: 20, marginBottom: 8 }}>Algo correu mal a carregar esta página.</p>
          <p style={{ opacity: 0.7, marginBottom: 24 }}>Já fomos avisados. Tente outra vez daqui a nada.</p>
          <button onClick={reset} style={{ padding: "10px 20px", border: "1px solid rgba(242,239,233,0.3)", background: "transparent", color: "inherit", borderRadius: 4, cursor: "pointer" }}>
            Tentar outra vez
          </button>
          <p style={{ marginTop: 16 }}>
            <a href="/contactos" style={{ color: "inherit" }}>Contactos</a>
          </p>
        </main>
      </body>
    </html>
  );
}
