import React from 'react';
import { toast } from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setDimacs } from '../../../../redux/slices/editor';

import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import { IconButton, Tooltip } from '@mui/material';

export const RemoveDuplicates: React.FC = () => {
  const dispatch = useDispatch();

  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const onClickRemoveDuplicates = async () => {
    try {
      const response = await toast.promise(
        axiosInstance.post('/remove-duplicates', {
          dimacs: dimacs.replaceAll(/c .*\n|c\n|\nc$|\nc .*|c$/g, ''),
        }),
        {
          loading: 'Removing duplicates...',
          success: 'Successfully removed duplicates!',
          error: 'Error occured while fixing dimacs!',
        }
      );

      dispatch(setDimacs(response.data.fixed));
    } catch (error: any) {
      console.log(error);
    }
  };

  return dimacs.length > 0 && errors.length === 0 ? (
    <Tooltip title="Remove duplicate clauses" arrow>
      <IconButton onClick={onClickRemoveDuplicates} color="primary">
        <ContentCutOutlinedIcon color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    <></>
  );
};
