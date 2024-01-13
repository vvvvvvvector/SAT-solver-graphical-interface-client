import { FC } from 'react';
import { toast } from 'react-hot-toast';

import axiosInstance from '../../../../axios';

import { setDimacs } from '../../../../redux/slices/editor';

import { IconButton, Tooltip } from '@mui/material';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';

export const Fix: FC = () => {
  const dispatch = useAppDispatch();

  const { dimacs } = useAppSelector((state) => state.editor);

  const onClickFix = async () => {
    try {
      if (
        window.confirm(
          'Are you sure you want to fix dimacs?\n\n' +
            'It can permanently damage the formula!\n' +
            '\n1. Variables and clauses amount will be recalculated' +
            '\n2. Invalid clauses will be removed' +
            '\n3. Comments will be removed' +
            '\n4. Each clause will end with a zero'
        )
      ) {
        const response = await toast.promise(
          axiosInstance.post('/fix', {
            dimacs: dimacs.replaceAll(/c .*\n|c\n|\nc$|\nc .*|c$/g, '')
          }),
          {
            loading: 'Fixing dimacs...',
            success: 'Successfully fixed!',
            error: 'Error occured while fixing dimacs!'
          }
        );

        dispatch(setDimacs(response.data.fixed));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return dimacs.length > 0 ? (
    <Tooltip title='Try to fix all errors in DIMACS CNF' arrow>
      <IconButton onClick={onClickFix} color='primary'>
        <AutoFixHighOutlinedIcon color='primary' />
      </IconButton>
    </Tooltip>
  ) : (
    <></>
  );
};
