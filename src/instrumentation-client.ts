// Sentry no browser: apanha o que rebenta a quem visita o site.
//
// Fica desligado enquanto não houver NEXT_PUBLIC_SENTRY_DSN na Vercel, por isso
// este código pode entrar antes de o projeto do Sentry existir.
//
// O site só envia erros (sem tracing nem gravações) e ignora o ruído habitual
// de extensões e redes móveis. A quota do Sentry é partilhada por todos os
// projetos da Pardus.

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: Boolean(dsn) && process.env.NODE_ENV === "production",
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
  tracesSampleRate: 0,
  sendDefaultPii: false,
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    "Non-Error promise rejection captured",
    "Failed to fetch",
    "NetworkError when attempting to fetch resource",
    "Load failed",
  ],
  denyUrls: [/extensions\//i, /^chrome:\/\//i, /^moz-extension:\/\//i, /connect\.facebook\.net/i],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
