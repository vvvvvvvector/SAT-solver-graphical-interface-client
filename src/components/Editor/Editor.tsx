import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeError, setDimacs, addError } from "../../redux/slices/editor";
import { RootState } from "../../redux/store";

import debounce from "lodash.debounce";

import styles from "./Editor.module.scss";

export const Editor: React.FC = () => {
  const dispatch = useDispatch();

  const gutterRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const errorsRef = React.useRef<HTMLDivElement>(null);

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const length = React.useMemo(() => dimacs.match(/\n/g)?.length, [dimacs]);

  const verify = React.useCallback(
    debounce((dimacs: string) => {
      const lineByLineDimacs = dimacs.split("\n");

      const formulaDefinition = /^p\scnf\s[1-9][0-9]*\s[1-9][0-9]*$/;
      const lineEndsWithZero = / 0$/;
      const validClause = /^(?:-?[1-9][0-9]*\s)+0$/;

      lineByLineDimacs.forEach((line, index) => {
        if (line.startsWith("c")) return;

        const error = errors.find((error) => error.line === index + 1);

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
        } else {
          if (error) dispatch(removeError(index));
        }
      });
    }, 650),
    []
  );

  React.useEffect(() => {
    verify(dimacs);
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
