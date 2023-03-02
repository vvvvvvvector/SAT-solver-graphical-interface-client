import React from "react";

import Textarea from "@mui/joy/Textarea";

import CnfContext from "../../context/CnfContext";

import styles from "./CnfTextarea.module.scss";

export const CnfTextarea: React.FC = () => {
  const { cnf, setCnf } = React.useContext(CnfContext);

  return (
    <Textarea
      className={styles.cnfInput}
      value={cnf}
      onChange={(event) => setCnf(event.target.value)}
      minRows={15}
      maxRows={15}
      size="lg"
      placeholder="*.cnf file text here..."
    />
  );
};
