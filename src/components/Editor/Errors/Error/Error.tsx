import { FC, useState, useRef } from 'react';

import { IError } from '../../../../shared/types';

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
      {isOpened && (
        <div
          style={{
            top: `${error.line < 7 ? 20 : -110}px`,
          }}
          className={styles.errorInfo}
        >
          <span>
            {error.damaged === '' ? 'Line is empty here' : error.damaged}
          </span>
          <span>{`ERR[Ln:${error.line}, Cd: ${error.errorCode}]: ${error.description}`}</span>
          <span>{`quick fix is available`}</span>
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
      )}
    </div>
  );
};

export default Error;
