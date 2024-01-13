import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const EditMode = ({
  onClickEditMode
}: {
  onClickEditMode: () => void;
}) => {
  return (
    <EditOutlinedIcon
      sx={{
        fontSize: '1.3rem'
      }}
      onClick={onClickEditMode}
    />
  );
};
