import { FC, useState, useRef } from 'react';

import { IError } from '../../../../shared/types';

import ErrorInfo from './ErrorInfo/ErrorInfo';

import styles from './Error.module.scss';

interface ErrorProps {
  error: IError;
  index: number;
}

const Error: FC<ErrorProps> = ({ error, index }) => {
  const interval = useRef<number>(0);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        interval.current = setTimeout(() => {
          setIsOpened(true);
        }, 500);
      }}
      onMouseLeave={() => {
        clearTimeout(interval.current);
        setIsOpened(false);
      }}
      className={styles.error}
      style={{
        top: `${(error.line - 1) * 20 - index * 20}px`,
      }}
    >
      {isOpened && <ErrorInfo error={error} />}
    </div>
  );
};

export default Error;
