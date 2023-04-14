import React, { FC, RefObject, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setDimacs } from '../../../redux/slices/editor';
import { setFormula } from '../../../redux/slices/formula';
import { RootState } from '../../../redux/store';

import styles from './TextArea.module.scss';

interface TextAreaProps {
  gutterRef: RefObject<HTMLDivElement>;
  errorsRef: RefObject<HTMLDivElement>;
}

const TextArea: FC<TextAreaProps> = ({ gutterRef, errorsRef }) => {
  const dispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { dimacs } = useSelector((state: RootState) => state.editor);

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDimacs(e.target.value));
    dispatch(setFormula([]));

    sessionStorage.setItem('formula', '');
  };

  return (
    <textarea
      className={`${styles.editorTextArea} hide-scrollbars`}
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
