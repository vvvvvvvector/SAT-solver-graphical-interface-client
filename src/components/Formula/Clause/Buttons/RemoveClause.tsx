import { FC } from 'react';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export const RemoveClause: FC<{
  onRemoveClause: () => void;
}> = ({ onRemoveClause }) => {
  return (
    <DeleteForeverOutlinedIcon
      sx={{
        fontSize: '1.3rem',
      }}
      onClick={onRemoveClause}
    />
  );
};
