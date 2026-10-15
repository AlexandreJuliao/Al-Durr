// Regras do formulário de contacto, partilhadas pelo browser (ContactForm) e
// pelo servidor (/api/lead). Assim as duas validações não se afastam uma da outra.

// Campos que o formulário envia e que seguem tal e qual para o n8n.
export const LEAD_FIELDS = ["name", "email", "phone", "landStatus", "location", "model", "message"] as const;

export type LeadField = (typeof LEAD_FIELDS)[number];
export type LeadPayload = Record<LeadField, string>;

// Nome do campo-armadilha (honeypot). Fica escondido: só os robôs o preenchem.
export const HONEYPOT_FIELD = "website";

// Tamanhos máximos por campo. Folgados para quem escreve a sério, apertados para spam.
export const LEAD_MAX_LENGTH: Record<LeadField, number> = {
    name: 120,
    email: 254,
    phone: 40,
    landStatus: 40,
    location: 120,
    model: 40,
    message: 4000
};

// Têm de bater certo com as opções do ContactForm.
export const LEAD_MODELS = ["t1", "t2", "custom"] as const;
export const LEAD_LAND_STATUSES = ["tenho_terreno", "ajuda_procurar"] as const;

// Validação leve: só dígitos, espaços, +, (, ) e -, com pelo menos 9 dígitos.
// O valor segue tal como foi escrito; o n8n normaliza o número.
export const isValidPhone = (value: string) =>
    /^[\d\s()+-]+$/.test(value.trim()) && (value.match(/\d/g)?.length ?? 0) >= 9;

// A mesma regra que o browser aplica a um <input type="email"> (especificação HTML).
const EMAIL_PATTERN =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

// Confirma no servidor tudo o que o formulário exige no browser.
// Devolve os campos conhecidos (sem tocar nos valores) ou null se algo falhar.
export function parseLead(input: unknown): LeadPayload | null {
    if (!input || typeof input !== "object" || Array.isArray(input)) return null;
    const raw = input as Record<string, unknown>;

    const lead = {} as LeadPayload;
    for (const field of LEAD_FIELDS) {
        const value = raw[field] ?? "";
        if (typeof value !== "string" || value.length > LEAD_MAX_LENGTH[field]) return null;
        lead[field] = value;
    }

    if (!lead.name.trim()) return null;
    if (!isValidEmail(lead.email)) return null;
    if (!isValidPhone(lead.phone)) return null;
    if (!(LEAD_MODELS as readonly string[]).includes(lead.model)) return null;
    if (!(LEAD_LAND_STATUSES as readonly string[]).includes(lead.landStatus)) return null;

    return lead;
}
