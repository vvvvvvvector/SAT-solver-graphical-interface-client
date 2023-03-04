import React from "react";

import {
  Formula,
  Header,
  Controls,
  Solutions,
  CnfTextarea,
} from "./components";

import { ClauseType } from "./shared/types";

import CnfContext from "./context/CnfContext";

import "./styles.scss";

export default function App() {
  const [cnf, setCnf] = React.useState(""); // textArea

  const [parsedCnf, setParsedCnf] = React.useState<ClauseType[]>([]); // formula

  const [solutions, setSolutions] = React.useState<ClauseType[]>([]);

  return (
    <>
      <Header />

      <div className="container">
        <div className="left">
          <CnfContext.Provider value={{ cnf, setCnf }}>
            <CnfTextarea />
            <Controls setSolutions={setSolutions} setParsedCnf={setParsedCnf} />
          </CnfContext.Provider>
          {solutions.length > 0 ? (
            <Solutions solutions={solutions} />
          ) : (
            <div className="no-solutions">There are no solutions so far 😭</div>
          )}
        </div>
        {parsedCnf.length > 0 ? (
          <div className="right">
            <Formula clauses={parsedCnf} />
          </div>
        ) : (
          <div className="no-formula">No formula loaded 😭</div>
        )}
      </div>
    </>
  );
}
