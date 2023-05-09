import { FC, useState, useRef } from 'react';

import { IError } from '../../../../shared/types';

import ErrorInfo from './ErrorInfo/ErrorInfo';

import styles from './Error.module.scss';

interface ErrorProps {
  line: number;
  error: IError;
  index: number;
}

const Error: FC<ErrorProps> = ({ line, error, index }) => {
  const interval = useRef<number>(0);

  const errorRef = useRef<HTMLDivElement>(null);

  const cursorPosition = useRef<number>(0);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      ref={errorRef}
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        interval.current = setTimeout(() => {
          if (errorRef.current) {
            cursorPosition.current =
              event.clientX - errorRef.current.getBoundingClientRect().left;
          }

          setIsOpened(true);
        }, 225);
      }}
      onMouseLeave={() => {
        clearTimeout(interval.current);
        setIsOpened(false);
      }}
      className={styles.error}
      style={{
        top: `${(line - 1) * 20 - index * 20}px`,
      }}
    >
      {isOpened && (
        <ErrorInfo cursorX={cursorPosition.current} error={error} line={line} />
      )}
    </div>
  );
};

export default Error;
