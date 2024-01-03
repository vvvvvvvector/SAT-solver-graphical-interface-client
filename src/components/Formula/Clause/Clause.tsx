import { FC, useRef, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useAppDispatch } from '../../../redux/hooks/hooks';
import { editClause, removeClause } from '../../../redux/slices/formula';
import { clearSolutions } from '../../../redux/slices/solutions';

import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

import { EditMode, RemoveClause } from './Buttons';
import Variable from './Variable/Variable';

import { IClause } from '../../../shared/types';

import styles from './Clause.module.scss';

interface ClauseProps {
  clause: IClause;
}

const Clause: FC<ClauseProps> = ({ clause }) => {
  const dispatch = useAppDispatch();

  const clauseRef = useRef<HTMLDivElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [editInputValue, setEditInputValue] = useState('');

  useEffect(() => {
    const clickOutsideClause = (event: MouseEvent) => {
      if (
        clauseRef.current &&
        !event.composedPath().includes(clauseRef.current)
      ) {
        setEditMode(false);
      }
    };

    document.body.addEventListener('click', clickOutsideClause);

    return () => document.body.removeEventListener('click', clickOutsideClause);
  }, []);

  const onRemoveClause = () => {
    dispatch(removeClause(clause.id));

    toast.success('Clause was successfully removed!');

    sessionStorage.setItem('formula', '');
    dispatch(clearSolutions());
  };

  const onEditClause = () => {
    let editedClause: number[] = [];

    if (editInputValue !== '')
      editedClause = editInputValue.split('|').map((i) => parseInt(i));

    dispatch(
      editClause({
        id: clause.id,
        editedClause,
      })
    );

    setEditMode(false);

    if (editedClause.length > 0)
      toast.success('Clause was successfully updated!');
    else toast.success('Clause was successfully removed!');

    sessionStorage.setItem('formula', '');
    dispatch(clearSolutions());
  };

  const onClickEditMode = () => {
    setEditMode(true);
    setEditInputValue(clause.variables.join(' | '));
  };

  return (
    <div ref={clauseRef} className={styles.container}>
      {editMode ? (
        <div className={styles.edit}>
          <input
            autoFocus
            onKeyDown={(event) => {
              if (event.key === 'Enter') onEditClause();
              if (event.key === 'Escape') setEditMode(false);
            }}
            value={editInputValue}
            onChange={(event) => setEditInputValue(event.target.value)}
          />
          <DoneOutlinedIcon
            onClick={onEditClause}
            fontSize='small'
            className={styles.save}
          />
        </div>
      ) : (
        <>
          <ul className={styles.clause}>
            <p>(</p>
            {clause.variables.map((i, index) => (
              <li key={index}>
                <Variable index={i} />
                {clause.variables.length - 1 > index && <span>&#8744;</span>}
              </li>
            ))}
            <p>)</p>
          </ul>
          <div className={styles.controls}>
            <EditMode onClickEditMode={onClickEditMode} />
            <RemoveClause onRemoveClause={onRemoveClause} />
          </div>
        </>
      )}
    </div>
  );
};

export default Clause;
