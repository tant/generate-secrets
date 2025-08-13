import React from "react";

export default function PreviewPanel({ template, preview }) {
  if (!preview) return null;
  return (
    <section className="mb-4">
      <h2 className="font-semibold mb-2">Preview</h2>
      <textarea
        className="bg-base-200 p-2 rounded overflow-x-auto text-sm w-full"
        value={preview}
        readOnly
        rows={Math.max(3, preview.split('\n').length)}
        aria-label=".env preview"
      />
      {/* Add copy/download/select-all actions as needed */}
    </section>
  );
}
