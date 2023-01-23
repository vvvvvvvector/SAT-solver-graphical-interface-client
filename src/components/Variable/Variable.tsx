import React from "react";

import styles from "./Variable.module.scss";

type VariableType = {
  variable: {
    id: number;
    value: number;
    clauseId: number;
  };
};

export const Variable: React.FC<VariableType> = ({ variable }) => {
  return (
    <div
      className={styles.variable}
      onClick={() =>
        console.log(
          "clause id: " + variable.clauseId + ", variable id: " + variable.id
        )
      }
    >
      {variable.value > 0 ? "x" : <span>&#172;x</span>}
      <sub>{variable.value > 0 ? variable.value : variable.value * -1}</sub>
    </div>
  );
};
