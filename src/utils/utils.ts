import { IClause } from '../shared/types';

export const formulaDefinition = /^p\s+cnf\s+[1-9][0-9]*\s+[1-9][0-9]*\s*$/;
export const lineEndsWithZero = /0\s*$/;
export const validClause = /^\s*(?:-?[1-9][0-9]*\s+)+0\s*$/;

const calculateVariables = (clauses: IClause[]) => {
  const variablesSet = new Set<number>();

  clauses.forEach((clause) => {
    clause.variables.forEach((variable) => {
      variablesSet.add(variable > 0 ? variable : -variable);
    });
  });

  return Math.max(...variablesSet);
};

export const parseToDimacs = (clauses: IClause[]) => {
  const variables_n = calculateVariables(clauses);
  const clauses_n = clauses.length;

  let newDimacs = `p cnf ${variables_n} ${clauses_n}\n`;

  clauses.forEach((clause, index) => {
    clause.variables.forEach((variable) => {
      newDimacs += `${variable} `;
    });
    newDimacs += index < clauses.length - 1 ? '0\n' : '0';
  });

  return newDimacs;
};
