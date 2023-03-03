import React from "react";

import { ClauseType } from "../../shared/types";

import styles from "./Solutions.module.scss";

export const Solutions: React.FC<{ solutions: ClauseType[] }> = ({
  solutions,
}) => {
  return (
    <>
      <h2 className={styles["header"]}>Solutions: </h2>
      <div className={styles["container"]}>
        {solutions.map((clause, clauseIndex) => (
          <div className="answers" key={clauseIndex}>
            {clause.variables.map((i, variableIndex) => (
              <div className={styles["answer"]} key={variableIndex}>
                <div>
                  x<sub>{Math.abs(i)}</sub>
                </div>
                <span className={styles["equals"]}>=</span>
                <span className={i > 0 ? styles["red"] : styles["green"]}>
                  {i > 0 ? "False" : "True"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
