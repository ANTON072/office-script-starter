import { run } from "./run";

export function main(workbook: ExcelScript.Workbook) {
  console.log(run(workbook));
}
