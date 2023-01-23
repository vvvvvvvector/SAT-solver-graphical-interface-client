import React from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "./axiosInstance";

import Textarea from "@mui/joy/Textarea";
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

import solvers from "./assets/solvers.json";

import { Variable, Clause, Formula, Header } from "./components";

import "./styles.scss";

export default function App() {
  const [formula, setFormula] = React.useState("");
  const [response, setResponse] = React.useState({});

  const [solveLoading, setSolveLoading] = React.useState(false); // controls(buttons) async action 1
  const [solveOneMoreLoading, setSolveOneMoreLoading] = React.useState(false); // controls(buttons) async action 2

  const [solver, setSolver] = React.useState("cd"); // controls(buttons)

  return (
    <>
      <Header />
      <Textarea
        sx={{
          marginBottom: "20px",
        }}
        value={formula}
        onChange={(event) => setFormula(event.target.value)}
        minRows={15}
        maxRows={15}
        size="lg"
        placeholder="*.cnf file text here..."
      />
      <Stack
        direction="row"
        spacing={3}
        sx={{
          marginBottom: "20px",
        }}
      >
        <Button
          sx={{
            minWidth: "175px",
          }}
          disabled={solveLoading}
          endIcon={<CalculateIcon />}
          onClick={async () => {
            try {
              if (formula.length > 0) {
                setSolveLoading(true);

                const response = await axiosInstance.post("solve-my-problem", {
                  solver,
                  formula,
                });

                setSolveLoading(false);

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
          }}
          variant="contained"
        >
          {solveLoading ? "Solving..." : "Solve Problem"}
        </Button>
        <Button
          sx={{
            minWidth: "175px",
          }}
          disabled={solveOneMoreLoading}
          variant="contained"
          onClick={async () => {
            try {
              if (formula.length > 0) {
                setSolveOneMoreLoading(true);

                const response = await axiosInstance.get("find-next-solution");

                setSolveOneMoreLoading(false);

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
          }}
        >
          {solveOneMoreLoading ? "Finding..." : "Find next solution"}
        </Button>
        <FormControl sx={{ minWidth: "175px" }}>
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
          variant="contained"
          component="label"
          endIcon={<UploadFileIcon />}
        >
          Upload Formula
          <input
            onChange={(e) => {
              if (e.target.files instanceof FileList) {
                const file = e.target.files[0];
                console.log(file);
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = () => {
                  toast.success("Formula was successfully uploaded!");
                  console.log(reader.result);
                  setFormula(reader.result as string);
                };
              } else {
                console.log("error handler");
              }
            }}
            hidden
            accept=".txt, .cnf"
            type="file"
          />
        </Button>
      </Stack>
      <Clause
        clause={{
          id: 0,
          variables: [1, 2, 3],
        }}
      />
      <Clause
        clause={{
          id: 0,
          variables: [-1, 2, -3, 4],
        }}
      />
      <Formula
        clauses={[
          {
            id: 0,
            variables: [1, -3],
          },
          {
            id: 1,
            variables: [2, 3, -1],
          },
          {
            id: 2,
            variables: [1, 2, 3],
          },
          {
            id: 3,
            variables: [1, -2, 3],
          },
          {
            id: 4,
            variables: [-1, -2, 3],
          },
          {
            id: 5,
            variables: [-1, -2, -3],
          },
          {
            id: 6,
            variables: [-1, 2, -3],
          },
        ]}
      />
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </>
  );
}
