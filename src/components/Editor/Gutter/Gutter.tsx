import { forwardRef, useMemo } from 'react';

import { useAppSelector } from '../../../redux/hooks/hooks';

import styles from './Gutter.module.scss';

const Gutter = forwardRef<HTMLDivElement>((_, ref) => {
  const { dimacs, errors } = useAppSelector((state) => state.editor);

  const length = useMemo(() => dimacs.split('\n').length, [dimacs]);

  return (
    <div ref={ref} className={styles.gutter}>
      <div>
        {[...Array(length)].map((_, index) => (
          <div className={styles.gutterCell} key={index}>
            <span>{`${errors[index + 1] ? '❗️' : ''}`}</span>
            <span>{`${index + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Gutter;
