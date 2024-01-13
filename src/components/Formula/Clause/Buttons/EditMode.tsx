import { FC } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const EditMode: FC<{
  onClickEditMode: () => void;
}> = ({ onClickEditMode }) => {
  return (
    <EditOutlinedIcon
      sx={{
        fontSize: '1.3rem'
      }}
      onClick={onClickEditMode}
    />
  );
};
