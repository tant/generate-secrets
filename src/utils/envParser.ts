// Lossless .env parser and renderer for generate-secrets
// Phase 1: preserve comments, order, blank lines, spacing, quotes, and detect duplicates

export type EnvNode =
  | { type: 'comment'; value: string; raw: string }
  | { type: 'blank'; raw: string }
  | { type: 'pair'; key: string; value: string; raw: string; sep: string; quoted: boolean; inlineComment?: string; duplicate?: boolean }
  | { type: 'malformed'; raw: string };

export function parseEnv(input: string): EnvNode[] {
  const lines = input.split(/(\r?\n)/);
  const nodes: EnvNode[] = [];
  const seenKeys = new Set<string>();
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    let eol = '';
    if (i + 1 < lines.length && /^(\r?\n)$/.test(lines[i + 1])) {
      eol = lines[i + 1];
      i++;
    }
    const raw = line + eol;
    if (/^\s*$/.test(line)) {
      nodes.push({ type: 'blank', raw });
    } else if (/^\s*#/.test(line)) {
      nodes.push({ type: 'comment', value: line.trim(), raw });
    } else {
      // Try to parse key-value
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*(=)\s*(.*)$/);
      if (match) {
        const [, key, sep, rest] = match;
        let value = rest;
        let quoted = false;
        let inlineComment;
        // Detect inline comment (not inside quotes)
        if (/^(['"]).*\1/.test(value)) {
          quoted = true;
        }
        // Remove inline comment if unquoted
        if (!quoted && /\s+#/.test(value)) {
          const idx = value.indexOf(' #');
          if (idx !== -1) {
            // Remove leading '# ' from inline comment
            inlineComment = value.slice(idx + 2).trim();
            value = value.slice(0, idx).trimEnd();
          }
        }
        const duplicate = seenKeys.has(key);
        seenKeys.add(key);
        nodes.push({ type: 'pair', key, value, raw, sep, quoted, inlineComment, duplicate });
      } else {
        nodes.push({ type: 'malformed', raw });
      }
    }
    i++;
  }
  return nodes;
}

export function renderEnv(nodes: EnvNode[]): string {
  return nodes.map(n => n.raw).join('');
}
