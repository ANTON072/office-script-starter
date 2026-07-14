import { formatCellValue } from "./utils";

export function main(workbook: ExcelScript.Workbook) {
  const sheet = workbook.getActiveWorksheet();
  const cell = sheet.getCell(0, 0);
  const formatted = formatCellValue(cell.getValue());
  console.log(formatted);
}
