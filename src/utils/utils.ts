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

export const parceToDimacs = (clauses: ClauseType[]) => {
  const variables_n = calculateVariables(clauses);
  const clauses_n = clauses.length;

  let dimacs = `p cnf ${variables_n} ${clauses_n}\n`;

  clauses.forEach((clause) => {
    clause.variables.forEach((variable) => {
      dimacs += `${variable} `;
    });
    dimacs += "0\n";
  });

  return dimacs;
};
