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
import { setDimacs } from "../../redux/slices/editor";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";

import { Editor } from "../Editor/Editor";

import solvers from "./Solvers";

import { buttonStyle } from "../../shared/mui";

import styles from "./Panel.module.scss";

export const Panel: React.FC = () => {
  const dispatch = useDispatch();

  const [solver, setSolver] = React.useState("cd");
  const [loading, setLoading] = React.useState(false);

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const { solutions } = useSelector((state: RootState) => state.solutions);

  const onClickSolve = async () => {
    if (errors.length === 0) {
      try {
        const dimacs_without_comments = dimacs.replaceAll(
          /c .*\n|c\n|\nc$|\nc .*|c$/g,
          ""
        );

        setLoading(true);

        const response = await axiosInstance.post("solve", {
          solver,
          dimacs: dimacs_without_comments,
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
        setLoading(false);
        toast.error("Something went wrong!");
        console.error("Something went wrong!", error);
      }
    } else {
      toast.error("There are errors in dimacs!");
    }
  };

  const onClickNext = async () => {
    if (errors.length === 0) {
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
    } else {
      toast.error("There are errors in dimacs!");
    }
  };

  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        toast.success("Formula was successfully uploaded!");

        const dimacs = reader.result as string;

        dispatch(setDimacs(dimacs));
        dispatch(setFormula([]));
      };

      reader.onerror = () => {
        toast.error("Error while reading file!");
      };
    }

    e.target.value = ""; // allows re-add the same file again
  };

  return (
    <>
      <Editor />
      <div className={styles.controls}>
        <Button
          sx={{
            ...buttonStyle,
            maxWidth: "200px",
            width: "100%",
            "@media (max-width: 1200px)": {
              maxWidth: "none",
            },
          }}
          onClick={onClickSolve}
          disabled={loading || dimacs === ""}
          endIcon={<CalculateOutlinedIcon />}
          variant="contained"
        >
          {loading ? "Solving..." : "Solve"}
        </Button>
        <Button
          sx={{
            ...buttonStyle,
            maxWidth: "200px",
            width: "100%",
            whiteSpace: "nowrap",
            "@media (max-width: 1200px)": {
              maxWidth: "none",
            },
          }}
          onClick={onClickNext}
          disabled={loading || dimacs === "" || solutions.length === 0}
          endIcon={<ForwardOutlinedIcon />}
          variant="contained"
        >
          {loading ? "Finding..." : "Next solution"}
        </Button>
        <FormControl
          sx={{
            maxWidth: "200px",
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
