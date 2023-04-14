import { FC } from 'react';
import { toast } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { clearDimacs } from '../../../../redux/slices/editor';
import { clearSolutions } from '../../../../redux/slices/solutions';
import { setFormula } from '../../../../redux/slices/formula';
import { RootState } from '../../../../redux/store';

import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Clear: FC = () => {
  const dispatch = useDispatch();

  const { solutions } = useSelector((state: RootState) => state.solutions);
  const { dimacs } = useSelector((state: RootState) => state.editor);
  const { clauses } = useSelector((state: RootState) => state.formula);

  const onClickClear = () => {
    if (window.confirm('Are you sure you want to clear the workspace?')) {
      dispatch(clearDimacs());
      dispatch(clearSolutions());

      dispatch(setFormula([]));
      sessionStorage.setItem('formula', '');

      toast.success('Workspace was successfully cleared!');
    }
  };

  return solutions.length > 0 && clauses.length > 0 && dimacs ? (
    <Tooltip title='Clear workspace' arrow>
      <IconButton onClick={onClickClear} color='error'>
        <DeleteOutlineIcon color='error' />
      </IconButton>
    </Tooltip>
  ) : (
    <></>
  );
};
