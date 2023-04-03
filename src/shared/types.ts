export type VariableType = {
  id: number;
  index: number;
  clauseId: number;
};

export type ClauseType = {
  id: number;
  variables: number[];
};

export type ErrorType = {
  line: number;
  errorCode: 0 | 1 | 2 | 3 | 4;
  description: string;
  damaged: string;
};
