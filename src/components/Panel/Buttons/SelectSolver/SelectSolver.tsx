import { FC } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material/';

import solvers, { ShortName } from './Solvers';

interface SelectSolverProps {
  solver: ShortName;
  setSolver: (value: ShortName) => void;
}

export const SelectSolver: FC<SelectSolverProps> = ({ solver, setSolver }) => {
  return (
    <FormControl
      variant='outlined'
      sx={{
        maxWidth: '180px',
        width: '100%',
        '@media (max-width: 1400px)': {
          maxWidth: 'none',
        },
      }}
    >
      <InputLabel id='select-solver-label'>SAT-solver</InputLabel>
      <Select
        id='select-solver'
        labelId='select-solver-label'
        label='SAT-solver'
        onChange={(event) => {
          setSolver(event.target.value as ShortName);
        }}
        value={solver}
      >
        {solvers.map((i, index) => (
          <MenuItem key={index} value={i.short}>
            {i.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
