import React from "react";

import { Clause } from "../index";

import styles from "./Formula.module.scss";

type FormulaType = {
  clauses: {
    id: number;
    variables: number[];
  }[];
};

export const Formula: React.FC<FormulaType> = ({ clauses }) => {
  return (
    <ul className={styles.formula}>
      {clauses.map((clause, index) => (
        <li key={clause.id}>
          <Clause clause={clause} />
          {clauses.length - 1 > index && <span>&#8743;</span>}
        </li>
      ))}
    </ul>
  );
};
