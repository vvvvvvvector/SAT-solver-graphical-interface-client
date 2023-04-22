import { FC } from 'react';

import { IError } from '../../../../../shared/types';

import styles from './ErrorInfo.module.scss';

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
      <span>{`quick fix is available: edit | delete | add zero`}</span>
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
