import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSolutionsOpened } from "../../redux/slices/solutions";

import styles from "./Solutions.module.scss";

export const Solutions: React.FC = () => {
  const dispatch = useDispatch();

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
      <div className={styles["header"]}>
        <h2 onClick={() => dispatch(setSolutionsOpened(!opened))}>
          {solutions.length > 0 ? "Solutions" : "There are no solutions so far"}
        </h2>
        <svg
          className={opened ? styles["opened"] : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
      </div>
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
            <div className={styles["no-solutions"]}>
              <span>😭😭😭</span>
            </div>
          )}
        </>
      )}
    </>
  );
};
