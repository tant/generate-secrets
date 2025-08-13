import React from "react";

export default function TooltipPanel({ label, tooltip }) {
  if (!tooltip) return <span>{label}</span>;
  return (
    <span className="tooltip" data-tip={tooltip} tabIndex={0}>
      {label} <span className="ml-1 text-info cursor-help">?</span>
    </span>
  );
}
