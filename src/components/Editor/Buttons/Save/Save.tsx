import { FC } from 'react';
import { toast } from 'react-hot-toast';

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '../../../../redux/hooks/hooks';

export const Save: FC = () => {
  const { dimacs } = useAppSelector((state) => state.editor);

  const onClickSave = () => {
    if (window.confirm('Do you really want to save a formula to a file?')) {
      const filename = window.prompt('Enter a filename: ');

      if (filename) {
        const blob = new Blob([dimacs], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.download = `${filename}.txt`;
        link.href = url;
        link.click();

        toast.success('Formula was successfully saved!');
      }
    }
  };

  return dimacs.length ? (
    <Tooltip title='Save formula to a file' arrow>
      <IconButton onClick={onClickSave} color='primary'>
        <FileDownloadOutlinedIcon color='primary' />
      </IconButton>
    </Tooltip>
  ) : (
    <></>
  );
};
