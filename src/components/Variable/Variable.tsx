import React from "react";
import toast from "react-hot-toast";

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

    toast(
      (t) => (
        <span>
          {`clause id:${variable.clauseId}, variable id:${variable.id}, variable index:${variable.index}`}
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ),
      { icon: "🛠️" }
    );
  };

  return (
    <div className={styles.variable} onClick={onClickVariable}>
      {variable.index > 0 ? "x" : <span>&#172;x</span>}
      <sub>{variable.index > 0 ? variable.index : variable.index * -1}</sub>
    </div>
  );
};
