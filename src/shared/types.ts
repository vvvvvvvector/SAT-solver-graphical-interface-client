export type VariableType = {
  id: number;
  index: number;
  clauseId: number;
};

export type ClauseType = {
  id: number;
  variables: number[];
};
