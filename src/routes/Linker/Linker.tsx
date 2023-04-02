import React from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "../../axios";

import { Paste, Link } from "./Buttons";
import UploadedFormula from "./UploadedFormula/UploadedFormula";

import styles from "./Linker.module.scss";

const Linker: React.FC = () => {
  const [firstDimacs, setFirstDimacs] = React.useState("");
  const [secondDimacs, setSecondDimacs] = React.useState("");

  const [linked, setLinked] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const onClickLink = async () => {
    const firstDimacsFiltered = firstDimacs
      .split("\n")
      .filter((line) => {
        return line.match(
          /^p\s+cnf\s+[1-9][0-9]*\s+[1-9][0-9]*\s*$|^\s*(?:-?[1-9][0-9]*\s+)+0\s*$/
        );
      })
      .join("\n");

    const secondDimacsFiltered = secondDimacs
      .split("\n")
      .filter((line) => {
        return line.match(
          /^p\s+cnf\s+[1-9][0-9]*\s+[1-9][0-9]*\s*$|^\s*(?:-?[1-9][0-9]*\s+)+0\s*$/
        );
      })
      .join("\n");

    setFirstDimacs(firstDimacsFiltered);
    setSecondDimacs(secondDimacsFiltered);

    try {
      setLoading(true);

      const response = await axiosInstance.post("/link", {
        firstDimacs: firstDimacsFiltered,
        secondDimacs: secondDimacsFiltered,
      });

      setLoading(false);

      setLinked(response.data.result);

      toast.success("Formulas were successfully linked!");
    } catch (error: any) {
      setLoading(false);

      if (error.response.status === 421) {
        // Formulas are the same
        toast.error(error.response.data.detail);
      } else if (error.response.status === 422) {
        // There is no formula definition in the first formula
        toast.error(error.response.data.detail);
      } else if (error.response.status === 423) {
        // There is no formula definition in the second formula
        toast.error(error.response.data.detail);
      } else {
        toast.error("Something went wrong!");
      }

      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.linker}>
        <div className={styles.formulas}>
          <UploadedFormula
            index={1}
            dimacs={firstDimacs}
            setDimacs={setFirstDimacs}
          />
          <UploadedFormula
            index={2}
            dimacs={secondDimacs}
            setDimacs={setSecondDimacs}
          />
        </div>
        <div className={styles.buttons}>
          <Link
            loading={loading}
            onClick={onClickLink}
            disabled={loading || firstDimacs === "" || secondDimacs === ""}
          />
          <Paste dimacs={linked} />
        </div>
      </section>
    </div>
  );
};

export default Linker;
