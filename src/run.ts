import { formatCellValue } from "./utils";
import type { IWorkbook } from "./workbook-interfaces";

export function run(workbook: IWorkbook): string {
  const sheet = workbook.getActiveWorksheet();
  const cell = sheet.getCell(0, 0);
  return formatCellValue(cell.getValue());
}
