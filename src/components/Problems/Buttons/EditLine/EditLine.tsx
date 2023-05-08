import { FC } from 'react';
import { toast } from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { editLine } from '../../../../redux/slices/editor';

import { Button } from '@mui/material';

interface EditLineProps {
  line: number;
  damaged: string;
}

export const EditLine: FC<EditLineProps> = ({ line, damaged }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    const editedLine = window.prompt('Edit a clause:', damaged);

    if (editedLine) {
      if (editedLine === damaged) {
        toast.error('You have to write something instead of the same line!');
        return;
      }

      dispatch(editLine({ line, editedLine }));

      toast.success('Clause was edited successfully!');
    } else {
      toast.error('You have to write something instead of empty line!');
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
