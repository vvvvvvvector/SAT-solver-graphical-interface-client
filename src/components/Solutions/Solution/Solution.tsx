import { FC } from 'react';

import VariableValue from './VariableValue/VariableValue';

import styles from './Solution.module.scss';

interface SolutionProps {
  solution: number[];
  onClickSolution: () => void;
}

const Solution: FC<SolutionProps> = ({ solution, onClickSolution }) => {
  return (
    <div
      onClick={onClickSolution}
      className={`${styles.solutions} hide-scrollbars`}
    >
      {solution.map((value, valueIndex) => (
        <VariableValue key={valueIndex} value={value} />
      ))}
    </div>
  );
};

export default Solution;
