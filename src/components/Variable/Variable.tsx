import React from "react";

import styles from "./Variable.module.scss";

type VariableType = {
  index: number;
};

export const Variable: React.FC<VariableType> = ({ index }) => {
  return (
    <div className={styles.variable}>
      {index > 0 ? "x" : <span>&#172;x</span>}
      <sub>{index > 0 ? index : index * -1}</sub>
    </div>
  );
};
