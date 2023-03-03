import React from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../axios";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalculateIcon from "@mui/icons-material/Calculate";

import { ControlsType } from "../../shared/types";

import solvers from "./solvers.json";

import styles from "./Controls.module.scss";

import CnfContext from "../../context/CnfContext";

export const Controls: React.FC<ControlsType> = ({
  setParsedCnf,
  setSolutions,
}) => {
  const [solver, setSolver] = React.useState("cd");
  const [loading, setLoading] = React.useState(false);

  const { cnf, setCnf } = React.useContext(CnfContext);

  const onClickSolve = async () => {
    try {
      if (cnf.length > 0) {
        setLoading(true);

        const response = await axiosInstance.post("solve", {
          solver,
          cnf,
        });

        setLoading(false);

        if (response.data.satisfiable) {
          setParsedCnf(response.data.clauses);
          setSolutions([response.data.model]);
          toast.success("Successfully solved!");
        }
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
      if (cnf.length > 0) {
        setLoading(true);

        const response = await axiosInstance.get("next-solution");

        setLoading(false);

        if (response.data.satisfiable) {
          setSolutions((prev: any) => [...prev, response.data.clause]);

          toast.success("Next solution was successfully found!");
        } else {
          toast.error("There are no more solutions!");
        }
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
        setCnf(reader.result as string);
      };

      reader.onerror = () => {
        toast.error("Error while reading file!");
      };
    }
  };

  return (
    <div className={styles.panel}>
      <Button
        sx={{
          maxWidth: "120px",
          width: "100%",
        }}
        onClick={onClickSolve}
        disabled={loading}
        endIcon={<CalculateIcon />}
        variant="contained"
      >
        {loading ? "Solving..." : "Solve"}
      </Button>
      <Button
        sx={{
          maxWidth: "160px",
          width: "100%",
          whiteSpace: "nowrap",
        }}
        onClick={onClickNext}
        disabled={loading}
        variant="contained"
      >
        {loading ? "Finding..." : "Next solution"}
      </Button>
      <FormControl
        sx={{
          maxWidth: "150px",
          width: "100%",
        }}
      >
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
        sx={{
          maxWidth: "240px",
          width: "100%",
          whiteSpace: "nowrap",
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
          accept=".txt, .cnf"
        />
      </Button>
    </div>
  );
};
