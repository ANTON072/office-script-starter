export interface IRange {
  getValue(): string | number | boolean | null;
}

export interface IWorksheet {
  getCell(row: number, col: number): IRange;
}

export interface IWorkbook {
  getActiveWorksheet(): IWorksheet;
}
