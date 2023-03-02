export type VariableType = {
  id: number;
  index: number;
  clauseId: number;
};

export type ClauseType = {
  id: number;
  variables: number[];
};

export type ControlsType = {
  setParsedCnf: (value: any) => void;
  setSolutions: (value: any) => void;
};
