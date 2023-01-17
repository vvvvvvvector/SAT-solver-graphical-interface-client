import React from "react";

type VariableType = {
  index: number;
};

export const Variable: React.FC<VariableType> = ({ index }) => {
  return (
    <p>
      {index > 0 ? "x" : "~x"}
      <sub>{index > 0 ? index : index * -1}</sub>
    </p>
  );
};
