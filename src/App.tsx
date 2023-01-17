import React from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "./axiosInstance";

import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

import "./styles.scss";

const solvers = [
  {
    name: "Cadical",
    short: "cd",
  },
  {
    name: "Gluecard3",
    short: "gc3",
  },
  {
    name: "Gluecard41",
    short: "gc4",
  },
  {
    name: "Glucose3",
    short: "g3",
  },
  {
    name: "Glucose4",
    short: "g4",
  },
  {
    name: "Lingeling",
    short: "lgl",
  },
  {
    name: "Maplechrono",
    short: "mcb",
  },
  {
    name: "Maplecm",
    short: "mcm",
  },
  {
    name: "Maplesat",
    short: "mpl",
  },
  {
    name: "Mergesat3",
    short: "mg3",
  },
  {
    name: "Minicard",
    short: "mc",
  },
  {
    name: "Minisat22",
    short: "m22",
  },
  {
    name: "Minisatgh",
    short: "mgh",
  },
];

// 1. variable component
// 2. clause component
// 3. formula component

import { Variable, Clause, Formula } from "./components";

export default function App() {
  const [formula, setFormula] = React.useState("p cnf 3 2\n1 -3 0\n2 3 -1 0");
  const [response, setResponse] = React.useState({});

  return (
    <>
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
          onClick={async () => {
            try {
              if (formula.length > 0) {
                const response = await axiosInstance.post("solve-my-problem", {
                  formula,
                });

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
          Solve problem
        </Button>
        <Button
          variant="outlined"
          onClick={async () => {
            try {
              if (formula.length > 0) {
                const response = await axiosInstance.get("solve-one-more");

                if (!response.data.satisfiable) {
                  toast.error("There are no more solutions!");
                } else {
                  toast.success("One more solution successfully founded!");
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
          Solve one more
        </Button>
      </Stack>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <Variable index={1} />
      <Variable index={-2} />
      <Clause variables={[1, 2, 3]} />
      <Clause variables={[1, -2, -3]} />
      <Formula
        clauses={[
          [1, -3],
          [2, 3, -1],
          [1, 2, 3],
          [1, -2, 3],
          [-1, -2, 3],
          [-1, -2, -3],
          [-1, 2, -3],
        ]}
      />
    </>
  );
}
