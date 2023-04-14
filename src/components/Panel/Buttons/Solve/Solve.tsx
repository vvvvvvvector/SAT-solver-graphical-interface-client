import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {
  clearSolutions,
  setSolution,
} from '../../../../redux/slices/solutions';
import { setFormula } from '../../../../redux/slices/formula';

import { Button } from '@mui/material';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

import { buttonStyle } from '../../../../shared/mui';

interface SolveProps {
  solver: string;
}

export const Solve: FC<SolveProps> = ({ solver }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const onClickSolve = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post('solve', {
        solver,
        dimacs: dimacs.replaceAll(/c .*\n|c\n|\nc$|\nc .*|c$/g, ''),
      });

      setLoading(false);

      if (response.data.satisfiable) {
        dispatch(setFormula(response.data.clauses.slice(0, -1)));

        sessionStorage.setItem(
          'formula',
          JSON.stringify(response.data.clauses)
        );

        dispatch(clearSolutions());
        dispatch(setSolution(response.data.first_solution));

        toast.success('Satisfiable!');
      } else {
        dispatch(setFormula(response.data.clauses));
        dispatch(clearSolutions());

        toast.error('Unsatisfiable!');
      }
    } catch (error: any) {
      setLoading(false);

      if (error.response.status === 418) {
        // Wrong number of clauses
        toast.error(error.response.data.detail);
      } else if (error.response.status === 419) {
        // Wrong variable value
        toast.error(error.response.data.detail);
      } else if (error.response.status === 420) {
        // No formula definition
        toast.error(error.response.data.detail);
      } else {
        toast.error('Something went wrong!');
      }

      console.error(error);
    }
  };

  return (
    <Button
      sx={buttonStyle}
      onClick={onClickSolve}
      disabled={loading || dimacs === '' || errors.length > 0}
      endIcon={<CalculateOutlinedIcon />}
      variant='contained'
    >
      {loading ? 'Solving...' : 'Solve'}
    </Button>
  );
};
