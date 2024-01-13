import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { editLine } from '../../../../redux/slices/editor';

import { Button } from '@mui/material';

interface EditLineProps {
  line: number;
  damaged: string;
}

export const EditLine = ({ line, damaged }: EditLineProps) => {
  const dispatch = useDispatch();

  const onClick = () => {
    const editedLine = window.prompt(
      'Line edit mode:\n\n-> Right formula def. example: p cnf <variables n> <clauses k>, where n & k > 0\n\n-> Right clause example: 1 2 3 4 0',
      damaged
    );

    if (editedLine) {
      if (editedLine === damaged) {
        toast.error('You must write something instead of the same line!');
        return;
      }

      dispatch(editLine({ line, editedLine }));

      toast.success('Clause was edited successfully!');
    } else {
      toast.error('You must write something instead of an empty line!');
    }
  };

  return (
    <Button
      onClick={onClick}
      sx={{ width: '150px' }}
      size='small'
      variant='outlined'
    >
      Edit
    </Button>
  );
};
