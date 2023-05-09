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
  errorCode: 0 | 1 | 2 | 3 | 4 | 5;
  description: string;
  damaged: string;
}

export type ErrorsMap = {
  [line: string]: IError;
};
