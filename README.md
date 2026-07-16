# office-script-starter

A local development environment for Office Scripts that splits code across multiple files. On build, they are bundled into a single file and copied to the clipboard.

## Setup

```bash
npm install
```

## Development

| Command | Description |
| --- | --- |
| `npm run build` | Bundle scripts into `dist/` (auto-copied to clipboard if single script) |
| `npm run dev` | Watch `src/` and rebuild automatically on every change |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

After each build, `dist/<name>.ts` is generated. If there is only one script, it is automatically copied to your clipboard — paste it directly into the Office Script editor in Excel Online and run it.

## Project structure

```text
src/
  scripts/                  # Entry points — each file is built into its own dist/<name>.ts
    main.ts                 # Called by the Office Script runtime (export function main)
  lib/                      # Shared code imported by scripts
    run.ts                  # Business logic (testable)
    utils.ts                # Pure utility functions
tests/
  utils.test.ts
  run.test.ts
dist/
  main.ts                   # Build artifact (the file to paste into Excel)
types/
  excel-script.d.ts         # Official type definitions provided by Microsoft
```

### Adding a new script

1. Create `src/scripts/<your-script>.ts` with an `export function main(workbook: ExcelScript.Workbook)` entry point
2. Run `npm run build` — `dist/<your-script>.ts` is generated automatically

Shared logic goes in `src/lib/` and can be imported by any script.

## Testing approach

`ExcelScript.Workbook` is provided by the Excel runtime and cannot be instantiated in a test environment. The project works around this as follows:

- Business logic (`lib/run.ts`) is kept separate from the entry point and accepts `ExcelScript.Workbook` via TypeScript's structural typing
- The entry point (`scripts/main.ts`) is a thin delegating layer that simply calls `run()`
- Tests create lightweight mocks using plain object literals

## References

- [Office Scripts official documentation](https://github.com/OfficeDev/office-scripts-docs/tree/main)
- [Official type definition file](https://raw.githubusercontent.com/OfficeDev/office-scripts-docs-reference/main/generate-docs/script-inputs/office-scripts-docs.d.ts)
