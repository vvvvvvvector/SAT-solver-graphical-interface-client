import { toast } from 'react-hot-toast';

import { useAppSelector } from '../../../../redux/hooks/hooks';

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { IconButton, Tooltip } from '@mui/material';

export const Save = () => {
  const { dimacs } = useAppSelector((state) => state.editor);

  if (!dimacs.length) return null;

  return (
    <Tooltip title='Save the formula to a file' arrow>
      <IconButton
        onClick={() => {
          if (
            window.confirm('Do you really want to save a formula to a file?')
          ) {
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
        }}
        color='primary'
      >
        <FileDownloadOutlinedIcon color='primary' />
      </IconButton>
    </Tooltip>
  );
};
