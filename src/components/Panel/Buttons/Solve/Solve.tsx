import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import {
  clearSolutions,
  setSolution,
} from '../../../../redux/slices/solutions';
import { setFormula } from '../../../../redux/slices/formula';

import { Button } from '@mui/material';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

import { buttonStyle } from '../../../../shared/mui';
import { IClause } from '../../../../shared/types';

interface SolveProps {
  solver: string;
}

interface APIResponse<TData> {
  data: TData;
}

export const Solve: FC<SolveProps> = ({ solver }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const { dimacs, errors } = useAppSelector((state) => state.editor);

  const onClickSolve = async () => {
    try {
      setLoading(true);

      const {
        data,
      }: APIResponse<{
        satisfiable: boolean;
        clauses: IClause[];
        first_solution: number[];
      }> = await axiosInstance.post('solve', {
        solver,
        dimacs: dimacs.replaceAll(/c .*\n|c\n|\nc$|\nc .*|c$/g, ''),
      });

      setLoading(false);

      if (data.satisfiable) {
        dispatch(setFormula(data.clauses.slice(0, -1)));

        sessionStorage.setItem('formula', JSON.stringify(data.clauses));

        dispatch(clearSolutions());
        dispatch(setSolution(data.first_solution));

        toast.success('Satisfiable!');
      } else {
        dispatch(setFormula(data.clauses));
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
    >
      {loading ? 'Solving...' : 'Solve'}
    </Button>
  );
};
