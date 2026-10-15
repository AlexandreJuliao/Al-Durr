// Recebe o formulário de contacto e passa-o ao n8n ("Al Durr — Leads Website").
//
// Antes o browser falava direto com o webhook do n8n, cujo endereço ficava
// público no JavaScript do site. Agora o endereço só existe no servidor, e
// aqui confirma-se o pedido (tamanho, campos, armadilha para robôs) antes de
// chegar ao CRM. O n8n recebe exatamente os mesmos campos de sempre.

import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { HONEYPOT_FIELD, parseLead } from "@/lib/lead";

export const runtime = "nodejs";
export const maxDuration = 30;

// O formulário envia menos de 5 KB; acima disto não é uma pessoa a escrever.
const MAX_BODY_BYTES = 20 * 1024;
const N8N_TIMEOUT_MS = 10_000;

const GENERIC_ERROR = "Não foi possível enviar o pedido. Tente novamente ou contacte-nos diretamente.";

const fail = (status: number, message = GENERIC_ERROR) =>
    NextResponse.json({ ok: false, error: message }, { status });

function report(error: unknown, motivo: string) {
    console.error(`[api/lead] ${motivo}`, error);
    Sentry.captureException(error, { tags: { rota: "api/lead", motivo } });
}

export async function POST(request: Request) {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
        return fail(415, "Pedido inválido.");
    }

    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_BODY_BYTES) return fail(413, "Pedido demasiado grande.");

    let body: unknown;
    try {
        const text = await request.text();
        if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) return fail(413, "Pedido demasiado grande.");
        body = JSON.parse(text);
    } catch {
        return fail(400, "Pedido inválido.");
    }

    // Armadilha preenchida = robô. Responde como se tivesse corrido bem e não envia nada.
    const honeypot = (body as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
        return NextResponse.json({ ok: true });
    }

    const lead = parseLead(body);
    if (!lead) return fail(400, "Verifique os dados do formulário.");

    // N8N_WEBHOOK_URL é a variável certa (só servidor). A pública fica como
    // recurso enquanto a nova não estiver criada na Vercel.
    const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl || webhookUrl.includes("SEU-N8N-URL")) {
        report(new Error("Webhook do n8n não configurado"), "configuracao");
        return fail(500);
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const secret = process.env.N8N_WEBHOOK_SECRET;
    if (secret) headers["x-aldurr-secret"] = secret;

    try {
        const res = await fetch(webhookUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(lead),
            signal: AbortSignal.timeout(N8N_TIMEOUT_MS),
            cache: "no-store"
        });
        if (!res.ok) {
            report(new Error(`n8n respondeu ${res.status}`), "n8n");
            return fail(502);
        }
    } catch (error) {
        // Só o nome e a mensagem do erro, sem o endereço do webhook (é segredo).
        const name = error instanceof Error ? error.name : "Error";
        const message = (error instanceof Error ? error.message : String(error)).split(webhookUrl).join("<webhook>");
        report(new Error(`Falha a contactar o n8n (${name}): ${message}`), "n8n");
        return fail(502);
    }

    return NextResponse.json({ ok: true });
}
