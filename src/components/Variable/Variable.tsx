import React from "react";

import styles from "./Variable.module.scss";

type VariableType = {
  index: number;
};

export const Variable: React.FC<VariableType> = ({ index }) => {
  return (
    <p className={styles.variable}>
      {index > 0 ? "x" : "~x"}
      <sub>{index > 0 ? index : index * -1}</sub>
    </p>
  );
};
