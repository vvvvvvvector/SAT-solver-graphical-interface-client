import React from "react";

import { Variable, Formula, Header, Controls, FormulaArea } from "./components";

import FormulaContext from "./context/FormulaContext";

import "./styles.scss";

type SolveType = {
  formula: string;
  clauses: {
    id: number;
    variables: number[];
  }[];
  satisfiable: boolean;
} | null;

type NextType = {
  clause: {
    id: number;
    variables: number[];
  };
  satisfiable: boolean;
} | null;

export default function App() {
  const [formula, setFormula] = React.useState(""); // textArea

  const [solveResponse, setSolverResponse] = React.useState<SolveType>(null); // formula
  const [nextResponse, setNextResponse] = React.useState<NextType>(null); // formula

  const [clauses, setClauses] = React.useState([]);

  return (
    <>
      <Header />
      <div className="after-header">
        <FormulaContext.Provider value={{ formula, setFormula }}>
          <FormulaArea />
          <Controls
            setClauses={setClauses}
            setSolveResponse={setSolverResponse}
            setNextResponse={setNextResponse}
          />
        </FormulaContext.Provider>
        {solveResponse && <Formula clauses={clauses} />}
        {nextResponse?.clause.variables.map((i, index) => (
          <div className="answer" key={index}>
            <Variable
              variable={{
                id: index,
                index: Math.abs(i),
                clauseId: nextResponse.clause.id,
              }}
            />
            <span className="equals">=</span>
            <span className={i > 0 ? "red" : "green"}>
              {i > 0 ? "FALSE" : "TRUE"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
