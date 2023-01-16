import React from "react";
import { toast } from "react-hot-toast";

import axios from "axios";

import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

import "./styles.scss";

export default function App() {
  const [value, setValue] = React.useState("");
  const [response, setResponse] = React.useState({});

  return (
    <>
      <Textarea
        sx={{
          marginBottom: "20px",
        }}
        onChange={(event) => setValue(event.target.value)}
        minRows={15}
        maxRows={15}
        size="lg"
        placeholder="cnf file text here..."
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
              if (value.length > 0) {
                const response = await axios.post(
                  "http://localhost:8000/solve-my-problem",
                  {
                    formula: value,
                  }
                );

                setResponse(response.data);
                console.log(response.data);

                toast.success("Successfully solved!");
              } else {
                toast.error("input can't be empty!");
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
              if (value.length > 0) {
                const response = await axios.get(
                  "http://localhost:8000/solve-one-more"
                );

                if (!response.data.satisfiable) {
                  toast.error("There are no more solutions!");
                } else {
                  toast.success("One more solution successfully founded!");
                }

                setResponse(response.data);
                console.log(response.data);
              } else {
                toast.error("input can't be empty!");
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
    </>
  );
}
