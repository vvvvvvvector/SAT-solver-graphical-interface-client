import { FC } from 'react';
import { toast } from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { setDimacs } from '../../../../redux/slices/editor';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';

import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import { IconButton, Tooltip } from '@mui/material';

export const RemoveDuplicates: FC = () => {
  const dispatch = useAppDispatch();

  const { dimacs, errors } = useAppSelector((state) => state.editor);

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

  return dimacs.length > 0 && Object.keys(errors).length === 0 ? (
    <Tooltip title='Remove duplicate clauses' arrow>
      <IconButton onClick={onClickRemoveDuplicates} color='primary'>
        <ContentCutOutlinedIcon color='primary' />
      </IconButton>
    </Tooltip>
  ) : (
    <></>
  );
};
