import { describe, expect, it } from "vitest";
import { run } from "../src/run";

describe("run", () => {
  it("A1 セルの値を整形して返す", () => {
    const workbook = {
      getActiveWorksheet: () => ({
        getCell: () => ({ getValue: () => "  hello  " }),
      }),
    } as unknown as ExcelScript.Workbook;
    expect(run(workbook)).toBe("hello");
  });

  it("null 値は空文字を返す", () => {
    const workbook = {
      getActiveWorksheet: () => ({
        getCell: () => ({ getValue: () => null }),
      }),
    } as unknown as ExcelScript.Workbook;
    expect(run(workbook)).toBe("");
  });
});
