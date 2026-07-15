import { formatCellValue } from "./utils";

export function run(workbook: ExcelScript.Workbook): string {
  const sheet = workbook.getActiveWorksheet();
  const cell = sheet.getCell(0, 0);
  return formatCellValue(cell.getValue());
}
