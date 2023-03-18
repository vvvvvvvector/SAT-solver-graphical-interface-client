import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeError, setDimacs, addError } from "../../../redux/slices/editor";
import { RootState } from "../../../redux/store";

import debounce from "lodash.debounce";

import styles from "./TextArea.module.scss";

const TextArea: React.FC<{
  gutterRef: React.RefObject<HTMLDivElement>;
  errorsRef: React.RefObject<HTMLDivElement>;
}> = ({ gutterRef, errorsRef }) => {
  const dispatch = useDispatch();

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

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

  const handleScroll = React.useCallback(() => {
    if (gutterRef.current && textAreaRef.current && errorsRef.current) {
      const { scrollTop } = textAreaRef.current;

      gutterRef.current.scrollTop = scrollTop;
      errorsRef.current.scrollTop = scrollTop;
    }
  }, []);

  return (
    <textarea
      className={styles.textArea}
      onScroll={handleScroll}
      placeholder="dimacs cnf format allowed here..."
      ref={textAreaRef}
      wrap="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      value={dimacs}
      onChange={(e) => dispatch(setDimacs(e.target.value))}
    />
  );
};

export default TextArea;
