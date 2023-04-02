import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { Paste, Link } from "./Buttons";
import UploadedFormula from "./UploadedFormula/UploadedFormula";

import styles from "./Linker.module.scss";

const Linker: React.FC = () => {
  const { first, second, linked } = useSelector(
    (state: RootState) => state.linker
  );

  return (
    <div className={styles.container}>
      <section className={styles.linker}>
        <div className={styles.formulas}>
          <UploadedFormula index={1} dimacs={first} />
          <UploadedFormula index={2} dimacs={second} />
        </div>
        <div className={styles.buttons}>
          <Link />
          <Paste dimacs={linked} />
        </div>
      </section>
    </div>
  );
};

export default Linker;
