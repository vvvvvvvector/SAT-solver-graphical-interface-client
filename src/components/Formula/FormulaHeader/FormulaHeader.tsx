import { toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { clearSolutions } from '../../../redux/slices/solutions';
import { addClause, setFormulaOpened } from '../../../redux/slices/formula';

import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import styles from './FormulaHeader.module.scss';

const FormulaHeader = () => {
  const dispatch = useAppDispatch();

  const { clauses, opened } = useAppSelector((state) => state.formula);

  const onClickAddClause = () => {
    const input = window.prompt(
      "Proper format: 1 | -2 | -3 | ...\nMore spaces are allowed between numbers and '|'."
    );

    if (input) {
      const clause = input?.split('|').map((item) => parseInt(item));

      if (clause) {
        dispatch(addClause(clause));

        toast.success('Clause was successfully added!');

        sessionStorage.setItem('formula', '');
        dispatch(clearSolutions());
      }
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h2 onClick={() => dispatch(setFormulaOpened(!opened))}>
          {clauses.length > 0 ? 'Formula in CNF' : 'There is no formula so far'}
        </h2>
        <svg
          className={opened ? styles['opened'] : ''}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
      </div>
      {opened && (
        <>
          <Tooltip title='Add a new clause' arrow>
            <IconButton color='primary' onClick={onClickAddClause}>
              <AddIcon color='primary' />
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default FormulaHeader;
