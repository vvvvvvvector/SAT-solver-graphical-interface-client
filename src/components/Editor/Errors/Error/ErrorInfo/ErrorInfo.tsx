import { FC, useLayoutEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import { useAppDispatch } from '../../../../../redux/hooks/hooks';
import {
  addZero,
  deleteLine,
  editLine,
} from '../../../../../redux/slices/editor';

import { IError } from '../../../../../shared/types';

import styles from './ErrorInfo.module.scss';

const QuickFixByCode = (error: IError) => {
  const dispatch = useAppDispatch();

  const onReplace = () => {
    const splitedDescription = error.description.split(' ');
    const firstFormulaDefinitionLine =
      +splitedDescription[splitedDescription.length - 1];

    dispatch(
      editLine({ line: firstFormulaDefinitionLine, editedLine: error.damaged })
    );

    dispatch(deleteLine(error.line));

    toast.success('Line was successfully replaced!');
  };

  const onDelete = () => {
    dispatch(deleteLine(error.line));

    toast.success('Line was successfully deleted!');
  };

  const onAddZero = () => {
    dispatch(addZero(error.line));

    toast.success('Zero was successfully added!');
  };

  const onEdit = () => {
    const editedLine = window.prompt(
      'Line edit mode:\n\n-> Right formula def. example: p cnf <variables n> <clauses k>, where n & k > 0\n\n-> Right clause example: 1 2 3 4 0',
      error.damaged
    );

    if (editedLine) {
      if (editedLine === error.damaged) {
        toast.error('You must write something instead of the same line!');
        return;
      }

      dispatch(editLine({ line: error.line, editedLine }));

      toast.success('Line was successfully edited!');
    } else {
      toast.error('You must write something instead of an empty line!');
    }
  };

  switch (error.errorCode) {
    case 0:
      return (
        <>
          {'Fix propositions: '}
          <button onClick={onDelete}>delete</button>
          {' | '}
          <button onClick={onEdit}>edit</button>
        </>
      );
    case 1:
      return (
        <>
          {'Fix proposition: '}
          <button onClick={onEdit}>edit</button>
        </>
      );
    case 2:
      return (
        <>
          {'Quick fix is available: '}
          <button onClick={onAddZero}>add zero</button>
        </>
      );
    case 3:
      return (
        <>
          {'Fix propositions: '}
          <button onClick={onEdit}>edit</button>
          {' | '}
          <button onClick={onDelete}>delete</button>
        </>
      );
    case 4:
      return (
        <>
          {'Fix propositions: '}
          <button onClick={onReplace}>replace</button>
          {' | '}
          <button onClick={onDelete}>delete</button>
        </>
      );
    case 5:
      return (
        <>
          {'Fix proposition: '}
          <button onClick={onEdit}>edit</button>
        </>
      );

    default:
      return <span>No quick fix available</span>;
  }
};

interface ErrorInfoProps {
  cursorX: number;
  error: IError;
}

const ErrorInfo: FC<ErrorInfoProps> = ({ cursorX, error }) => {
  let errorInfoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (errorInfoRef.current) {
      const errorInfoWidth = errorInfoRef.current.getBoundingClientRect().width;

      const errorInfoArrowPos = cursorX - Math.ceil(errorInfoWidth / 2);

      if (errorInfoArrowPos < 0) {
        errorInfoRef.current.style.left = '0px';
      } else if (errorInfoArrowPos + errorInfoWidth > 1008) {
        errorInfoRef.current.style.right = '0px';
      } else {
        errorInfoRef.current.style.left = `${errorInfoArrowPos - 6}px`;
      }
    }
  }, []);

  return (
    <div
      ref={errorInfoRef}
      style={{
        top: `${error.line < 7 ? 20 : -116}px`,
      }}
      className={styles.errorInfo}
    >
      <span>{error.damaged === '' ? 'Line is empty here' : error.damaged}</span>
      <div className={styles.firstDiv}></div>
      <span>{`ERR[Ln:${error.line},Code:${error.errorCode}] -> ${error.description}`}</span>
      <div className={styles.secondDiv}></div>
      <span className={styles.quickFix}>{QuickFixByCode(error)}</span>
      <span
        style={
          error.line < 7
            ? {
                bottom: '100%',
                transform: 'rotate(180deg)',
              }
            : {
                top: '100%',
              }
        }
        className={styles.errorInfoArrow}
      />
    </div>
  );
};

export default ErrorInfo;
