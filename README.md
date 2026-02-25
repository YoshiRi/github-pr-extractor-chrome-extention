# GitHub PR Extractor

Chrome extension to extract Pull Request data from GitHub and copy it to clipboard using a customizable template.

## Features

- Adds an `Extract PR` button on GitHub PR pages.
- Fetches PR metadata from GitHub API:
  - `title`
  - `body` (description)
  - `.patch` diff
- Applies a user-defined template before copying.
- Uses toast notifications instead of blocking alerts.

## Project Structure

- `manifest.json`: Extension configuration (Manifest V3)
- `content.js`: Injects the button on PR pages, builds final output, copies to clipboard
- `background.js`: Handles API calls and returns PR data
- `popup.html`: Settings UI
- `popup.js`: Template editor logic (save/load via `chrome.storage.sync`)

## Setup (Load Unpacked)

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select this directory (`github-pr-extractor`)

## Usage

1. Open any GitHub PR page: `https://github.com/<owner>/<repo>/pull/<number>`
2. (Optional) Click the extension icon and edit/save your template
3. Click `Extract PR` on the page
4. Paste clipboard content anywhere you want (ChatGPT, docs, notes, etc.)

## Template Variables

- `{{title}}`: PR title
- `{{body}}`: PR description/body
- `{{diff}}`: PR patch text

Example:

```text
## Title
{{title}}

## Description
{{body}}

## Patch
{{diff}}
```

## Permissions

- `storage`: Save custom template
- `clipboardWrite`: Copy extracted result
- `activeTab`, `scripting`: Run on current GitHub PR tab
- Host permissions:
  - `https://github.com/*`
  - `https://api.github.com/*`

## Notes

- Currently designed for public repositories.
- For private repositories, add an `Authorization` header in `background.js`.
- GitHub API rate limits apply.
