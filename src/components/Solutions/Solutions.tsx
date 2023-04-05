import React from "react";
import { toast } from "react-hot-toast";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Solution from "./Solution/Solution";
import NoSolutions from "./NoSolutions/NoSolutions";
import SolutionsHeader from "./SolutionsHeader/SolutionsHeader";

import styles from "./Solutions.module.scss";
import { Pagination } from "@mui/material";

export const Solutions: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const solutionsPerPage = 10;

  const [page, setPage] = React.useState(0);

  const { solutions, opened } = useSelector(
    (state: RootState) => state.solutions
  );

  React.useEffect(() => {
    setPage(0);
  }, [solutions]);

  // React.useEffect(() => {
  //   containerRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [solutions]);

  const handleSaveSolution = (solutionIndex: number) => {
    if (
      window.confirm(
        `Do you really want to save solution ${solutionIndex + 1} to a file?`
      )
    ) {
      const filename = window.prompt("Enter a filename: ");

      if (filename) {
        let result =
          "Solution was found: " + new Date().toLocaleString() + "\n\n";

        solutions[solutionIndex].forEach((variable, index) => {
          result += `x_${Math.abs(variable)} = ${
            variable > 0 ? "True" : "False"
          } ${solutions[solutionIndex].length - 1 > index ? "\n" : ""}`;
        });

        const blob = new Blob([result], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.download = `${filename}.txt`;
        link.href = url;
        link.click();

        toast.success("Solution was successfully saved!");
      }
    }
  };

  return (
    <>
      <SolutionsHeader />
      {opened && (
        <>
          {solutions.length > 0 ? (
            <>
              <div ref={containerRef} className={styles.solutionsContainer}>
                {solutions
                  .slice(page, page + solutionsPerPage)
                  .map((solution, solutionIndex) => (
                    <Solution
                      key={solutionIndex}
                      solution={solution}
                      onClickSolution={() => handleSaveSolution(solutionIndex)}
                    />
                  ))}
              </div>
              {solutions.length > solutionsPerPage && (
                <Pagination
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  color="primary"
                  page={page / solutionsPerPage + 1}
                  onChange={(_, value: number) => {
                    setPage((value - 1) * solutionsPerPage);
                  }}
                  count={Math.ceil(solutions.length / solutionsPerPage)}
                />
              )}
            </>
          ) : (
            <NoSolutions />
          )}
        </>
      )}
    </>
  );
};
