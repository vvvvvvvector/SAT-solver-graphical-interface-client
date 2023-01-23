import React from "react";

import styles from "./Variable.module.scss";

type VariableType = {
  variable: {
    id: number;
    index: number;
    clauseId: number;
  };
};

export const Variable: React.FC<VariableType> = ({ variable }) => {
  const onClickVariable = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    console.log(
      "clause id: " +
        variable.clauseId +
        ", variable id: " +
        variable.id +
        ", variable index: " +
        variable.index
    );
  };

  return (
    <div className={styles.variable} onClick={onClickVariable}>
      {variable.index > 0 ? "x" : <span>&#172;x</span>}
      <sub>{variable.index > 0 ? variable.index : variable.index * -1}</sub>
    </div>
  );
};
