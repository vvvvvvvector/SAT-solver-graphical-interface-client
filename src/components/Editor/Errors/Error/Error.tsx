import { useState, useRef } from 'react';

import { type IError } from '../../../../shared/types';

import ErrorInfo from './ErrorInfo/ErrorInfo';

import styles from './Error.module.scss';

interface ErrorProps {
  error: IError;
  index: number;
}

const Error = ({ error, index }: ErrorProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const interval = useRef<number>(0);

  const errorRef = useRef<HTMLDivElement>(null);

  const cursorPosition = useRef<number>(0);

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
        }, 250);
      }}
      onMouseLeave={() => {
        clearTimeout(interval.current);
        setIsOpened(false);
      }}
      className={styles.error}
      style={{
        top: `${(error.line - 1) * 20 - index * 20}px`
      }}
    >
      {isOpened && <ErrorInfo cursorX={cursorPosition.current} error={error} />}
    </div>
  );
};

export default Error;
