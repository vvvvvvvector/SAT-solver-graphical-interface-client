import React from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../../../axios";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";

import { Button } from "@mui/material";

import { buttonStyle } from "../../../../shared/mui";
import { setFormula } from "../../../../redux/slices/formula";
import {
  clearSolutions,
  setSolution,
} from "../../../../redux/slices/solutions";

export const FindAll: React.FC<{ solver: string }> = ({ solver }) => {
  const dispatch = useDispatch();

  const { clauses, changed } = useSelector((state: RootState) => state.formula);
  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const [loading, setLoading] = React.useState(false);

  const onClickFindAll = async () => {
    setLoading(true);

    const response = await axiosInstance.post("/solve", {
      dimacs,
      solver,
    });

    if (response.data.satisfiable) {
      dispatch(setFormula(response.data.clauses.slice(0, -1)));

      sessionStorage.setItem("formula", JSON.stringify(response.data.clauses));

      dispatch(clearSolutions());
      dispatch(setSolution(response.data.first_solution));

      let loop = true;

      while (loop) {
        const response = await axiosInstance.post("/next-solution", {
          solver,
          formula: sessionStorage.getItem("formula"),
        });

        if (response.data.satisfiable) {
          dispatch(setSolution(response.data.next_solution));

          sessionStorage.setItem(
            "formula",
            JSON.stringify(response.data.clauses)
          );
        } else {
          loop = false;
        }
      }
    }

    setLoading(false);

    toast.success("Successfully found all solutions!");
  };

  const onClickFindOther = async () => {
    setLoading(true);

    let loop = true;

    while (loop) {
      const response = await axiosInstance.post("/next-solution", {
        solver,
        formula: sessionStorage.getItem("formula"),
      });

      if (response.data.satisfiable) {
        dispatch(setSolution(response.data.next_solution));

        sessionStorage.setItem(
          "formula",
          JSON.stringify(response.data.clauses)
        );
      } else {
        loop = false;
      }
    }

    setLoading(false);

    toast.success("Successfully found all other solutions!");
  };

  return (
    <>
      {clauses.length > 0 && !changed ? (
        <Button
          disabled={errors.length > 0 || loading}
          onClick={onClickFindOther}
          sx={buttonStyle}
          variant="contained"
        >
          {loading ? "Finding..." : "Find other solutions"}
        </Button>
      ) : (
        <Button
          disabled={dimacs.length === 0 || errors.length > 0}
          onClick={onClickFindAll}
          sx={buttonStyle}
          variant="contained"
        >
          Find All
        </Button>
      )}
    </>
  );
};
