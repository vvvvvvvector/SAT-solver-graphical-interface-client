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

type ControlsType = {
  formula: string;
  setFormula: (value: string) => void;
  setResponse: (value: any) => void;
};

export const Controls: React.FC<ControlsType> = ({
  formula,
  setFormula,
  setResponse,
}) => {
  const [solver, setSolver] = React.useState("cd"); // controls(buttons)
  const [loading, setLoading] = React.useState(false); // controls(buttons) async action

  const onClickSolve = async () => {
    try {
      if (formula.length > 0) {
        setLoading(true);

        const response = await axiosInstance.post("solve-my-problem", {
          solver,
          formula,
        });

        setLoading(false);

        setResponse(response.data);
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

        setResponse(response.data);
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
    } else {
      console.log("error handler");
    }
  };

  return (
    <Stack className={styles.controlsPanel} direction="row" spacing={3}>
      <Button
        className={styles.controlButton}
        disabled={loading}
        endIcon={<CalculateIcon />}
        onClick={onClickSolve}
        variant="contained"
      >
        {loading ? "Solving..." : "Solve Problem"}
      </Button>
      <Button
        className={styles.controlButton}
        disabled={loading}
        variant="contained"
        onClick={onClickNext}
      >
        {loading ? "Finding..." : "Find next solution"}
      </Button>
      <FormControl className={styles.controlButton}>
        <InputLabel id="select-solver-label">SAT-solver</InputLabel>
        <Select
          labelId="select-solver-label"
          label="SAT-solver"
          id="select-solver"
          value={solver}
          onChange={(event) => {
            setSolver(event.target.value);
          }}
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
          onChange={onClickUpload}
          hidden
          accept=".txt, .cnf"
          type="file"
        />
      </Button>
    </Stack>
  );
};
