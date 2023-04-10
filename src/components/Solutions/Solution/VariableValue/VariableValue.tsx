import React from 'react';

import styles from './VariableValue.module.scss';

const VariableValue: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className={styles.solution}>
      <div>
        x<sub>{Math.abs(value)}</sub>
      </div>
      <span className={styles.equals}>=</span>
      <span className={value > 0 ? styles.green : styles.red}>
        {value > 0 ? 'True' : 'False'}
      </span>
    </div>
  );
};

export default VariableValue;
