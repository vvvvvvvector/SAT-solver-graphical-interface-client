import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { useDispatch, useSelector } from 'react-redux';
import { filterFormula, setLinked } from '../../../../redux/slices/linker';
import { RootState } from '../../../../redux/store';

import { Button } from '@mui/material';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';

export const Link: FC = () => {
  const dispatch = useDispatch();

  const { first, second } = useSelector((state: RootState) => state.linker);

  const [loading, setLoading] = useState(false);

  const onClickLink = async () => {
    dispatch(filterFormula(1));
    dispatch(filterFormula(2));

    try {
      setLoading(true);

      const response = await axiosInstance.post('/link', {
        firstDimacs: first,
        secondDimacs: second,
      });

      setLoading(false);

      dispatch(setLinked(response.data.result));

      toast.success('Formulas were successfully linked!');
    } catch (error: any) {
      setLoading(false);

      if (error.response.status === 421) {
        // Formulas are the same
        toast.error(error.response.data.detail);
      } else if (error.response.status === 422) {
        // There is no formula definition in the first formula
        toast.error(error.response.data.detail);
      } else if (error.response.status === 423) {
        // There is no formula definition in the second formula
        toast.error(error.response.data.detail);
      } else if (error.response.status === 424) {
        // The first formula has wrong amount of clauses!
        toast.error(error.response.data.detail);
      } else if (error.response.status === 425) {
        // The second formula has wrong amount of clauses!
        toast.error(error.response.data.detail);
      } else {
        toast.error('Something went wrong!');
      }

      console.error(error);
    }
  };

  return (
    <Button
      sx={{
        maxWidth: '310px',
        width: '100%',
      }}
      disabled={loading || first === '' || second === ''}
      variant='outlined'
      onClick={onClickLink}
      endIcon={<InsertLinkOutlinedIcon />}
    >
      {loading ? 'Linking...' : 'Link formulas'}
    </Button>
  );
};
