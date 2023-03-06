import React from "react";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { removeVariable } from "../../redux/slices/formula";

import { VariableType } from "../../shared/types";

import styles from "./Variable.module.scss";

export const Variable: React.FC<{ variable: VariableType }> = ({
  variable,
}) => {
  const dispatch = useDispatch();

  const onRemoveVariable = (event: React.MouseEvent<HTMLDivElement>) => {
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

    dispatch(
      removeVariable({ clauseId: variable.clauseId, variableId: variable.id })
    );
  };

  return (
    <div className={styles.variable} onClick={onRemoveVariable}>
      {variable.index > 0 ? <span>x</span> : <span>&#172;x</span>}
      <sub>{variable.index > 0 ? variable.index : variable.index * -1}</sub>
    </div>
  );
};
