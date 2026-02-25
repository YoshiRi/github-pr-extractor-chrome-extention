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
        alert("Error extracting PR");
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
          alert("PR data copied using template!");
        } catch (e) {
          console.error("Clipboard error:", e);
          alert("Failed to copy to clipboard");
        }
      });
    });
  };

  document.body.appendChild(btn);
})();