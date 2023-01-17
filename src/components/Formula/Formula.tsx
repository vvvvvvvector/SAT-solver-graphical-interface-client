import React from "react";

import { Clause } from "../index";

import styles from "./Formula.module.scss";

type FormulaType = {
  clauses: number[][];
};

export const Formula: React.FC<FormulaType> = ({ clauses }) => {
  return (
    <ul className={styles.formula}>
      {clauses.map((i, index) => (
        <li key={index}>
          <Clause variables={i} />
          {clauses.length - 1 > index && <span>&#8743;</span>}
        </li>
      ))}
    </ul>
  );
};
