import { describe, it, expect } from 'vitest';
import { templates } from '../registry';

describe('supabase urlNormalizer', () => {
  const normalizer = templates.supabase.urlNormalizer;
  
  it('rewrites GitHub blob URL to raw', () => {
    const blobUrl = 'https://github.com/owner/repo/blob/branch/path/.env.example';
    const expected = 'https://raw.githubusercontent.com/owner/repo/branch/path/.env.example';
    expect(normalizer(blobUrl)).toBe(expected);
  });
  
  it('returns raw URL unchanged', () => {
    const rawUrl = 'https://raw.githubusercontent.com/owner/repo/branch/path/.env.example';
    expect(normalizer(rawUrl)).toBe(rawUrl);
  });
  
  it('rejects non-GitHub URLs', () => {
    const nonGithubUrl = 'https://gitlab.com/owner/repo/blob/branch/path/.env.example';
    const result = normalizer(nonGithubUrl);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('Only GitHub blob/raw URLs are supported.');
  });
  
  it('handles complex GitHub URLs', () => {
    const complexBlobUrl = 'https://github.com/very-long-org-name/very-long-repo-name/blob/feature/branch-with-special-chars/path/to/file.env';
    const expected = 'https://raw.githubusercontent.com/very-long-org-name/very-long-repo-name/feature/branch-with-special-chars/path/to/file.env';
    expect(normalizer(complexBlobUrl)).toBe(expected);
  });
});
