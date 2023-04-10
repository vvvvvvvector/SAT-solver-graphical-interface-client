import React from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material/';

import solvers from './Solvers';

export const SelectSolver: React.FC<{
  solver: string;
  setSolver: (value: string) => void;
}> = ({ solver, setSolver }) => {
  return (
    <FormControl
      sx={{
        maxWidth: '243px',
        width: '100%',
        '@media (max-width: 1400px)': {
          maxWidth: 'none',
        },
      }}
    >
      <InputLabel id="select-solver-label">SAT-solver</InputLabel>
      <Select
        id="select-solver"
        labelId="select-solver-label"
        label="SAT-solver"
        onChange={(event) => {
          setSolver(event.target.value as string);
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
