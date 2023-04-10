export const buttonStyle = {
  color: '#28282b',
  backgroundColor: '#f3f3f3',
  '&:hover': {
    backgroundColor: '#e4e4e4',
  },
  '&:disabled': {
    backgroundColor: 'hsl(0, 0%, 94%)',
  },
  maxWidth: '243px',
  width: '100%',
  '@media (max-width: 1400px)': {
    maxWidth: 'none',
  },
};
