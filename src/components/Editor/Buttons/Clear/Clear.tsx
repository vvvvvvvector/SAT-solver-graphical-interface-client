import { toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { clearDimacs } from '../../../../redux/slices/editor';
import { clearSolutions } from '../../../../redux/slices/solutions';
import { setFormula } from '../../../../redux/slices/formula';

import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Clear = () => {
  const dispatch = useAppDispatch();

  const { solutions } = useAppSelector((state) => state.solutions);
  const { dimacs } = useAppSelector((state) => state.editor);
  const { clauses } = useAppSelector((state) => state.formula);

  if (!(solutions.length > 0 && clauses.length > 0 && dimacs)) return null;

  return (
    <Tooltip title='Clear workspace' arrow>
      <IconButton
        onClick={() => {
          if (window.confirm('Are you sure you want to clear the workspace?')) {
            dispatch(clearDimacs());
            dispatch(clearSolutions());

            dispatch(setFormula([]));
            sessionStorage.setItem('formula', '');

            toast.success('Workspace was successfully cleared!');
          }
        }}
        color='error'
      >
        <DeleteOutlineIcon color='error' />
      </IconButton>
    </Tooltip>
  );
};
