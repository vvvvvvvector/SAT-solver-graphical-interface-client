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
import { setDimacs, setSolver } from "../../redux/slices/panel";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import Textarea from "@mui/joy/Textarea";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalculateIcon from "@mui/icons-material/Calculate";

import solvers from "./Solvers.json";

import { buttonStyle } from "../../shared/mui";

import styles from "./Panel.module.scss";

export const Panel: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const { solver, dimacs } = useSelector((state: RootState) => state.panel);

  const onClickSolve = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("solve", {
        solver,
        dimacs,
      });

      setLoading(false);

      if (response.data.satisfiable) {
        dispatch(setFormula(response.data.clauses.slice(0, -1)));

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
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Something went wrong!", error);
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
      toast.error("Something went wrong!");
      console.error("Something went wrong!", error);
    }
  };

  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        toast.success("Formula was successfully uploaded!");
        dispatch(setDimacs(reader.result as string));
      };

      reader.onerror = () => {
        toast.error("Error while reading file!");
      };
    }

    e.target.value = ""; // allows re-add the same file again
  };

  return (
    <>
      <Textarea
        sx={{
          marginBottom: "20px",
        }}
        value={dimacs}
        onChange={(event) => dispatch(setDimacs(event.target.value))}
        minRows={7}
        maxRows={12}
        size="lg"
        placeholder="dimacs cnf format allowed here..."
      />
      <div className={styles.controls}>
        <Button
          sx={{
            ...buttonStyle,
            maxWidth: "155px",
            width: "100%",
            "@media (max-width: 1200px)": {
              maxWidth: "none",
            },
          }}
          onClick={onClickSolve}
          disabled={loading || dimacs === ""}
          endIcon={<CalculateIcon />}
          variant="contained"
        >
          {loading ? "Solving..." : "Solve"}
        </Button>
        <Button
          sx={{
            ...buttonStyle,
            maxWidth: "160px",
            width: "100%",
            whiteSpace: "nowrap",
            "@media (max-width: 1200px)": {
              maxWidth: "none",
            },
          }}
          onClick={onClickNext}
          disabled={loading || dimacs === ""}
          variant="contained"
        >
          {loading ? "Finding..." : "Next solution"}
        </Button>
        <FormControl
          sx={{
            maxWidth: "150px",
            width: "100%",
            "@media (max-width: 1200px)": {
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
              dispatch(setSolver(event.target.value));
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
        <Button
          sx={{
            ...buttonStyle,
            maxWidth: "240px",
            width: "100%",
            whiteSpace: "nowrap",
            "@media (max-width: 1200px)": {
              maxWidth: "none",
            },
          }}
          variant="contained"
          component="label"
          endIcon={<UploadFileIcon />}
        >
          Upload Formula
          <input
            hidden
            type="file"
            onChange={onClickUpload}
            accept=".txt, .dimacs"
          />
        </Button>
      </div>
    </>
  );
};
