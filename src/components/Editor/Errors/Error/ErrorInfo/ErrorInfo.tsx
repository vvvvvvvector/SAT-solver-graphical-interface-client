import { FC } from 'react';
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

  const onDelete = () => {
    dispatch(deleteLine(error.line));
  };

  const onAddZero = () => {
    dispatch(addZero(error.line));
  };

  const onEdit = () => {
    const editedLine = window.prompt('Edit a clause:', error.damaged);

    if (editedLine) {
      if (editedLine === error.damaged) {
        toast.error('You have to write something instead of the same line!');
        return;
      }

      dispatch(editLine({ line: error.line, editedLine }));

      toast.success('Clause was edited successfully!');
    } else {
      toast.error('You have to write something instead of empty line!');
    }
  };

  switch (error.errorCode) {
    case 0:
      return <button onClick={onDelete}>delete empty</button>;
    case 1:
      return <button onClick={onEdit}>edit</button>;
    case 2:
      return <button onClick={onAddZero}>add zero</button>;
    case 3:
      return (
        <>
          <button onClick={onEdit}>edit</button>
          <button
            style={{
              marginLeft: '12px',
            }}
            onClick={onDelete}
          >
            delete
          </button>
        </>
      );
    case 4:
      return <button onClick={onDelete}>delete</button>;
    default:
      return <span>No quick fix available</span>;
  }
};

interface ErrorInfoProps {
  error: IError;
}

const ErrorInfo: FC<ErrorInfoProps> = ({ error }) => {
  return (
    <div
      style={{
        top: `${error.line < 7 ? 20 : -110}px`,
      }}
      className={styles.errorInfo}
    >
      <span>{error.damaged === '' ? 'Line is empty here' : error.damaged}</span>
      <span>{`ERR[Ln:${error.line},Code:${error.errorCode}] -> ${error.description}`}</span>
      <span className={styles.quickFix}>
        {`Quick ${error.errorCode === 3 ? 'fixes are' : 'fix is'} available:`}{' '}
        {QuickFixByCode(error)}
      </span>
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
