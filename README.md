# office-script-starter

Office Script を複数ファイルに分割してローカルで開発するための環境です。ビルド時に単一ファイルへ結合し、クリップボードにコピーします。

## セットアップ

```bash
npm install
```

## 開発

| コマンド | 内容 |
| --- | --- |
| `npm run build` | `src/` をバンドルして `dist/script.ts` を生成（クリップボードにコピー） |
| `npm run dev` | `src/` を監視して変更のたびに自動ビルド |
| `npm test` | テストを実行 |
| `npm run test:watch` | テストをウォッチモードで実行 |

ビルド後は `dist/script.ts` の内容が自動でクリップボードにコピーされるので、Excel Online の Office Script エディタにそのまま貼り付けて実行できます。

## プロジェクト構成

```text
src/
  main.ts                 # エントリポイント（Office Script ランタイムが呼び出す）
  run.ts                  # ビジネスロジック（テスト可能）
  utils.ts                # 純粋関数
  workbook-interfaces.ts  # IWorkbook 等の最小インターフェース定義
tests/
  utils.test.ts
  run.test.ts
dist/
  script.ts               # ビルド成果物（Excel に貼り付けるファイル）
types/
  excel-script.d.ts       # Microsoft 公式提供の型定義
```

## テスト設計の方針

`ExcelScript.Workbook` は Excel ランタイムが提供するオブジェクトのため、テスト環境で生成できません。そのため以下の構成でテスト可能にしています。

- `src/workbook-interfaces.ts` に使用するメソッドだけを宣言した最小インターフェース（`IWorkbook` 等）を定義
- ビジネスロジック（`run.ts`）はこのインターフェースを受け取る。TypeScript の構造的型付けにより `ExcelScript.Workbook` は自動的に満たす
- エントリポイント（`main.ts`）は `run()` に委譲するだけの薄い層に留める
- テストではオブジェクトリテラルで簡易なモックを作成する

## 参考リンク

- [Office Scripts 公式ドキュメント](https://github.com/OfficeDev/office-scripts-docs/tree/main)
- [公式型定義ファイル](https://raw.githubusercontent.com/OfficeDev/office-scripts-docs-reference/main/generate-docs/script-inputs/office-scripts-docs.d.ts)
