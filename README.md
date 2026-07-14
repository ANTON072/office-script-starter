# office-script-starter

A local development environment for Office Scripts that splits code across multiple files. On build, they are bundled into a single file and copied to the clipboard.

## Setup

```bash
npm install
```

## Development

| Command | Description |
| --- | --- |
| `npm run build` | Bundle `src/` into `dist/script.ts` (auto-copied to clipboard) |
| `npm run dev` | Watch `src/` and rebuild automatically on every change |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

After each build, `dist/script.ts` is automatically copied to your clipboard — paste it directly into the Office Script editor in Excel Online and run it.

## Project structure

```text
src/
  main.ts                 # Entry point (called by the Office Script runtime)
  run.ts                  # Business logic (testable)
  utils.ts                # Pure utility functions
  workbook-interfaces.ts  # Minimal interface definitions (IWorkbook, etc.)
tests/
  utils.test.ts
  run.test.ts
dist/
  script.ts               # Build artifact (the file to paste into Excel)
types/
  excel-script.d.ts       # Official type definitions provided by Microsoft
```

## Testing approach

`ExcelScript.Workbook` is provided by the Excel runtime and cannot be instantiated in a test environment. The project works around this as follows:

- `src/workbook-interfaces.ts` declares minimal interfaces (e.g. `IWorkbook`) with only the methods actually used
- Business logic (`run.ts`) accepts these interfaces; TypeScript's structural typing means `ExcelScript.Workbook` satisfies them automatically
- The entry point (`main.ts`) is kept as a thin delegating layer that simply calls `run()`
- Tests create lightweight mocks using plain object literals

## References

- [Office Scripts official documentation](https://github.com/OfficeDev/office-scripts-docs/tree/main)
- [Official type definition file](https://raw.githubusercontent.com/OfficeDev/office-scripts-docs-reference/main/generate-docs/script-inputs/office-scripts-docs.d.ts)
