import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { addError, removeError } from "../../../redux/slices/editor";
import { RootState } from "../../../redux/store";

import debounce from "lodash.debounce";

import styles from "./Errors.module.scss";

const formulaDefinition = /^p\scnf\s[1-9][0-9]*\s[1-9][0-9]*$/;
const lineEndsWithZero = / 0$/;
const validClause = /^(?:-?[1-9][0-9]*\s)+0$/;

const Errors = React.forwardRef<HTMLDivElement>((_, ref) => {
  const dispatch = useDispatch();

  const formulaDefinitionRow = React.useRef(0);
  const isFormulaDefined = React.useRef(false);

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const verify = React.useCallback(
    debounce((dimacs: string) => {
      const lineByLineDimacs = dimacs.split("\n");

      lineByLineDimacs.forEach((line, index) => {
        if (line.startsWith("c")) return;

        const error = errors.find((error) => error.line === index + 1);

        if (line.match(/^p\scnf\s.*$/) && !isFormulaDefined.current) {
          console.log(`formula was defined in line ${index + 1}`);
          isFormulaDefined.current = true;
          formulaDefinitionRow.current = index + 1;
        }

        if (line === "" && index !== lineByLineDimacs.length - 1) {
          if (!error)
            dispatch(
              addError({
                line: index + 1,
                text: "err: empty line",
              })
            );
        } else if (!line.match(formulaDefinition) && line.startsWith("p")) {
          if (!error)
            dispatch(
              addError({
                line: index + 1,
                text: "err: invalid formula definition",
              })
            );
        } else if (
          !line.match(lineEndsWithZero) &&
          line !== "" &&
          !line.startsWith("p")
        ) {
          if (!error)
            dispatch(
              addError({
                line: index + 1,
                text: "err: clause must end with 0",
              })
            );
        } else if (
          !line.match(validClause) &&
          line !== "" &&
          !line.startsWith("p")
        ) {
          if (!error)
            dispatch(
              addError({
                line: index + 1,
                text: "err: invalid clause",
              })
            );
        } else if (
          line.match(/^p\scnf\s.*$/) &&
          isFormulaDefined.current &&
          index + 1 !== formulaDefinitionRow.current
        ) {
          if (!error)
            dispatch(
              addError({
                line: index + 1,
                text: `err: formula was already defined in line ${formulaDefinitionRow.current}`,
              })
            );
        } else {
          if (error) dispatch(removeError(index));
        }
      });
    }, 650),
    []
  );

  React.useEffect(() => {
    formulaDefinitionRow.current = 0;
    isFormulaDefined.current = false;

    verify(dimacs);
  }, [dimacs]);

  return (
    <div ref={ref} className={styles.errors}>
      {errors.map((error, index) => (
        <div
          key={index}
          className={styles.error}
          style={{
            top: `${(error.line - 1) * 20 - index * 20}px`,
          }}
        >
          {error.text}
        </div>
      ))}
      <div
        className={styles.error}
        style={{
          top: `1e6px`,
        }}
      >
        end of errors
      </div>
    </div>
  );
});

export default Errors;
