import { useState, type MutableRefObject, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import styles from './Overlay.module.scss';

import Status from '../status';

interface OverlayProps {
  open: boolean;
  counter: number;
  loop: MutableRefObject<Status>;
}

const Overlay = ({ open, counter, loop }: OverlayProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <div className={styles.dialog}>
        <h3>{`Found ${counter} ${
          counter == 1 ? 'solution' : 'solutions'
        }...`}</h3>
        <CircularProgress color='primary' />
        <Button
          disabled={counter == 0 || loading}
          sx={{
            maxWidth: '300px',
            width: '100%'
          }}
          color='primary'
          variant='outlined'
          onClick={() => {
            setLoading(true);
            loop.current = Status.STOPPED;
          }}
        >
          {loading ? 'Interrupting...' : 'Interrupt'}
        </Button>
      </div>
    </Backdrop>
  );
};

export default Overlay;
