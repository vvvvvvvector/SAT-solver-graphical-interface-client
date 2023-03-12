import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import NoSolutions from "./NoSolutions/NoSolutions";
import SolutionsHeader from "./SolutionsHeader/SolutionsHeader";

import styles from "./Solutions.module.scss";

export const Solutions: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { solutions, opened } = useSelector(
    (state: RootState) => state.solutions
  );

  React.useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [solutions]);

  return (
    <>
      <SolutionsHeader />
      {opened && (
        <>
          {solutions.length > 0 ? (
            <div ref={containerRef} className={styles["solutions-container"]}>
              {solutions.map((clause, clauseIndex) => (
                <div className={styles["solutions"]} key={clauseIndex}>
                  {clause.map((i, variableIndex) => (
                    <div className={styles["solution"]} key={variableIndex}>
                      <div>
                        x<sub>{Math.abs(i)}</sub>
                      </div>
                      <span className={styles["equals"]}>=</span>
                      <span className={i > 0 ? styles["green"] : styles["red"]}>
                        {i > 0 ? "True" : "False"}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <NoSolutions />
          )}
        </>
      )}
    </>
  );
};
