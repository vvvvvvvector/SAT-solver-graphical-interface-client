import React from "react";

import Textarea from "@mui/joy/Textarea";

import { Clause, Formula, Header, Controls } from "./components";

import "./styles.scss";

export default function App() {
  const [formula, setFormula] = React.useState(""); // textArea
  const [response, setResponse] = React.useState({}); // formula

  return (
    <>
      <Header />
      <Textarea
        className="formulaInput"
        value={formula}
        onChange={(event) => setFormula(event.target.value)}
        minRows={15}
        maxRows={15}
        size="lg"
        placeholder="*.cnf file text here..."
      />
      <Controls
        formula={formula}
        setFormula={setFormula}
        setResponse={setResponse}
      />
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
