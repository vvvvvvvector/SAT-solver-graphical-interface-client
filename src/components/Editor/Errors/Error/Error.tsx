import { FC, useState, useRef } from 'react';

import { IError } from '../../../../shared/types';

// import { Tooltip } from '@mui/material';

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
      onMouseOver={() => {
        // interval.current = setTimeout(() => {
        setIsOpened(true);
        // }, 550);
      }}
      onMouseLeave={() => {
        // clearTimeout(interval.current);
        setIsOpened(false);
      }}
      className={styles.error}
      style={{
        top: `${(error.line - 1) * 20 - index * 20}px`,
      }}
    >
      {isOpened && (
        <div
          style={{
            top: `${error.line < 7 ? 20 : -112}px`,
          }}
          className={styles.errorInfo}
        >
          <span>{`ERR [Ln:${error.line}]: ${error.description}`}</span>
          <span>{`ERR [Code: ${error.errorCode}]: quick fix is available`}</span>
        </div>
      )}
    </div>
  );
};

export default Error;
