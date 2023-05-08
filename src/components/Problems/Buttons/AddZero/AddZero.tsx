import { FC } from 'react';
import { toast } from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { addZero } from '../../../../redux/slices/editor';

import { Button } from '@mui/material';

interface AddZeroProps {
  line: number;
}

export const AddZero: FC<AddZeroProps> = ({ line }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(addZero(line));
    toast.success('Zero was successfully added!');
  };

  return (
    <Button
      onClick={onClick}
      sx={{ width: '150px' }}
      size='small'
      variant='outlined'
    >
      Add zero
    </Button>
  );
};
