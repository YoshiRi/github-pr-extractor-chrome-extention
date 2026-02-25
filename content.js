function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;

  Object.assign(toast.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#2da44e",
    color: "white",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    zIndex: 10000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    opacity: "0",
    transition: "opacity 0.3s"
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 1200);
}

(function () {
  const btn = document.createElement("button");
  btn.innerText = "Extract PR";
  btn.style.position = "fixed";
  btn.style.top = "100px";
  btn.style.right = "20px";
  btn.style.zIndex = "9999";
  btn.style.padding = "8px 12px";
  btn.style.background = "#2da44e";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.borderRadius = "6px";
  btn.style.cursor = "pointer";

  btn.onclick = () => {
    chrome.runtime.sendMessage({ type: "EXTRACT_PR" }, (response) => {
      if (!response || response.error) {
        showToast("Error extracting PR");
        console.error(response?.error);
        return;
      }

      chrome.storage.sync.get(["template"], async (data) => {
        const template =
          data.template ||
`## Title
{{title}}

## Description
{{body}}

## Patch
{{diff}}`;

        const output = template
          .replaceAll("{{title}}", response.title || "")
          .replaceAll("{{body}}", response.description || "")
          .replaceAll("{{diff}}", response.diff || "");

        try {
          await navigator.clipboard.writeText(output);
          showToast("PR data copied using template!");
        } catch (e) {
          console.error("Clipboard error:", e);
          showToast("Failed to copy to clipboard");
        }
      });
    });
  };

  document.body.appendChild(btn);
})();
