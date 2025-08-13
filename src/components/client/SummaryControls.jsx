import React from "react";

export default function SummaryControls({ template, parsed }) {
  // Example: count secrets, show actions (customize as needed)
  const secretCount = parsed.length;
  return (
    <section className="mb-4 flex items-center gap-4">
      <span className="badge badge-primary">{secretCount} secrets</span>
      {/* Add more controls/actions as needed */}
    </section>
  );
}
