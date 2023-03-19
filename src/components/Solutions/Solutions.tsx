import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Solution from "./Solution/Solution";
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

  const handleSaveSolution = (solutionIndex: number) => {
    if (
      window.confirm(
        `Do you want to write solution ${solutionIndex + 1} in the file?`
      )
    ) {
      let result = "";

      solutions[solutionIndex].forEach((variable, index) => {
        result += `x_${Math.abs(variable)} = ${
          variable > 0 ? "True" : "False"
        } ${solutions[solutionIndex].length - 1 > index ? "\n" : ""}`;
      });

      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.download = `solution_${solutionIndex + 1}.txt`;
      link.href = url;
      link.click();
    }
  };

  return (
    <>
      <SolutionsHeader />
      {opened && (
        <>
          {solutions.length > 0 ? (
            <div ref={containerRef} className={styles["solutions-container"]}>
              {solutions.map((solution, solutionIndex) => (
                <Solution
                  key={solutionIndex}
                  solution={solution}
                  onClickSolution={() => handleSaveSolution(solutionIndex)}
                />
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
