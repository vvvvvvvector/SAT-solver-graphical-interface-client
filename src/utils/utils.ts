import { ClauseType } from "../shared/types";

const calculateVariables = (clauses: ClauseType[]) => {
  const variablesSet = new Set();

  clauses.forEach((clause) => {
    clause.variables.forEach((variable) => {
      variablesSet.add(variable > 0 ? variable : -variable);
    });
  });

  return variablesSet.size;
};

export const parseToDimacs = (clauses: ClauseType[]) => {
  const variables_n = calculateVariables(clauses);
  const clauses_n = clauses.length;

  let newDimacs = `p cnf ${variables_n} ${clauses_n}\n`;

  clauses.forEach((clause, index) => {
    clause.variables.forEach((variable) => {
      newDimacs += `${variable} `;
    });
    newDimacs += index < clauses.length - 1 ? "0\n" : "0";
  });

  return newDimacs;
};
