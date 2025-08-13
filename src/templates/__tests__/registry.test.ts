import { describe, it, expect } from 'vitest';
import { templates, getTemplateById } from '../registry';

describe('Template Registry', () => {
  it('should have the supabase template', () => {
    expect(templates.supabase).toBeDefined();
    expect(templates.supabase.id).toBe('supabase');
    expect(templates.supabase.title).toBe('Supabase .env');
    expect(templates.supabase.description).toBe('Generate secure secrets for Supabase self-hosting.');
    expect(templates.supabase.version).toBe('1.0.0');
  });

  it('should have correct known keys for supabase template', () => {
    const supabaseTemplate = templates.supabase;
    expect(supabaseTemplate.knownKeys).toBeDefined();
    expect(Array.isArray(supabaseTemplate.knownKeys)).toBe(true);
    
    // Check that we have the expected keys
    const expectedKeys = [
      'POSTGRES_PASSWORD',
      'JWT_SECRET',
      'ANON_KEY',
      'SERVICE_ROLE_KEY',
      'DASHBOARD_PASSWORD',
      'SECRET_KEY_BASE',
      'VAULT_ENC_KEY',
      'LOGFLARE_PUBLIC_ACCESS_TOKEN',
      'LOGFLARE_PRIVATE_ACCESS_TOKEN',
      'SMTP_PASS',
      'POOLER_TENANT_ID'
    ];
    
    const actualKeys = supabaseTemplate.knownKeys.map(key => key.key);
    expectedKeys.forEach(key => {
      expect(actualKeys).toContain(key);
    });
  });

  it('should have proper UI options for supabase template', () => {
    const supabaseTemplate = templates.supabase;
    expect(supabaseTemplate.uiOptions).toBeDefined();
    expect(supabaseTemplate.uiOptions?.showUrlInput).toBe(true);
    expect(supabaseTemplate.uiOptions?.showPreserveToggle).toBe(true);
    expect(supabaseTemplate.uiOptions?.showJwtTtlControl).toBe(true);
  });

  it('should return undefined for non-existent template', () => {
    const result = getTemplateById('nonexistent');
    expect(result).toBeUndefined();
  });

  it('should return correct template by id', () => {
    const result = getTemplateById('supabase');
    expect(result).toBeDefined();
    expect(result?.id).toBe('supabase');
  });

  it('should have proper URL normalizer function', () => {
    const supabaseTemplate = templates.supabase;
    expect(supabaseTemplate.urlNormalizer).toBeDefined();
    expect(typeof supabaseTemplate.urlNormalizer).toBe('function');
  });

  it('should normalize GitHub blob URLs correctly', () => {
    const supabaseTemplate = templates.supabase;
    const blobUrl = 'https://github.com/owner/repo/blob/branch/path/.env.example';
    const expected = 'https://raw.githubusercontent.com/owner/repo/branch/path/.env.example';
    
    const result = supabaseTemplate.urlNormalizer?.(blobUrl);
    expect(result).toBe(expected);
  });

  it('should return raw URLs unchanged', () => {
    const supabaseTemplate = templates.supabase;
    const rawUrl = 'https://raw.githubusercontent.com/owner/repo/branch/path/.env.example';
    
    const result = supabaseTemplate.urlNormalizer?.(rawUrl);
    expect(result).toBe(rawUrl);
  });

  it('should reject non-GitHub URLs', () => {
    const supabaseTemplate = templates.supabase;
    const nonGithubUrl = 'https://gitlab.com/owner/repo/blob/branch/path/.env.example';
    
    const result = supabaseTemplate.urlNormalizer?.(nonGithubUrl);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('Only GitHub blob/raw URLs are supported.');
  });
});