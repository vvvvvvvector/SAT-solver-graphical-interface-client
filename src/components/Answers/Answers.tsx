import React from "react";

import { Variable } from "../index";

import styles from "./Answers.module.scss";

type AnswerType = {
  id: number;
  variables: number[];
};

export const Answers: React.FC<{ answers: AnswerType[] }> = ({ answers }) => {
  return (
    <div className={styles["container"]}>
      {answers.map((clause, clauseIndex) => (
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
  );
};
