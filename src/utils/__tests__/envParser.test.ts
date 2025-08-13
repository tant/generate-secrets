import { describe, it, expect } from 'vitest';
import { parseEnv, renderEnv } from '../envParser';

describe('envParser', () => {
  it('roundtrips comments, blank lines, and pairs', () => {
    const input = '# Comment\nPOSTGRES_PASSWORD=secret\n\n# Another\nFOO=bar # inline\n';
    const nodes = parseEnv(input);
    expect(nodes).toEqual([
      { type: 'comment', value: '# Comment', raw: '# Comment\n' },
      { type: 'pair', key: 'POSTGRES_PASSWORD', value: 'secret', raw: 'POSTGRES_PASSWORD=secret\n', sep: '=', quoted: false, inlineComment: undefined, duplicate: false },
      { type: 'blank', raw: '\n' },
      { type: 'comment', value: '# Another', raw: '# Another\n' },
      { type: 'pair', key: 'FOO', value: 'bar', raw: 'FOO=bar # inline\n', sep: '=', quoted: false, inlineComment: 'inline', duplicate: false },
      { type: 'blank', raw: '' },
    ]);
    expect(renderEnv(nodes)).toBe(input);
  });

  it('detects duplicate keys', () => {
    const input = `A=1
A=2
`;
    const nodes = parseEnv(input);
    expect(nodes[0]).toMatchObject({ type: 'pair', key: 'A', duplicate: false });
    expect(nodes[1]).toMatchObject({ type: 'pair', key: 'A', duplicate: true });
  });

  it('preserves malformed lines', () => {
    const input = `not_a_pair
=missingkey
`;
    const nodes = parseEnv(input);
    expect(nodes[0]).toMatchObject({ type: 'malformed' });
    expect(nodes[1]).toMatchObject({ type: 'malformed' });
    expect(renderEnv(nodes)).toBe(input);
  });

  it('handles quoted values and equals', () => {
    const input = `FOO="bar=baz"
BAR='qux=quux'
`;
    const nodes = parseEnv(input);
    expect(nodes[0]).toMatchObject({ type: 'pair', key: 'FOO', value: '"bar=baz"', quoted: true });
    expect(nodes[1]).toMatchObject({ type: 'pair', key: 'BAR', value: "'qux=quux'", quoted: true });
    expect(renderEnv(nodes)).toBe(input);
  });

  it('handles Windows CRLF line endings', () => {
    const input = '# Comment\r\nPOSTGRES_PASSWORD=secret\r\n\r\n';
    const nodes = parseEnv(input);
    expect(renderEnv(nodes)).toBe(input);
  });

  it('handles mixed line endings', () => {
    const input = '# Comment\nPOSTGRES_PASSWORD=secret\r\n\n';
    const nodes = parseEnv(input);
    expect(renderEnv(nodes)).toBe(input);
  });

  it('handles empty values', () => {
    const input = 'EMPTY_KEY=\n';
    const nodes = parseEnv(input);
    expect(nodes[0]).toMatchObject({ type: 'pair', key: 'EMPTY_KEY', value: '', sep: '=' });
    expect(renderEnv(nodes)).toBe(input);
  });

  it('handles values with special characters', () => {
    const input = 'SPECIAL_CHARS=!@#$%^&*()_+-=[]{}|;:,.<>?\n';
    const nodes = parseEnv(input);
    expect(nodes[0]).toMatchObject({ type: 'pair', key: 'SPECIAL_CHARS', value: '!@#$%^&*()_+-=[]{}|;:,.<>?' });
    expect(renderEnv(nodes)).toBe(input);
  });
});
