import { FC, useState } from 'react';

import VariableValue from './VariableValue/VariableValue';
import FullSolution from './FullSolution/FullSolution';

import styles from './Solution.module.scss';

interface SolutionProps {
  solution: number[];
  solutionIndex: number;
}

const Solution: FC<SolutionProps> = ({ solution, solutionIndex }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      {isOpened && (
        <FullSolution
          solution={solution}
          solutionIndex={solutionIndex}
          isOpened={isOpened}
          setIsOpened={setIsOpened}
        />
      )}
      <div className={styles.container}>
        <div
          onClick={() => setIsOpened(true)}
          className={`${styles.solutions} hide-scrollbars`}
        >
          {solution.slice(0, 7).map((value, valueIndex) => (
            <VariableValue key={valueIndex} value={value} />
          ))}
          {solution.length > 7 && <span>...</span>}
        </div>
      </div>
    </>
  );
};

export default Solution;
