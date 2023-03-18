import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import styles from "./Errors.module.scss";

const Errors = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { errors } = useSelector((state: RootState) => state.editor);

  return (
    <div ref={ref} className={styles.errors}>
      {errors.map((error, index) => (
        <div
          key={index}
          className={styles.error}
          style={{
            top: `${(error.line - 1) * 20 - index * 20}px`,
          }}
        >
          {error.text}
        </div>
      ))}
      <div
        className={styles.error}
        style={{
          top: `2e6px`,
        }}
      >
        hello world
      </div>
    </div>
  );
});

export default Errors;
