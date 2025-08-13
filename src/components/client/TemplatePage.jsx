import React, { useState, useRef } from "react";
import ImportPanel from "./ImportPanel";
import SummaryControls from "./SummaryControls";
import ParsedList from "./ParsedList";
import PreviewPanel from "./PreviewPanel";
import CopyButton from "./CopyButton";
import DownloadButton from "./DownloadButton";
import ErrorBanner from "./ErrorBanner";
import TooltipPanel from "./TooltipPanel";
import SettingsPanel from "./SettingsPanel";
import { parseEnv, renderEnv } from "../../utils/envParser";

export default function TemplatePage({ template }) {
  const [importedContent, setImportedContent] = useState("");
  const [parsedSecrets, setParsedSecrets] = useState([]);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [settings, setSettings] = useState({
    preserve: false,
    jwtTtl: 3600,
    ...template.uiOptions
  });
  const [copied, setCopied] = useState(false);

  const copyButtonRef = useRef(null);
  // Handler for file or URL import
  const handleImport = (content) => {
    try {
      setError("");
      setImportedContent(content);
      const parsed = parseEnv(content);
      setParsedSecrets(parsed);
      setPreview(renderEnv(parsed));
    } catch (e) {
      setError(e.message || "Failed to parse .env file");
      setParsedSecrets([]);
      setPreview("");
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSettingsChange = (opts) => {
    setSettings(opts);
    // TODO: re-generate secrets if settings affect generation
  };

  return (
    <main className="max-w-2xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
      <p className="mb-6 text-base-content/70">{template.description}</p>
      <ImportPanel template={template} onImport={handleImport} error={error} />
      <SettingsPanel options={settings} onChange={handleSettingsChange} />
      <SummaryControls template={template} parsed={parsedSecrets} />
      <ParsedList template={template} parsed={parsedSecrets} />
      <PreviewPanel template={template} preview={preview} />
      <div className="flex gap-2 my-2">
        <CopyButton text={preview} onCopy={handleCopy} ref={copyButtonRef} />
  <DownloadButton text={preview} tabIndex={0} />
      </div>
      <ErrorBanner error={error} />
      {copied && (
        <div className="alert alert-success my-2" role="status" aria-live="polite">
          Copied to clipboard!
        </div>
      )}
    </main>
  );
}
