import { describe, expect, it } from "vitest";
import { formatCellValue } from "../src/utils";

describe("formatCellValue", () => {
  it("null を空文字にする", () => expect(formatCellValue(null)).toBe(""));
  it("undefined を空文字にする", () =>
    expect(formatCellValue(undefined)).toBe(""));
  it("空文字を空文字にする", () => expect(formatCellValue("")).toBe(""));
  it("文字列をトリムする", () =>
    expect(formatCellValue("  foo  ")).toBe("foo"));
  it("数値を文字列化する", () => expect(formatCellValue(42)).toBe("42"));
  it("boolean を文字列化する", () =>
    expect(formatCellValue(true)).toBe("true"));
});
