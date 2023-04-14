import { FC } from 'react';

import { IVariable } from '../../../../shared/types';

import styles from './Variable.module.scss';

interface VariableProps {
  variable: IVariable;
}

const Variable: FC<VariableProps> = ({ variable }) => {
  return (
    <div className={styles.variable}>
      {variable.index > 0 ? <span>x</span> : <span>&#172;x</span>}
      <sub>{variable.index > 0 ? variable.index : variable.index * -1}</sub>
    </div>
  );
};

export default Variable;
