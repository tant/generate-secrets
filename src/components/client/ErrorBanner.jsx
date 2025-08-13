import React from "react";

export default function ErrorBanner({ error }) {
  if (!error) return null;
  return (
    <div className="alert alert-error my-2" role="alert" aria-live="assertive">
      {error}
    </div>
  );
}
