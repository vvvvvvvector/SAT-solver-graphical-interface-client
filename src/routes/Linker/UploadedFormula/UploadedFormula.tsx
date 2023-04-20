import React, { FC } from 'react';
import { toast } from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { setFirst, setLinked, setSecond } from '../../../redux/slices/linker';

import { Button } from '@mui/material';

import styles from './UploadedFormula.module.scss';

interface UploadedFormulaProps {
  dimacs: string;
  index: 1 | 2;
}

const UploadedFormula: FC<UploadedFormulaProps> = ({ dimacs, index }) => {
  const dispatch = useDispatch();

  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        toast.success('First formula was successfully uploaded!');

        if (index === 1) {
          dispatch(setFirst(reader.result as string));
        } else {
          dispatch(setSecond(reader.result as string));
        }

        dispatch(setLinked(''));
      };

      reader.onerror = () => {
        toast.error('Error while uploading first formula!');
      };
    }

    e.target.value = ''; // allows re-add the same file again
  };

  return (
    <div className={styles.formula}>
      <Button
        sx={{ marginBottom: '25px' }}
        size='medium'
        variant='contained'
        component='label'
      >
        {index === 1 ? 'Upload 1st formula' : 'Upload 2nd formula'}
        <input
          onChange={onClickUpload}
          hidden
          type='file'
          accept='.txt, .cnf'
        />
      </Button>
      <textarea
        wrap='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        value={dimacs}
        onChange={(e) => {
          if (index === 1) {
            dispatch(setFirst(e.target.value));
          } else {
            dispatch(setSecond(e.target.value));
          }

          dispatch(setLinked(''));
        }}
        placeholder={
          index === 1 ? '1st formula here...' : '2nd formula here...'
        }
      />
    </div>
  );
};

export default UploadedFormula;
