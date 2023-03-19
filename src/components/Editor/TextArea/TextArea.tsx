import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setDimacs } from "../../../redux/slices/editor";
import { RootState } from "../../../redux/store";

import styles from "./TextArea.module.scss";

const TextArea: React.FC<{
  gutterRef: React.RefObject<HTMLDivElement>;
  errorsRef: React.RefObject<HTMLDivElement>;
}> = ({ gutterRef, errorsRef }) => {
  const dispatch = useDispatch();

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const { dimacs } = useSelector((state: RootState) => state.editor);

  return (
    <textarea
      className={styles.textArea}
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
  );
};

export default TextArea;
