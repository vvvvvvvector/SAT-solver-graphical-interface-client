import React from 'react';
import { toast } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, setDimacs } from '../../../../redux/slices/editor';
import { setFormula } from '../../../../redux/slices/formula';
import { clearSolutions } from '../../../../redux/slices/solutions';

import { IconButton, Tooltip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { RootState } from '../../../../redux/store';

export const Upload: React.FC = () => {
  const dispatch = useDispatch();

  const currentDimacs = useSelector((state: RootState) => state.editor.dimacs);

  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        const dimacs = reader.result as string;

        if (dimacs === currentDimacs) {
          toast.error('Formula is already uploaded!');
          return;
        }

        dispatch(setDimacs(dimacs));
        dispatch(setFormula([]));
        dispatch(clearSolutions());
        dispatch(clearErrors());

        toast.success('Formula was successfully uploaded!');
      };

      reader.onerror = () => {
        toast.error('Error while uploading file!');
      };
    }

    e.target.value = ''; // allows re-add the same file again
  };

  return (
    <Tooltip title='Upload formula' arrow>
      <IconButton color='primary' component='label'>
        <input
          hidden
          type='file'
          onChange={onClickUpload}
          accept='.txt, .cnf'
        />
        <UploadFileIcon color='primary' />
      </IconButton>
    </Tooltip>
  );
};
