import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { clearDimacs, setDimacs } from "../../redux/slices/editor";

import { Pagination } from "@mui/material";

import FormulaHeader from "./FormulaHeader/FormulaHeader";
import NoFormula from "./NoFormula/NoFormula";
import Clause from "./Clause/Clause";

import { parseToDimacs } from "./../../utils/utils";

import styles from "./Formula.module.scss";

export const Formula: React.FC = () => {
  const dispatch = useDispatch();

  const clausesPerPage = 115;

  const [page, setPage] = React.useState(0);

  const { clauses, opened, changed } = useSelector(
    (state: RootState) => state.formula
  );

  // Reset page to first while setting new clauses via dimacs (formula)
  React.useEffect(() => {
    /*
      if (!changed) -> formula was just loaded and solved for the first time
      else -> formula in CNF was just edited(remove/edit/add clause)
    */
    if (!changed) {
      setPage(0);
    } else {
      if (clauses.length > 0) {
        dispatch(setDimacs(parseToDimacs(clauses)));
      } else {
        dispatch(clearDimacs());
      }
    }
  }, [clauses]);

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
          <div className={styles.formulaContainer}>
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
              page={page / clausesPerPage + 1}
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
