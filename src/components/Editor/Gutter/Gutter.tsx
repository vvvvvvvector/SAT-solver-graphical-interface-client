import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import styles from "./Gutter.module.scss";

const Gutter = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { dimacs } = useSelector((state: RootState) => state.editor);

  const length = React.useMemo(() => dimacs.split("\n").length, [dimacs]);

  return (
    <div ref={ref} className={styles.gutter}>
      <div>
        {[...Array(length)].map((_, index) => (
          <div className={`${styles["gutter-cell"]}`} key={index}>
            {`${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Gutter;
