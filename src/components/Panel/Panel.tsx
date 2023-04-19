import { FC, useState } from 'react';

import { Solve, Next, SelectSolver, FindAll } from './Buttons/';

import styles from './Panel.module.scss';

import { ShortName } from './Buttons/SelectSolver/Solvers';

export const Panel: FC = () => {
  const [solver, setSolver] = useState<ShortName>('cd');

  return (
    <div className={styles.buttons}>
      <FindAll solver={solver} />
      <Solve solver={solver} />
      <Next solver={solver} />
      <SelectSolver solver={solver} setSolver={setSolver} />
    </div>
  );
};
