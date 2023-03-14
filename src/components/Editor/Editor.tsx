import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setDimacs } from "../../redux/slices/panel";
import { RootState } from "../../redux/store";

import styles from "./Editor.module.scss";

export const Editor: React.FC = () => {
  const dispatch = useDispatch();

  const [length, setLength] = React.useState(1);

  const gutterRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const { dimacs } = useSelector((state: RootState) => state.panel);

  React.useEffect(() => {
    setLength(dimacs.split("\n").length);
  }, [dimacs]);

  return (
    <div className={styles.editor}>
      <div ref={gutterRef} className={styles.gutter}>
        <div>
          {[...Array(length)].map((_, index) => (
            <div className={`${styles["gutter-cell"]}`} key={index}>
              {`${index + 1}`}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <textarea
          onScroll={() => {
            if (gutterRef.current && textAreaRef.current) {
              gutterRef.current.scrollTop = textAreaRef.current.scrollTop;
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
      </div>
    </div>
  );
};
