import React from "react";

import VariableValue from "./VariableValue/VariableValue";

import styles from "./Solution.module.scss";

const Solution: React.FC<{
  solution: number[];
  onClickSolution: () => void;
}> = ({ solution, onClickSolution }) => {
  return (
    <div onClick={onClickSolution} className={styles["solutions"]}>
      {solution.map((value, valueIndex) => (
        <VariableValue key={valueIndex} value={value} />
      ))}
    </div>
  );
};

export default Solution;
