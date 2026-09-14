// Sentry no servidor (Node e Edge). Desligado sem NEXT_PUBLIC_SENTRY_DSN.

import * as Sentry from "@sentry/nextjs";

export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    enabled: process.env.NODE_ENV === "production",
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    tracesSampleRate: 0,
    sendDefaultPii: false,
  });
}

// Erros das páginas e das rotas renderizadas no servidor.
export const onRequestError = Sentry.captureRequestError;
