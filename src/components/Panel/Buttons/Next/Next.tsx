import { useState } from 'react';
import toast from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { setSolution } from '../../../../redux/slices/solutions';
import { buttonStyle } from '../../../../shared/mui';

import { Button } from '@mui/material';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';

import { type IClause } from '../../../../shared/types';

interface NextProps {
  solver: string;
}

interface APIResponse<TData> {
  data: TData;
}

export const Next = ({ solver }: NextProps) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const { clauses } = useAppSelector((state) => state.formula);
  const { solutions } = useAppSelector((state) => state.solutions);
  const { dimacs, errors } = useAppSelector((state) => state.editor);

  return (
    <Button
      sx={buttonStyle}
      onClick={async () => {
        const id = toast.loading('Solving...');

        try {
          setLoading(true);

          const {
            data
          }:
            | APIResponse<{
                satisfiable: true;
                clauses: IClause[];
                next_solution: number[];
              }>
            | APIResponse<{
                satisfiable: false;
              }> = await axiosInstance.post('next-solution', {
            solver,
            formula: sessionStorage.getItem('formula')
          });

          setLoading(false);

          if (data.satisfiable) {
            sessionStorage.setItem('formula', JSON.stringify(data.clauses));

            dispatch(setSolution(data.next_solution));

            toast.success('Next solution was successfully found!', { id });
          } else {
            toast.error('There are no more solutions!', { id });
          }
        } catch (error) {
          setLoading(false);
          toast.error('Something went wrong!', { id });
          console.error('Something went wrong!', error);
        }
      }}
      disabled={
        loading ||
        clauses.length === 0 ||
        dimacs === '' ||
        solutions.length === 0 ||
        errors.length > 0
      }
      endIcon={<ForwardOutlinedIcon />}
      variant='contained'
    >
      {loading ? 'Finding...' : 'Next solution'}
    </Button>
  );
};
