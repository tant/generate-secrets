import React from "react";

export default function DownloadButton({ text, filename = ".env", tabIndex }) {
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button
      className="btn btn-secondary btn-sm"
      onClick={handleDownload}
      aria-label="Download .env file"
      disabled={!text}
  tabIndex={tabIndex}
  type="button"
    >
      Download
    </button>
  );
}
