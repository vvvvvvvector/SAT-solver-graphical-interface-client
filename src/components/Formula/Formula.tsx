import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { Pagination } from "@mui/material";

import FormulaHeader from "./FormulaHeader/FormulaHeader";
import NoFormula from "./NoFormula/NoFormula";
import Clause from "./Clause/Clause";

import styles from "./Formula.module.scss";

export const Formula: React.FC = () => {
  const clausesPerPage = 200;
  
  const [page, setPage] = React.useState(0);

  const { clauses, opened } = useSelector((state: RootState) => state.formula);

  const renderFormula = () => {
    const clausesOnPage = clauses.slice(page, page + clausesPerPage);

    if (clausesOnPage.length < clausesPerPage) {
      return clausesOnPage.map((clause, index) => (
        <li key={clause.id}>
          <Clause clause={clause} />
          {clausesOnPage.length - 1 > index && <span>&#8743;</span>}
        </li>
      ));
    } else {
      return clausesOnPage.map((clause) => (
        <li key={clause.id}>
          <Clause clause={clause} />
          <span>&#8743;</span>
        </li>
      ));
    }
  };

  return (
    <>
      <FormulaHeader />
      {opened && (
        <>
          <div className={styles["formula-container"]}>
            {clauses.length > 0 ? (
              <ul className={styles.formula}>{renderFormula()}</ul>
            ) : (
              <NoFormula />
            )}
          </div>
          {clauses.length > clausesPerPage && (
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              color="primary"
              onChange={(_, value: number) =>
                setPage((value - 1) * clausesPerPage)
              }
              count={Math.ceil(clauses.length / clausesPerPage)}
            />
          )}
        </>
      )}
    </>
  );
};
