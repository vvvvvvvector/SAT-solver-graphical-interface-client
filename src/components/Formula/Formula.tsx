import React from "react";

import { Clause } from "../index";

import { ClauseType } from "../../shared/types";

import styles from "./Formula.module.scss";

export const Formula: React.FC<{ clauses: ClauseType[] }> = ({ clauses }) => {
  return (
    <>
      <h2 className={styles.header}>Parsed Formula in CNF:</h2>
      <ul className={styles.formula}>
        {clauses.map((clause, index) => (
          <li key={clause.id}>
            <Clause clause={clause} />
            {clauses.length - 1 > index && <span>&#8743;</span>}
          </li>
        ))}
      </ul>
    </>
  );
};
