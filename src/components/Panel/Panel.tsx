import React from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setFormula } from "../../redux/slices/formula";
import {
  setFirstSolution,
  setNextSolution,
  clearSolutions,
} from "../../redux/slices/solutions";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";

import solvers from "./Solvers";

import { buttonStyle } from "../../shared/mui";

import styles from "./Panel.module.scss";

export const Panel: React.FC = () => {
  const dispatch = useDispatch();

  const [solver, setSolver] = React.useState("cd");
  const [loading, setLoading] = React.useState(false);
  const [isNextActive, setIsNextActive] = React.useState(false);

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const { solutions } = useSelector((state: RootState) => state.solutions);

  const onClickSolve = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("solve", {
        solver,
        dimacs: dimacs.replaceAll(/c .*\n|c\n|\nc$|\nc .*|c$/g, ""),
      });

      setLoading(false);

      if (response.data.satisfiable) {
        dispatch(setFormula(response.data.clauses.slice(0, -1)));

        setIsNextActive(true);

        sessionStorage.setItem(
          "formula",
          JSON.stringify(response.data.clauses)
        );

        dispatch(setFirstSolution(response.data.first_solution));

        toast.success("Satisfiable!");
      } else {
        dispatch(setFormula(response.data.clauses));
        dispatch(clearSolutions());

        toast.error("Unsatisfiable!");
      }
    } catch (error: any) {
      setLoading(false);
      setIsNextActive(false);

      if (error.response.status === 418) {
        toast.error(error.response.data.detail);
      } else if (error.response.status === 419) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Something went wrong!");
      }

      console.error(error);
    }
  };

  const onClickNext = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("next-solution", {
        solver,
        formula: sessionStorage.getItem("formula"),
      });

      setLoading(false);

      if (response.data.satisfiable) {
        sessionStorage.setItem(
          "formula",
          JSON.stringify(response.data.clauses)
        );

        dispatch(setNextSolution(response.data.next_solution));

        toast.success("Next solution was successfully found!");
      } else {
        toast.error("There are no more solutions!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.error("Something went wrong!", error);
    }
  };

  return (
    <div className={styles.controls}>
      <Button
        sx={{
          ...buttonStyle,
          maxWidth: "320px",
          width: "100%",
          "@media (max-width: 1400px)": {
            maxWidth: "none",
          },
        }}
        onClick={onClickSolve}
        disabled={loading || dimacs === "" || errors.length > 0}
        endIcon={<CalculateOutlinedIcon />}
        variant="contained"
      >
        {loading ? "Solving..." : errors.length > 0 ? "Fix errors" : "Solve"}
      </Button>
      <Button
        sx={{
          ...buttonStyle,
          maxWidth: "320px",
          width: "100%",
          whiteSpace: "nowrap",
          "@media (max-width: 1400px)": {
            maxWidth: "none",
          },
        }}
        onClick={onClickNext}
        disabled={
          loading ||
          dimacs === "" ||
          solutions.length === 0 ||
          errors.length > 0 ||
          !isNextActive
        }
        endIcon={<ForwardOutlinedIcon />}
        variant="contained"
      >
        {loading ? "Finding..." : "Next solution"}
      </Button>
      <FormControl
        sx={{
          maxWidth: "320px",
          width: "100%",
          "@media (max-width: 1400px)": {
            maxWidth: "none",
          },
        }}
      >
        <InputLabel id="select-solver-label">SAT-solver</InputLabel>
        <Select
          id="select-solver"
          labelId="select-solver-label"
          label="SAT-solver"
          onChange={(event) => {
            setSolver(event.target.value as string);
          }}
          value={solver}
        >
          {solvers.map((i, index) => (
            <MenuItem key={index} value={i.short}>
              {i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
