// Template Registry for .env generators
export interface TemplateMeta {
  id: string;
  title: string;
  description: string;
  version: string;
  keywords: string[];
  match?: (content: string) => boolean | number;
  urlNormalizer?: (url: string) => string | Error;
  knownKeys: Array<{
    key: string;
    label: string;
    tooltip?: string;
    mask?: boolean;
  }>;
  uiOptions?: {
    showUrlInput?: boolean;
    showPreserveToggle?: boolean;
    showJwtTtlControl?: boolean;
  };
}

export const templates: Record<string, TemplateMeta> = {
  supabase: {
    id: "supabase",
    title: "Supabase .env",
    description: "Generate secure secrets for Supabase self-hosting.",
    version: "1.0.0",
    keywords: ["supabase", "postgres", "jwt"],
    urlNormalizer: (url) => {
      // If it's already a raw GitHub URL, return it unchanged
      if (/^https:\/\/raw\.githubusercontent\.com\//.test(url)) {
        return url;
      }
      
      // If it's a GitHub blob URL, normalize it
      if (/^https:\/\/github\.com\/.+\/.+\/blob\//.test(url)) {
        return url.replace(
          /^https:\/\/github\.com\/(.+?)\/(.+?)\/blob\/(.+?)\/(.+)$/, 
          "https://raw.githubusercontent.com/$1/$2/$3/$4"
        );
      }
      
      // Otherwise, reject it
      return new Error("Only GitHub blob/raw URLs are supported.");
    },
    knownKeys: [
      { key: "POSTGRES_PASSWORD", label: "Postgres Password", mask: true, tooltip: "32–64 chars, A–Z, a–z, 0–9, special chars allowed. Default length: 40." },
      { key: "JWT_SECRET", label: "JWT Secret", mask: true, tooltip: "Min 32 chars; use 32–64 random bytes; encode base64url (no padding). Default length: 48 bytes -> base64url." },
      { key: "ANON_KEY", label: "Anon Key", mask: true, tooltip: "HS256 JWT signed with JWT_SECRET; payload: { role: \"anon\", iss: \"supabase-demo\", iat: now, exp: now+5y }." },
      { key: "SERVICE_ROLE_KEY", label: "Service Role Key", mask: true, tooltip: "HS256 JWT signed with JWT_SECRET; payload: { role: \"service_role\", iss: \"supabase-demo\", iat, exp } similar to ANON_KEY." },
      { key: "DASHBOARD_PASSWORD", label: "Dashboard Password", mask: true, tooltip: "20–32 chars; mixed set; default 24." },
      { key: "SECRET_KEY_BASE", label: "Secret Key Base", mask: true, tooltip: "64 random bytes, hex-encoded (128 hex chars) or base64url; default: 128 hex chars." },
      { key: "VAULT_ENC_KEY", label: "Vault Encryption Key", mask: true, tooltip: "Minimum 32 chars; default: 32 random bytes base64url." },
      { key: "LOGFLARE_PUBLIC_ACCESS_TOKEN", label: "Logflare Public Token", mask: true, tooltip: "32–64 chars; default 48; ensure it differs from the private token." },
      { key: "LOGFLARE_PRIVATE_ACCESS_TOKEN", label: "Logflare Private Token", mask: true, tooltip: "32–64 chars; default 48; differs from public token." },
      { key: "SMTP_PASS", label: "SMTP Password", mask: true, tooltip: "20–32 chars; default 24. Only if SMTP configuration exists; otherwise leave untouched." },
      { key: "POOLER_TENANT_ID", label: "Pooler Tenant ID", mask: false, tooltip: "UUID v4." }
    ],
    uiOptions: {
      showUrlInput: true,
      showPreserveToggle: true,
      showJwtTtlControl: true,
    }
  }
  // Additional templates can be added here
};

export function getTemplateById(id: string): TemplateMeta | undefined {
  return templates[id];
}
