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
        <div className="content">
          <CnfContext.Provider value={{ cnf, setCnf }}>
            <CnfTextarea />
            <Controls setSolutions={setSolutions} setParsedCnf={setParsedCnf} />
          </CnfContext.Provider>
          {solutions.length > 0 ? (
            <>
              <Formula clauses={parsedCnf} />
              <Solutions solutions={solutions} />
            </>
          ) : (
            <div className="no-upload">
              You haven't uploaded any formulas<span>😢</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
