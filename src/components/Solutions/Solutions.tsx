import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import styles from "./Solutions.module.scss";

export const Solutions: React.FC = () => {
  const { solutions } = useSelector((state: RootState) => state.solutions);

  return (
    <>
      {solutions.length > 0 && (
        <>
          <h2 className={styles["header"]}>Solutions: </h2>
          <div className={styles["solutions-container"]}>
            {solutions.map((clause, clauseIndex) => (
              <div className={styles["solutions"]} key={clauseIndex}>
                {clause.variables.map((i, variableIndex) => (
                  <div className={styles["solution"]} key={variableIndex}>
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
      )}
    </>
  );
};
