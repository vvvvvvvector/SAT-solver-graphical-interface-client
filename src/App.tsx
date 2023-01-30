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

type AnswerType = {
  id: number;
  variables: number[];
};

export default function App() {
  const [formula, setFormula] = React.useState(""); // textArea

  const [solveResponse, setSolverResponse] = React.useState<SolveType>(null); // formula

  const [answers, setAnswers] = React.useState<AnswerType[]>([]);

  // console.log(answers);

  return (
    <>
      <Header />
      <div className="after-header">
        <FormulaContext.Provider value={{ formula, setFormula }}>
          <FormulaArea />
          <Controls
            setAnswers={setAnswers}
            setSolveResponse={setSolverResponse}
          />
        </FormulaContext.Provider>
        {solveResponse && <Formula clauses={solveResponse.clauses} />}

        <div className="container">
          {answers.map((clause, clauseIndex) => (
            <div className="answers" key={clauseIndex}>
              {clause.variables.map((i, variableIndex) => (
                <div className="answer" key={variableIndex}>
                  <Variable
                    variable={{
                      id: variableIndex,
                      index: Math.abs(i),
                      clauseId: clause.id,
                    }}
                  />
                  <span className="equals">=</span>
                  <span className={i > 0 ? "red" : "green"}>
                    {i > 0 ? "FALSE" : "TRUE"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* {nextResponse?.clause.variables.map((i, index) => (
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
        ))} */}
      </div>
    </>
  );
}
