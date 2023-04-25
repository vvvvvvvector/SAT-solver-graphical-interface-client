import { FC, useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

import { Backdrop, Button } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import styles from './FullSolution.module.scss';

interface FullSolutionProps {
  solution: number[];
  solutionIndex: number;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

const FullSolution: FC<FullSolutionProps> = ({
  solution,
  solutionIndex,
  isOpened,
  setIsOpened,
}) => {
  const isFirstRender = useRef(false);
  const fullSolutionRef = useRef<HTMLDivElement>(null);

  const [fullSolution, setFullSolution] = useState('');

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (isFirstRender.current) {
        if (
          fullSolutionRef.current &&
          !event.composedPath().includes(fullSolutionRef.current)
        ) {
          setIsOpened(false);
        }
      }
      isFirstRender.current = true;
    };

    document.body.addEventListener('click', onClickOutside);
    document.body.style.overflow = 'hidden';

    let result = '';

    solution.forEach((variable, index) => {
      result += `x_${Math.abs(variable)} = ${variable > 0 ? 'True' : 'False'} ${
        solution.length - 1 > index ? '\n' : ''
      }`;
    });

    setFullSolution(result);

    return () => {
      document.body.style.overflow = 'scroll';
      document.body.removeEventListener('click', onClickOutside);
    };
  }, []);

  const onClickSaveBinary = () => {
    const filename = window.prompt('Enter a filename: ');

    if (filename) {
      let result = '';

      solution.forEach((variable, index) => {
        result += `${variable > 0 ? '1' : '0'}${
          solution.length - 1 > index ? '\n' : ''
        }`;
      });

      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.download = `${filename}.txt`;
      link.href = url;
      link.click();

      setIsOpened(false);

      toast.success('Solution was successfully saved to a file!');
    }
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpened}
    >
      <div ref={fullSolutionRef} className={styles.fullSolution}>
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setIsOpened(false)}
        />
        <span>{`Solution #${solutionIndex + 1}`}</span>
        <textarea
          wrap='off'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          readOnly={true}
          value={fullSolution}
        />
        <Button onClick={onClickSaveBinary} variant='outlined'>
          Save in a binary form
        </Button>
      </div>
    </Backdrop>
  );
};

export default FullSolution;
