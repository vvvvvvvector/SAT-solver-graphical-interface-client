import { FC, useRef, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useAppSelector } from '../../redux/hooks/hooks';

import Solution from './Solution/Solution';
import NoSolutions from './NoSolutions/NoSolutions';
import SolutionsHeader from './SolutionsHeader/SolutionsHeader';

import { Pagination } from '@mui/material';

import styles from './Solutions.module.scss';

export const Solutions: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const solutionsPerPage = 10;

  const [page, setPage] = useState(0);

  const { solutions, opened } = useAppSelector((state) => state.solutions);

  console.log(page);

  useEffect(() => {
    // page state: 0 10 20 30 40 50 60 70 80 90 100

    // page irl:  1 2 3 4 5 6 7 8 9 10 11

    setPage(
      solutions.length % 10 === 0
        ? solutions.length - solutionsPerPage
        : Math.floor(solutions.length / solutionsPerPage) * solutionsPerPage
    );

    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [solutions]);

  const handleSaveSolution = (solutionIndex: number) => {
    if (
      window.confirm(
        `Do you really want to save solution ${solutionIndex + 1} to a file?`
      )
    ) {
      const filename = window.prompt('Enter a filename: ');

      if (filename) {
        let result =
          'Solution was found: ' + new Date().toLocaleString() + '\n\n';

        solutions[solutionIndex].forEach((variable, index) => {
          result += `x_${Math.abs(variable)} = ${
            variable > 0 ? 'True' : 'False'
          } ${solutions[solutionIndex].length - 1 > index ? '\n' : ''}`;
        });

        const blob = new Blob([result], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.download = `${filename}.txt`;
        link.href = url;
        link.click();

        toast.success('Solution was successfully saved!');
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
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  color='primary'
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
