import { createContext } from "react";

const CnfContext = createContext<{
  cnf: string;
  setCnf: (value: string) => void;
}>({
  cnf: "",
  setCnf: () => undefined,
});

export default CnfContext;
