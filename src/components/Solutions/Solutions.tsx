import React from "react";

import { Variable } from "../index";

import { ClauseType } from "../../shared/types";

import styles from "./Solutions.module.scss";

export const Solutions: React.FC<{ solutions: ClauseType[] }> = ({
  solutions,
}) => {
  return (
    <>
      <h2>Solutions: </h2>
      <div className={styles["container"]}>
        {solutions.map((clause, clauseIndex) => (
          <div className="answers" key={clauseIndex}>
            {clause.variables.map((i, variableIndex) => (
              <div className={styles["answer"]} key={variableIndex}>
                <Variable
                  variable={{
                    id: variableIndex,
                    index: Math.abs(i),
                    clauseId: clause.id,
                  }}
                />
                <span className={styles["equals"]}>=</span>
                <span className={i > 0 ? styles["red"] : styles["green"]}>
                  {i > 0 ? "FALSE" : "TRUE"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
