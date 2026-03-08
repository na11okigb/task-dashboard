# Phase 1 - Step 1-4: エディタ設定の共有 — VS Code + IntelliJ IDEA

> **学習日:** 2026-03-08
> **理解度:** ⭐⭐⭐

---

## このステップの目的

Step 1-1〜1-3 で「ランタイム（Volta）」「パッケージ（pnpm）」「ビルド（Vite）」を固定した。しかし、**エディタの振る舞い**がチームメンバー間でバラバラだと、フォーマットの差分やリンターの不一致がノイズとして発生する。

エディタ設定をリポジトリに含めることで、`git clone` した瞬間に全員が同じ開発体験を得ることがゴール。

---

## 学んだこと

### 1. `.vscode/extensions.json` — チーム推奨拡張機能

- リポジトリに配置すると、VS Code がプロジェクトを開いたとき「この拡張機能をインストールしますか？」と**推奨**する
- **強制ではなく誘導**。Convention over Configuration の思想
- 拡張機能パネルで `@recommended` とフィルタすると、推奨一覧が表示される

#### 必須拡張機能（タスクダッシュボードプロジェクト）

| 拡張機能 | 識別子 | 役割 |
|---------|--------|------|
| ESLint | `dbaeumer.vscode-eslint` | コード品質の問題をリアルタイム警告 |
| Prettier | `esbenp.prettier-vscode` | コードフォーマット統一 |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss` | Tailwindクラス名の補完・プレビュー |
| Error Lens | `usernamehw.errorlens` | エラーを該当行にインライン表示 |
| Pretty TypeScript Errors | `yoavbls.pretty-ts-errors` | TSエラーメッセージを読みやすく整形 |

### 2. `.vscode/settings.json` — ワークスペース設定

- **そのプロジェクトだけに適用される設定**。個人のユーザー設定より優先される
- 優先順位: **ワークスペース設定 > ユーザー設定 > デフォルト設定**

#### 設定した項目と理由

| 設定 | 値 | なぜ必要か |
|------|-----|-----------|
| `editor.formatOnSave` | `true` | フォーマットし忘れたコードのコミットを防ぐ |
| `editor.defaultFormatter` | `esbenp.prettier-vscode` | フォーマッタの不一致を防ぐ |
| `editor.codeActionsOnSave` | `source.fixAll.eslint: "explicit"` | 保存時にESLintの自動修正を実行 |
| `typescript.preferences.importModuleSpecifier` | `"non-relative"` | 短いインポートパスを優先 |
| `files.trimTrailingWhitespace` | `true` | 意味のないGit差分を防ぐ |
| `files.insertFinalNewline` | `true` | POSIXルールに従い、Git差分のノイズを防ぐ |

### 3. IntelliJ IDEA の `.idea/` 管理方針

VS Code の `.vscode/` は丸ごとコミットで問題ないが、IntelliJ の `.idea/` は**選択的に管理**が必要。

- **コミットする**: `codeStyles/`, `inspectionProfiles/`（チームの規約）
- **除外する**: `workspace.xml`, `tasks.xml`, `shelf/`（個人の作業状態）
- 判断基準: 「**チームの規約 → コミット**」「**個人の作業状態 → .gitignore**」
- 実際の設定は Phase 8（Kotlin プロジェクト作成時）に実施

### 4. ワークスペース設定 vs ユーザー設定

**なぜワークスペース設定を使うのか:**

- **個人の利便性**: プロジェクトごとに設定を切り替える手間がなくなる
- **チームの再現性（本質）**: 設定がリポジトリに入ることで、`git clone` した全員に自動適用される

ユーザー設定はそのPCにしか存在しない。チームメンバーが同じ設定をしてくれることを「期待する」しかない。これは Step 1-1 の「Works on My Machine 問題」と同じ構造。

---

## 重要な補足

- `extensions.json` は「推奨」（誘導）であり、`settings.json` は「強制」。二段構えでチームの再現性を担保している
- CLAUDE.md の作成は Step 1-5 に移動した。理由: プロジェクトにまだ実コードがなく、規約を書いても中身が伴わないため

---

## 適用された原則

| 原則 | このステップでの適用 |
|------|-------------------|
| **Single Source of Truth** | エディタ設定の管理場所をリポジトリに集約する |
| **Convention over Configuration** | extensions.json で「何を入れるか」の議論を排除する |
| **再現性（Reproducibility）** | `git clone` した瞬間に全員が同じ環境になる |
| **Works on My Machine 問題** | ユーザー設定に依存すると個人差が出る → ワークスペース設定で解決 |

---

## 次のステップ
- Step 1-5: AI駆動開発ワークフローの設計（CLAUDE.md の作成を含む）
