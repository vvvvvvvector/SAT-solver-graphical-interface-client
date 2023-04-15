import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { useSelector, useDispatch } from 'react-redux';
import { setSolution } from '../../../../redux/slices/solutions';
import { buttonStyle } from '../../../../shared/mui';
import { RootState } from '../../../../redux/store';

import { Button } from '@mui/material';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';

import { IClause } from '../../../../shared/types';

interface NextProps {
  solver: string;
}

interface APIResponse<TData> {
  data: TData;
}

export const Next: FC<NextProps> = ({ solver }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { clauses } = useSelector((state: RootState) => state.formula);
  const { solutions } = useSelector((state: RootState) => state.solutions);
  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const onClickNext = async () => {
    try {
      setLoading(true);

      const {
        data,
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
        formula: sessionStorage.getItem('formula'),
      });

      setLoading(false);

      if (data.satisfiable) {
        sessionStorage.setItem('formula', JSON.stringify(data.clauses));

        dispatch(setSolution(data.next_solution));

        toast.success('Next solution was successfully found!');
      } else {
        toast.error('There are no more solutions!');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong!');
      console.error('Something went wrong!', error);
    }
  };

  return (
    <Button
      sx={buttonStyle}
      onClick={onClickNext}
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
