import React from "react";

export default function ParsedList({ template, parsed }) {
  if (!parsed.length) return null;
  return (
    <section className="mb-4">
      <h2 className="font-semibold mb-2">Parsed Secrets</h2>
      <ul className="list-disc pl-6">
        {parsed.map((item, idx) => (
          item.key && item.value !== undefined ? (
            <li key={idx}>
              <span className="font-mono font-bold" data-testid="parsed-key">{item.key}</span>
              {": "}
              <span>{item.value}</span>
              {/* Optionally add badges, tooltips, etc. */}
            </li>
          ) : null
        ))}
      </ul>
    </section>
  );
}
