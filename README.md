# GitHub PR Extractor

Chrome 拡張として動作し、GitHub の Pull Request ページから以下を抽出してクリップボードへコピーします。

- PR の Description (`body`)
- PR の差分 (`.patch` 形式)

## Files

- `manifest.json`: 拡張機能の設定 (Manifest V3)
- `content.js`: PR ページに `Extract PR` ボタンを表示し、抽出処理をトリガー
- `background.js`: GitHub API から PR 情報と patch を取得

## 使い方 (ローカル読み込み)

1. Chrome で `chrome://extensions` を開く
2. 右上の「デベロッパー モード」を ON
3. 「パッケージ化されていない拡張機能を読み込む」でこのディレクトリを選択
4. GitHub の PR ページ (`https://github.com/<owner>/<repo>/pull/<number>`) を開く
5. 右上付近に表示される `Extract PR` ボタンを押す
6. クリップボードに出力されるテキストを貼り付けて利用

## 出力イメージ

```text
===== PR DESCRIPTION =====
<PR本文>

===== DIFF (.patch) =====
<patch本文>
```

## 注意点

- 現状は公開リポジトリ想定です。
- private repo で使う場合は `background.js` の `Authorization` ヘッダー対応が必要です。
- GitHub API のレート制限に注意してください。

## 今後の改善案

- 認証トークン入力 UI の追加
- 出力フォーマット (JSON/Markdown) の切り替え
- コピーだけでなくファイル保存にも対応
