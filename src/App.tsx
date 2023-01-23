import React from "react";

import { Clause, Formula, Header, Controls, FormulaArea } from "./components";

import FormulaContext from "./context/FormulaContext";

import "./styles.scss";

export default function App() {
  const [formula, setFormula] = React.useState(""); // textArea
  const [response, setResponse] = React.useState({}); // formula

  return (
    <>
      <Header />
      <FormulaContext.Provider value={{ formula, setFormula }}>
        <FormulaArea />
        <Controls setResponse={setResponse} />
      </FormulaContext.Provider>
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
