import React from "react";

import { Formula, Header, Controls, FormulaArea, Answers } from "./components";

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

  const [solveResponse, setSolveResponse] = React.useState<SolveType>(null); // formula

  const [answers, setAnswers] = React.useState<AnswerType[]>([]);

  return (
    <>
      <Header />

      <div className="after-header">
        <FormulaContext.Provider value={{ formula, setFormula }}>
          <FormulaArea />
          <Controls
            setAnswers={setAnswers}
            setSolveResponse={setSolveResponse}
          />
        </FormulaContext.Provider>

        {solveResponse && <Formula clauses={solveResponse.clauses} />}

        <Answers answers={answers} />
      </div>
    </>
  );
}
