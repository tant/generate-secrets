import React from "react";

export default function SettingsPanel({ options, onChange }) {
  // Example: show toggles for preserve, JWT TTL, etc.
  return (
    <section className="mb-4">
      <h2 className="font-semibold mb-2">Settings</h2>
      {options?.showPreserveToggle && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.preserve}
            onChange={e => onChange({ ...options, preserve: e.target.checked })}
          />
          Preserve existing secrets
        </label>
      )}
      {options?.showJwtTtlControl && (
        <label className="flex items-center gap-2 mt-2">
          JWT TTL (seconds):
          <input
            type="number"
            min={0}
            value={options.jwtTtl || ""}
            onChange={e => onChange({ ...options, jwtTtl: Number(e.target.value) })}
            className="input input-bordered input-sm w-24"
          />
        </label>
      )}
    </section>
  );
}
