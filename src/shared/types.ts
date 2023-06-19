export interface IClause {
  id: number;
  variables: number[];
}

export interface IError {
  line: number;
  errorCode: 0 | 1 | 2 | 3 | 4 | 5;
  description: string;
  damaged: string;
}
