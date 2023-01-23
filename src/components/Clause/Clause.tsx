import React from "react";

import { Variable } from "../index";

import styles from "./Clause.module.scss";

type ClauseType = {
  clause: {
    id: number;
    variables: number[];
  };
};

export const Clause: React.FC<ClauseType> = ({ clause }) => {
  return (
    <ul
      className={styles.clause}
      onClick={() => console.log("clause id: " + clause.id)}
    >
      <p>(</p>
      {clause.variables.map((value, index) => (
        <li key={index}>
          <Variable variable={{ id: index, value, clauseId: clause.id }} />
          {clause.variables.length - 1 > index && <span>&#8744;</span>}
        </li>
      ))}
      <p>)</p>
    </ul>
  );
};
