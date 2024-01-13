import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { clearErrors, setDimacs } from '../../../../redux/slices/editor';
import { clearSolutions } from '../../../../redux/slices/solutions';
import { setFormula } from '../../../../redux/slices/formula';

import { Button } from '@mui/material';
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';

const style = {
  maxWidth: '310px',
  width: '100%'
};

interface PasteProps {
  dimacs: string;
}

export const Paste: FC<PasteProps> = ({ dimacs }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <Button
      sx={style}
      disabled={dimacs === ''}
      variant='outlined'
      onClick={() => {
        dispatch(setDimacs(dimacs));
        dispatch(clearErrors());
        dispatch(clearSolutions());
        dispatch(setFormula([]));
        navigate('/');
      }}
      endIcon={<ContentPasteGoOutlinedIcon />}
    >
      Paste result in the editor
    </Button>
  );
};
