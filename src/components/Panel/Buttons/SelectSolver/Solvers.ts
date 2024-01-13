export type ShortName =
  | 'cd'
  | 'gc3'
  | 'gc4'
  | 'g3'
  | 'g4'
  | 'lgl'
  | 'mcb'
  | 'mcm'
  | 'mpl'
  | 'mg3'
  | 'mc'
  | 'm22'
  | 'mgh';

export type FullName =
  | 'Cadical'
  | 'Gluecard3'
  | 'Gluecard41'
  | 'Glucose3'
  | 'Glucose4'
  | 'Lingeling'
  | 'Maplechrono'
  | 'Maplecm'
  | 'Maplesat'
  | 'Mergesat3'
  | 'Minicard'
  | 'Minisat22'
  | 'Minisatgh';

type Solver = {
  short: ShortName;
  name: FullName;
};

const solvers: Solver[] = [
  { short: 'cd', name: 'Cadical' },
  { short: 'gc3', name: 'Gluecard3' },
  { short: 'gc4', name: 'Gluecard41' },
  { short: 'g3', name: 'Glucose3' },
  { short: 'g4', name: 'Glucose4' },
  { short: 'lgl', name: 'Lingeling' },
  { short: 'mcb', name: 'Maplechrono' },
  { short: 'mcm', name: 'Maplecm' },
  { short: 'mpl', name: 'Maplesat' },
  { short: 'mg3', name: 'Mergesat3' },
  { short: 'mc', name: 'Minicard' },
  { short: 'm22', name: 'Minisat22' },
  { short: 'mgh', name: 'Minisatgh' }
];

export default solvers;
