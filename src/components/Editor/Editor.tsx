import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setDimacs } from "../../redux/slices/panel";
import { RootState } from "../../redux/store";

import styles from "./Editor.module.scss";

type ErrorType = {
  line: number;
  text: string;
};

export const Editor: React.FC = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = React.useState<ErrorType[]>([]);

  const { dimacs } = useSelector((state: RootState) => state.panel);

  const gutterRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const errorsRef = React.useRef<HTMLDivElement>(null);

  const lineByLineDimacs = React.useMemo(() => dimacs.split("\n"), [dimacs]);

  React.useEffect(() => {
    const lineEndsWithZero = new RegExp("0$");

    for (let i = 1; i < lineByLineDimacs.length; i++) {
      if (!lineEndsWithZero.test(lineByLineDimacs[i])) {
        const newError = {
          line: i + 1,
          text: "error: line must end with 0",
          checked: true,
        };

        if (!errors.some((error) => error.line === newError.line)) {
          setErrors((prev) => [
            ...prev,
            {
              line: i + 1,
              text: "error: line must end with 0",
              checked: true,
            },
          ]);
        }
      } else {
        setErrors((prev) => prev.filter((error) => error.line !== i + 1));
      }
    }
  }, [lineByLineDimacs]);

  return (
    <div className={styles.editor}>
      <div ref={gutterRef} className={styles.gutter}>
        <div>
          {[...Array(lineByLineDimacs.length)].map((_, index) => (
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
              gutterRef.current.scrollTop = textAreaRef.current.scrollTop;
              errorsRef.current.scrollTop = gutterRef.current.scrollTop;
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
