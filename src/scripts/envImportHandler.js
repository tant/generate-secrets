// Handles .env import, parsing, and UI updates for /templates/[id] page
import { parseEnv, renderEnv } from "../utils/envParser";

function updateUI(parsed, preview, error) {
  // Update SummaryControls, ParsedList, PreviewPanel, and error alert
  // This is a placeholder: in a real app, use a framework or more granular DOM updates
  document.querySelector("#env-error").innerHTML = error
    ? `<div class='alert alert-error my-2' role='alert' aria-live='assertive'>${error}</div>`
    : "";
  // TODO: update parsed/preview in the UI (if using a reactive framework)
}

window.addEventListener("env-import", (e) => {
  let error = "";
  // @ts-ignore
  const parsed = parseEnv(e.detail.content);
  // @ts-ignore
  const preview = renderEnv(parsed);
  updateUI(parsed, preview, "");
});

window.addEventListener("env-import-error", (e) => {
  // @ts-ignore
  const error = e.detail.message;
  updateUI([], "", error);
});
