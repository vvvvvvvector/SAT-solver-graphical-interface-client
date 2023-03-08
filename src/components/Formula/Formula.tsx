import React from "react";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { addClause } from "../../redux/slices/formula";
import { RootState } from "../../redux/store";

import { Button } from "@mui/material";

import { Clause } from "../index";

import { buttonStyle } from "../../shared/mui";

import styles from "./Formula.module.scss";

export const Formula: React.FC = () => {
  const dispatch = useDispatch();

  const [opened, setOpened] = React.useState(false);

  const { clauses } = useSelector((state: RootState) => state.formula);

  const onClickAddCluase = () => {
    let input = window.prompt("Enter clause: ");

    let clause = input?.split("|").map((item) => parseInt(item));

    if (clause) {
      dispatch(addClause(clause));
      toast.success("Clause was successfully added!");
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles["header__left"]}>
          <h2 onClick={() => setOpened(!opened)}>
            {clauses.length > 0
              ? "Formula in CNF"
              : "There are no formula so far"}
          </h2>
          <svg
            className={opened ? styles["active"] : ""}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </div>
        {opened && (
          <Button
            onClick={onClickAddCluase}
            sx={buttonStyle}
            variant="contained"
          >
            Add clause
          </Button>
        )}
      </div>
      {opened && (
        <div className={styles["formula-container"]}>
          {clauses.length > 0 ? (
            <ul className={styles.formula}>
              {clauses.map((clause, index) => (
                <li key={clause.id}>
                  <Clause clause={clause} />
                  {clauses.length - 1 > index && <span>&#8743;</span>}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles["no-formula"]}>
              <span>😭😭😭</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
