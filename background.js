chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "EXTRACT_PR") return;

  (async () => {
    try {
      const match = sender.tab.url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
      if (!match) throw "URL parse failed";

      const [, owner, repo, number] = match;

      const headers = {
        Accept: "application/vnd.github.v3.patch"
        // private repoならここに Authorization: "Bearer TOKEN"
      };

      // Description
      const prRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`
      );
      const prData = await prRes.json();

      // Patch (API経由)
      const patchRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`,
        { headers }
      );
      const patchText = await patchRes.text();

      sendResponse({
        title: prData.title,
        description: prData.body || "",
        diff: patchText
      });

    } catch (e) {
      console.error(e);
      sendResponse({ error: e.toString() });
    }
  })();

  return true;
});