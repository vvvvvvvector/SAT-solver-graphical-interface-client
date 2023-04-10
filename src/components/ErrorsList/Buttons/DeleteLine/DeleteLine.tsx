import { Button } from '@mui/material';
import { toast } from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { deleteLine } from '../../../../redux/slices/editor';

export const DeleteLine: React.FC<{ line: number }> = ({ line }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deleteLine(line));
    toast.success('Line was successfully deleted!');
  };

  return (
    <Button
      onClick={onClick}
      sx={{ width: '95px' }}
      size="small"
      variant="outlined"
    >
      Delete
    </Button>
  );
};
