import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export const RemoveClause = ({
  onRemoveClause
}: {
  onRemoveClause: () => void;
}) => {
  return (
    <DeleteForeverOutlinedIcon
      sx={{
        fontSize: '1.3rem'
      }}
      onClick={onRemoveClause}
    />
  );
};
