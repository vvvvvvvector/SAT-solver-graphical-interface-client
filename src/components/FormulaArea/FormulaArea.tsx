import React from "react";

import Textarea from "@mui/joy/Textarea";

import FormulaContext from "../../context/FormulaContext";

import styles from "./FormulaArea.module.scss";

export const FormulaArea: React.FC = () => {
  const { formula, setFormula } = React.useContext(FormulaContext);

  return (
    <Textarea
      className={styles.formulaInput}
      value={formula}
      onChange={(event) => setFormula(event.target.value)}
      minRows={15}
      maxRows={15}
      size="lg"
      placeholder="*.cnf file text here..."
    />
  );
};
