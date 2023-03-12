import React from "react";

import { VariableType } from "../../../../shared/types";

import styles from "./Variable.module.scss";

const Variable: React.FC<{ variable: VariableType }> = ({ variable }) => {
  return (
    <div className={styles.variable}>
      {variable.index > 0 ? <span>x</span> : <span>&#172;x</span>}
      <sub>{variable.index > 0 ? variable.index : variable.index * -1}</sub>
    </div>
  );
};

export default Variable;
