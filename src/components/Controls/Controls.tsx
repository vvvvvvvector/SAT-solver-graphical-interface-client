import React from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../axiosInstance";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import { Stack } from "@mui/system";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalculateIcon from "@mui/icons-material/Calculate";

import solvers from "../../assets/solvers.json";

import styles from "./Controls.module.scss";
import FormulaContext from "../../context/FormulaContext";

type ControlsType = {
  setClauses: (value: any) => void;
  setSolveResponse: (value: any) => void;
  setNextResponse: (value: any) => void;
};

export const Controls: React.FC<ControlsType> = ({
  setClauses,
  setSolveResponse,
  setNextResponse,
}) => {
  const [solver, setSolver] = React.useState("cd"); // controls(buttons)
  const [loading, setLoading] = React.useState(false); // controls(buttons) async action

  const { formula, setFormula } = React.useContext(FormulaContext);

  const onClickSolve = async () => {
    try {
      if (formula.length > 0) {
        setLoading(true);

        const response = await axiosInstance.post("solve-my-problem", {
          solver,
          formula,
        });

        setLoading(false);

        setSolveResponse(response.data);
        setClauses(response.data.clauses);
        console.log(response.data);

        toast.success("Successfully solved!");
      } else {
        toast.error("Input can't be empty!");
      }
    } catch (error) {
      toast.error("Something went wrong!");

      console.error("Something went wrong!", error);
    }
  };

  const onClickNext = async () => {
    try {
      if (formula.length > 0) {
        setLoading(true);

        const response = await axiosInstance.get("find-next-solution");

        setLoading(false);

        if (!response.data.satisfiable) {
          toast.error("There are no more solutions!");
        } else {
          toast.success("One more solution was successfully found!");
        }

        setNextResponse(response.data);
        setClauses((prev: number[]) => [...prev, response.data.clause]);

        console.log(response.data);
      } else {
        toast.error("Input can't be empty!");
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
        setFormula(reader.result as string);
      };

      reader.onerror = () => {
        toast.error("Error while reading file!");
      };
    }
  };

  return (
    <Stack className={styles.controlsPanel} direction="row" spacing={3}>
      <Button
        className={styles.controlButton}
        onClick={onClickSolve}
        disabled={loading}
        endIcon={<CalculateIcon />}
        variant="contained"
      >
        {loading ? "Solving..." : "Solve Problem"}
      </Button>
      <Button
        className={styles.controlButton}
        onClick={onClickNext}
        disabled={loading}
        variant="contained"
      >
        {loading ? "Finding..." : "Find next solution"}
      </Button>
      <FormControl sx={{ minWidth: "175px" }}>
        <InputLabel id="select-solver-label">SAT-solver</InputLabel>
        <Select
          id="select-solver"
          labelId="select-solver-label"
          label="SAT-solver"
          onChange={(event) => {
            setSolver(event.target.value);
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
        className={styles.controlButton}
        variant="contained"
        component="label"
        endIcon={<UploadFileIcon />}
      >
        Upload Formula
        <input
          hidden
          type="file"
          onChange={onClickUpload}
          accept=".txt, .cnf"
        />
      </Button>
    </Stack>
  );
};
