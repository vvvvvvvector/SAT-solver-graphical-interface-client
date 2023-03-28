import React from "react";

import { Solve, Next, SelectSolver } from "./Buttons/";

import styles from "./Panel.module.scss";

export const Panel: React.FC = () => {
  const [solver, setSolver] = React.useState("cd");

  return (
    <div className={styles.buttons}>
      <Solve solver={solver} />
      <Next solver={solver} />
      <SelectSolver solver={solver} setSolver={setSolver} />
    </div>
  );
};
