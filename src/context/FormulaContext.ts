import { createContext } from "react";

const FormulaContext = createContext<{
  formula: string;
  setFormula: (value: string) => void;
}>({
  formula: "",
  setFormula: () => undefined,
});

export default FormulaContext;
