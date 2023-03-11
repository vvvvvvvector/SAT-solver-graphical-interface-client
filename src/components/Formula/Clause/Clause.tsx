import React from "react";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { editClause, removeClause } from "../../../redux/slices/formula";
import { clearDimacs } from "../../../redux/slices/panel";
import { clearSolutions } from "../../../redux/slices/solutions";

import SaveIcon from "@mui/icons-material/Save";

import { Variable } from "./Variable/Variable";

import { ClauseType } from "../../../shared/types";

import styles from "./Clause.module.scss";

export const Clause: React.FC<{ clause: ClauseType }> = ({ clause }) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = React.useState(false);
  const [value, setValue] = React.useState("");

  const onRemoveClause = () => {
    dispatch(removeClause(clause.id));

    toast.success("Clause was successfully removed!");

    sessionStorage.clear();
    dispatch(clearDimacs());
    dispatch(clearSolutions());
  };

  const onEditClause = () => {
    dispatch(
      editClause({
        id: clause.id,
        editedClause: value.split("|").map((i) => parseInt(i)),
      })
    );

    setEditMode(false);

    toast.success("Clause was successfully updated!");

    sessionStorage.clear();
    dispatch(clearDimacs());
    dispatch(clearSolutions());
  };

  return (
    <div className={styles.container}>
      {editMode ? (
        <div className={styles.edit}>
          <input
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter") onEditClause();
              if (event.key === "Escape") setEditMode(false);
            }}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <SaveIcon
            onClick={onEditClause}
            fontSize="small"
            className={styles.save}
          />
        </div>
      ) : (
        <>
          <ul className={styles.clause}>
            <p>(</p>
            {clause.variables.map((i, index) => (
              <li key={index}>
                <Variable
                  variable={{ id: index, index: i, clauseId: clause.id }}
                />
                {clause.variables.length - 1 > index && <span>&#8744;</span>}
              </li>
            ))}
            <p>)</p>
          </ul>
          <div className={styles.controls}>
            <svg
              onClick={() => {
                setEditMode(true);
                setValue(clause.variables.join("|"));
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="17px"
              height="17px"
            >
              <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" />
            </svg>
            <svg
              onClick={onRemoveClause}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="17px"
              height="17px"
            >
              <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};
