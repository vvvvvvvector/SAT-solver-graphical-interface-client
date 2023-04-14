export interface IVariable {
  id: number;
  index: number;
  clauseId: number;
}

export interface IClause {
  id: number;
  variables: number[];
}

export interface IError {
  line: number;
  errorCode: 0 | 1 | 2 | 3 | 4;
  description: string;
  damaged: string;
}
