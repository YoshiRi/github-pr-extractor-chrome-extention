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
    chrome.runtime.sendMessage({ type: "EXTRACT_PR" }, async (response) => {
      if (!response || response.error) {
        alert("Error extracting PR");
        console.error(response?.error);
        return;
      }

      const output = `
===== PR DESCRIPTION =====
${response.description}

===== DIFF (.patch) =====
${response.diff}
`;

      await navigator.clipboard.writeText(output);
      alert("PR data copied to clipboard!");
    });
  };

  document.body.appendChild(btn);
})();