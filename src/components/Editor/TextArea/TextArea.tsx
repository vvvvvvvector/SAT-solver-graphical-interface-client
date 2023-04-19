import React, { FC, RefObject, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { setDimacs } from '../../../redux/slices/editor';
import { setFormula } from '../../../redux/slices/formula';

import styles from './TextArea.module.scss';

interface TextAreaProps {
  gutterRef: RefObject<HTMLDivElement>;
  errorsRef: RefObject<HTMLDivElement>;
}

const TextArea: FC<TextAreaProps> = ({ gutterRef, errorsRef }) => {
  const dispatch = useAppDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { dimacs } = useAppSelector((state) => state.editor);

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDimacs(e.target.value));
    dispatch(setFormula([]));

    sessionStorage.setItem('formula', '');
  };

  return (
    <textarea
      className={`${styles.editorTextArea} ${styles.customScrollbar}`}
      onScroll={() => {
        if (gutterRef.current && textAreaRef.current && errorsRef.current) {
          const { scrollTop } = textAreaRef.current;

          gutterRef.current.scrollTop = scrollTop;
          errorsRef.current.scrollTop = scrollTop;
        }
      }}
      placeholder='DIMACS CNF format only allowed here...'
      ref={textAreaRef}
      wrap='off'
      autoCorrect='off'
      autoCapitalize='off'
      spellCheck='false'
      value={dimacs}
      onChange={onChangeTextArea}
    />
  );
};

export default TextArea;
