import React from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "../../axios";

import { Button } from "@mui/material";

import styles from "./Linker.module.scss";

const Linker: React.FC = () => {
  const [firstFormulaDefinition, setFirstFormulaDefinition] =
    React.useState("p cnf 100 256");

  const [secondFormulaDefinition, setSecondFormulaDefinition] =
    React.useState("p cnf 4 10");

  const [firstDimacs, setFirstDimacs] = React.useState("hello world 1");
  const [secondDimacs, setSecondDimacs] = React.useState("hello world 2");

  const [loading, setLoading] = React.useState(false);

  const onClickLink = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("/link", {
        firstDimacs,
        secondDimacs,
      });

      setLoading(false);

      toast.success(`success: ${response.data.success}`);
    } catch (error) {
      setLoading(false);

      console.log(error);

      toast.error("Something went wrong!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.linker}>
        <p className={styles.header}>
          Choose and upload two formulas <br /> if You want to connect them in
          one
        </p>
        <div className={styles.formulaUpload}>
          <Button size="large" variant="contained" component="label">
            Upload 1st formula
            <input hidden type="file" accept=".txt, .dimacs" />
          </Button>
          <p>{`First formula definition --> ${firstFormulaDefinition}`}</p>
        </div>
        <div className={styles.formulaUpload}>
          <Button size="large" variant="contained" component="label">
            Upload 2nd formula
            <input hidden type="file" accept=".txt, .dimacs" />
          </Button>
          <p>{`Second formula definition --> ${secondFormulaDefinition}`}</p>
        </div>
        <Button
          sx={{
            maxWidth: "150px",
            width: "100%",
          }}
          disabled={loading}
          size="large"
          variant="outlined"
          onClick={onClickLink}
        >
          {loading ? "Linking..." : "Link"}
        </Button>
      </div>
    </div>
  );
};

export default Linker;
