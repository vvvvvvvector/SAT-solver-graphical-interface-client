import React from 'react';
import toast from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';

import { Button } from '@mui/material';
import { buttonStyle } from '../../../../shared/mui';
import { setFormula } from '../../../../redux/slices/formula';
import {
  clearSolutions,
  setSolutions,
} from '../../../../redux/slices/solutions';
import LoopIcon from '@mui/icons-material/Loop';

import Overlay from './Overlay/Overlay';

import Status from './status';

export const FindAll: React.FC<{ solver: string }> = ({ solver }) => {
  const dispatch = useDispatch();

  const loop = React.useRef<Status>(Status.NOTSTARTED);

  const [counter, setCounter] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { clauses, changed } = useSelector((state: RootState) => state.formula);
  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  React.useEffect(() => {
    loop.current = Status.NOTSTARTED;
  }, [dimacs]);

  const onClickFindAll = async () => {
    try {
      setLoading(true);
      setOpen(true);

      const solutions: number[][] = [];

      const solveResponse = await axiosInstance.post('/solve', {
        dimacs,
        solver,
      });

      if (solveResponse.data.satisfiable) {
        dispatch(clearSolutions());

        dispatch(setFormula(solveResponse.data.clauses.slice(0, -1)));

        sessionStorage.setItem(
          'formula',
          JSON.stringify(solveResponse.data.clauses)
        );

        solutions.push(solveResponse.data.first_solution);
        setCounter((prev) => prev + 1);

        loop.current = Status.PENDING;

        while (loop.current === Status.PENDING) {
          const nextResponse = await axiosInstance.post('/next-solution', {
            solver,
            formula: sessionStorage.getItem('formula'),
          });

          if (nextResponse.data.satisfiable) {
            solutions.push(nextResponse.data.next_solution);
            setCounter((prev) => prev + 1);

            sessionStorage.setItem(
              'formula',
              JSON.stringify(nextResponse.data.clauses)
            );
          } else {
            loop.current = Status.END;
          }
        }
      } else {
        loop.current = Status.UNSATISFIABLE;
      }

      setLoading(false);
      setOpen(false);

      if (loop.current === Status.UNSATISFIABLE) {
        toast.error('Unsatisfiable!', { duration: 3000 });
      } else {
        if (loop.current === Status.END) {
          toast.success('Successfully found all solutions!', {
            duration: 3000,
          });
        } else if (loop.current === Status.STOPPED) {
          toast.success(
            `Successfully found: ${solutions.length} ${
              solutions.length === 1 ? 'solution' : 'solutions'
            }`,
            { duration: 3000 }
          );
        }
        setCounter(0);
        dispatch(setSolutions(solutions));
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      setOpen(false);

      toast.error('Find All error!');
    }
  };

  const onClickFindOther = async () => {
    try {
      setLoading(true);
      setOpen(true);

      const solutions: number[][] = [];

      const firstSolutionTry = await axiosInstance.post('/next-solution', {
        solver,
        formula: sessionStorage.getItem('formula'),
      });

      if (firstSolutionTry.data.satisfiable) {
        loop.current = Status.PENDING;

        while (loop.current === Status.PENDING) {
          const response = await axiosInstance.post('/next-solution', {
            solver,
            formula: sessionStorage.getItem('formula'),
          });

          if (response.data.satisfiable) {
            solutions.push(response.data.next_solution);
            setCounter((prev) => prev + 1);

            sessionStorage.setItem(
              'formula',
              JSON.stringify(response.data.clauses)
            );
          } else {
            loop.current = Status.END;
          }
        }
      } else {
        loop.current = Status.UNSATISFIABLE;
      }

      setLoading(false);
      setOpen(false);

      if (loop.current === Status.UNSATISFIABLE) {
        toast.error('There are no more solutions!', { duration: 3000 });
      } else {
        if (loop.current === Status.END) {
          toast.success('Successfully found all solutions!', {
            duration: 3000,
          });
        } else if (loop.current === Status.STOPPED) {
          toast.success(
            `Successfully found: ${solutions.length} ${
              solutions.length === 1 ? 'solution' : 'solutions'
            }`,
            { duration: 3000 }
          );
        }
        setCounter(0);
        dispatch(setSolutions(solutions));
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      setOpen(false);

      toast.error('Find Other error!');
    }
  };

  return (
    <>
      {clauses.length > 0 && !changed ? (
        <Button
          disabled={errors.length > 0 || loading}
          onClick={onClickFindOther}
          sx={buttonStyle}
          variant='contained'
          endIcon={<LoopIcon />}
        >
          {loading ? 'Loading...' : 'Find other solutions'}
        </Button>
      ) : (
        <Button
          disabled={dimacs.length === 0 || errors.length > 0}
          onClick={onClickFindAll}
          sx={buttonStyle}
          variant='contained'
          endIcon={<LoopIcon />}
        >
          Find All
        </Button>
      )}
      {loading && (
        <Overlay loop={loop} counter={counter} setOpen={setOpen} open={open} />
      )}
    </>
  );
};
