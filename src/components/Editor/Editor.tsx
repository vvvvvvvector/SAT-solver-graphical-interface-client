import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeError, setDimacs, addError } from "../../redux/slices/editor";
import { RootState } from "../../redux/store";

import styles from "./Editor.module.scss";

export const Editor: React.FC = () => {
  const dispatch = useDispatch();

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const gutterRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const errorsRef = React.useRef<HTMLDivElement>(null);

  const length = React.useMemo(() => dimacs.match(/\n/g)?.length, [dimacs]);

  React.useEffect(() => {
    const lineByLineDimacs = dimacs.split("\n");

    const formulaDefinition = /^p\scnf\s[1-9]+\s[1-9]+$/;
    const endsWithZero = /0$/;
    // const correctClause = /^(?:-?[1-9])+ 0$/;

    lineByLineDimacs.forEach((line, index) => {
      if (line.startsWith("c")) return;

      const error = errors.find((error) => error.line === index + 1);

      if (line === "" && index !== lineByLineDimacs.length - 1) {
        const newError = {
          line: index + 1,
          text: "err: empty line",
        };

        if (!error) dispatch(addError(newError));
      } else if (line === "0") {
        const newError = {
          line: index + 1,
          text: "err: clause must contain at least one variable",
        };

        if (!error) dispatch(addError(newError));
      } else if (!line.match(formulaDefinition) && line.startsWith("p")) {
        const newError = {
          line: index + 1,
          text: "err: invalid formula definition",
        };

        if (!error) dispatch(addError(newError));
      } else if (
        !line.match(endsWithZero) &&
        line !== "" &&
        !line.startsWith("p")
      ) {
        const newError = {
          line: index + 1,
          text: "err: line must end with 0",
        };

        if (!error) dispatch(addError(newError));
      } else {
        if (error) dispatch(removeError(index));
      }
    });
  }, [dimacs]);

  return (
    <div className={styles.editor}>
      <div ref={gutterRef} className={styles.gutter}>
        <div>
          {[...Array(length ? length + 1 : 1)].map((_, index) => (
            <div className={`${styles["gutter-cell"]}`} key={index}>
              {`${index + 1}`}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <textarea
          onScroll={() => {
            if (gutterRef.current && textAreaRef.current && errorsRef.current) {
              const { scrollTop } = textAreaRef.current;

              gutterRef.current.scrollTop = scrollTop;
              errorsRef.current.scrollTop = scrollTop;
            }
          }}
          placeholder="dimacs cnf format allowed here..."
          ref={textAreaRef}
          wrap="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={dimacs}
          onChange={(e) => dispatch(setDimacs(e.target.value))}
        />
        <div ref={errorsRef} className={styles.lines}>
          {errors.map((error, index) => (
            <div
              key={index}
              className={styles.line}
              style={{
                top: `${(error.line - 1) * 20 - index * 20}px`,
              }}
            >
              {error.text}
            </div>
          ))}
          <div
            className={styles.line}
            style={{
              top: `2e6px`,
            }}
          >
            hello world
          </div>
        </div>
      </div>
    </div>
  );
};
