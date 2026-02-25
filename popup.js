const textarea = document.getElementById("template");

const DEFAULT_TEMPLATE = `You are a senior software engineer and code reviewer.

Please analyze the following GitHub Pull Request.

=== PR TITLE ===
{{title}}

=== PR DESCRIPTION ===
{{body}}

=== CODE CHANGES (PATCH) ===
{{diff}}

Tasks:
1. Summarize the purpose of this PR
2. Explain key code changes
3. Identify possible bugs or risks
4. Suggest improvements or missing tests
`;

chrome.storage.sync.get(["template"], (data) => {
  textarea.value = data.template || DEFAULT_TEMPLATE;
});

const saveBtn = document.getElementById("save");

saveBtn.onclick = () => {
  chrome.storage.sync.set({ template: textarea.value }, () => {

    // visual feedback
    saveBtn.innerText = "Saved ✓";
    saveBtn.disabled = true;

    // auto close popup
    setTimeout(() => {
      window.close();
    }, 600);
  });
};