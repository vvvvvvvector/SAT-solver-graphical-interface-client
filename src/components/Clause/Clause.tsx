import React from "react";

import { Variable } from "../index";

import styles from "./Clause.module.scss";

type ClauseType = {
  variables: number[];
};

export const Clause: React.FC<ClauseType> = ({ variables }) => {
  return (
    <ul className={styles.clause}>
      <p>(</p>
      {variables.map((i, index) => (
        <li key={index}>
          <Variable index={i} />
          {variables.length - 1 > index && <span>&#8744;</span>}
        </li>
      ))}
      <p>)</p>
    </ul>
  );
};
