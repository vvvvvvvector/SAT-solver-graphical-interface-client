export const buttonStyle = {
  color: '#28282b',
  backgroundColor: '#f3f3f3',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.12)',
  '&:hover': {
    backgroundColor: '#e4e4e4',
  },
  '&:disabled': {
    backgroundColor: 'hsl(0, 0%, 94%)',
  },
  maxWidth: '260px',
  width: '100%',
  '@media (max-width: 1400px)': {
    maxWidth: 'none',
  },
};
