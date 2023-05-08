import { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../redux/hooks/hooks';

import ErrorsTable from './ErrorsTable/ErrorsTable';

import styles from './Problems.module.scss';

export const Problems: FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const errors = useAppSelector((state) => state.editor.errors);

  useEffect(() => {
    return () => {
      setIsOpened(false);
    };
  }, []);

  return (
    <>
      {errors.length > 0 ? (
        <div className={styles.errors}>
          <div onClick={() => setIsOpened(!isOpened)} className={styles.header}>
            <span>{`There are ${errors.length} errors in formula ❗️❗️❗️`}</span>
            <span onClick={() => setIsOpened(!isOpened)}>
              {isOpened ? 'Hide errors list -' : 'Expand errors list +'}
            </span>
          </div>
          {isOpened && <ErrorsTable errors={errors} />}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
