import { FC } from 'react';

import VariableValue from './VariableValue/VariableValue';

import SaveAsIcon from '@mui/icons-material/SaveAs';

import styles from './Solution.module.scss';

interface SolutionProps {
  solution: number[];
  onClickSolution: () => void;
}

const Solution: FC<SolutionProps> = ({ solution, onClickSolution }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.solutions} hide-scrollbars`}>
        {solution.map((value, valueIndex) => (
          <VariableValue key={valueIndex} value={value} />
        ))}
      </div>
      <button onClick={onClickSolution}>
        <SaveAsIcon
          sx={{
            color: '#d5d5d5',
            fontSize: '1.2rem',
          }}
        />
      </button>
    </div>
  );
};

export default Solution;
