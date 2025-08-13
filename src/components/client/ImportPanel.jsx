import React, { useRef, useState } from "react";

export default function ImportPanel({ template, onImport, error }) {
  const fileInputRef = useRef();
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const urlNormalizer = template?.urlNormalizer;

  const MAX_SIZE = 256 * 1024; // 256KB
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setUrlError("File is too large (max 256KB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      onImport(event.target.result);
    };
    reader.onerror = () => {
      setUrlError("Failed to read file");
    };
    reader.readAsText(file);
  };

  const handleUrlImport = async (e) => {
    e.preventDefault();
    setUrlError("");
    
    // Validate URL format first
    if (!url) {
      setUrlError("Please enter a URL");
      return;
    }
    
    if (!urlNormalizer) {
      setUrlError("Only GitHub blob/raw URLs are supported.");
      return;
    }
    
    let normalized;
    try {
      normalized = urlNormalizer(url);
      if (normalized instanceof Error) throw normalized;
    } catch (err) {
      setUrlError(err.message || "Only GitHub blob/raw URLs are supported.");
      return;
    }
    
    try {
      const res = await fetch(normalized);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("File not found at the specified URL");
        } else if (res.status === 403) {
          throw new Error("Access denied to the specified URL");
        } else {
          throw new Error(`Failed to fetch .env file from URL (status: ${res.status})`);
        }
      }
      
      const text = await res.text();
      
      // Check file size after fetching
      if (text.length > MAX_SIZE) {
        throw new Error("File is too large (max 256KB)");
      }
      
      onImport(text);
    } catch (err) {
      setUrlError(err.message || "Failed to fetch .env file");
    }
  };

  return (
    <section className="mb-6">
      <label className="block font-semibold mb-2" htmlFor="env-file-input">
        Import .env file
      </label>
      {/* Tab order: 1. file input, 2. URL input, 3. Import URL button */}
      <input
        id="env-file-input"
        type="file"
        accept=".env,.txt,.example"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs"
        aria-label="Import .env file"
        tabIndex={0}
      />
      <form className="mt-4 flex gap-2" onSubmit={handleUrlImport}>
        <input
          type="url"
          placeholder="Paste GitHub .env URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="input input-bordered flex-1"
          aria-label="GitHub .env URL"
        />
        <button type="submit" className="btn btn-primary btn-sm" aria-label="Import from GitHub URL">
          Import URL
        </button>
      </form>
      <div className="text-xs mt-2 opacity-60">
        All processing is done in your browser. No data is uploaded.
      </div>
      {(error || urlError) && (
        <div className="alert alert-error mt-2" role="alert" aria-live="assertive">
          {error || urlError}
        </div>
      )}
    </section>
  );
}
