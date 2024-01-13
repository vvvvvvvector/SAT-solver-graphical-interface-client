import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

import { deleteLine } from '../../../../redux/slices/editor';

interface DeleteLineProps {
  line: number;
}

export const DeleteLine = ({ line }: DeleteLineProps) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deleteLine(line));
    toast.success('Line was successfully deleted!');
  };

  return (
    <Button
      onClick={onClick}
      sx={{ width: '150px' }}
      size='small'
      variant='outlined'
    >
      Delete
    </Button>
  );
};
