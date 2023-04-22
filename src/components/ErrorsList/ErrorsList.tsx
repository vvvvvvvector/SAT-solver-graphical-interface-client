import { FC, forwardRef } from 'react';

import { useAppSelector } from '../../redux/hooks/hooks';

import { TableVirtuoso } from 'react-virtuoso';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { ButtonGroup } from '@mui/material';

import { AddZero, DeleteLine, EditLine } from './Buttons';

import { IError } from '../../shared/types';

import styles from './ErrorsList.module.scss';

const ButtonByErrorCode = (error: IError) => {
  switch (error.errorCode) {
    case 0:
      return <DeleteLine line={error.line} />;
    case 1:
      return <EditLine damaged={error.damaged} line={error.line} />;
    case 2:
      return <AddZero line={error.line} />;
    case 3:
      return (
        <ButtonGroup>
          <EditLine damaged={error.damaged} line={error.line} />
          <DeleteLine line={error.line} />
        </ButtonGroup>
      );
    case 4:
      return <DeleteLine line={error.line} />;
  }
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#fafafa',
    color: '#28282b',
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  },
}));

export const ErrorsList: FC = () => {
  const errors = useAppSelector((state) => state.editor.errors);

  return (
    <>
      {errors.length > 0 ? (
        <div className={styles.errors}>
          <h2 className={styles.header}>
            {`There are ${errors.length} errors in Your formula :<`}
          </h2>
          <TableVirtuoso
            style={{
              height: 'calc((63.75px * 6) + 57px)',
              // boxShadow: '0 2px 2px rgba(0, 0, 0, 0.12)',
              // border: '1px solid #eaeaea',
            }}
            className='hide-scrollbars'
            data={errors}
            components={{
              Scroller: forwardRef<HTMLDivElement>((props, ref) => (
                <TableContainer component={Paper} {...props} ref={ref} />
              )),
              Table: (props) => (
                <Table
                  {...props}
                  sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
                />
              ),
              TableHead,
              TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
              TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
                <TableBody {...props} ref={ref} />
              )),
            }}
            fixedHeaderContent={() => (
              <TableRow>
                <StyledTableCell
                  sx={{
                    // width: '37%',
                    backgroundColor: 'white',
                  }}
                  align='center'
                >
                  Description
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    // maxWidth: '130px',
                    backgroundColor: 'white',
                  }}
                  align='center'
                >
                  Line
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    backgroundColor: 'white',
                  }}
                  align='center'
                >
                  Quick fix 💡
                </StyledTableCell>
              </TableRow>
            )}
            itemContent={(_: number, error: IError) => (
              <>
                <StyledTableCell align='center'>{`${error.description} [Ln:${error.line},Cd:${error.errorCode}]`}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    whiteSpace: 'nowrap',
                    overflowX: 'scroll',
                  }}
                  className='hide-scrollbars'
                  align='center'
                >
                  <span
                    style={{
                      fontWeight: 600,
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'wavy',
                      textDecorationColor: '#dc2626',
                    }}
                  >
                    {error.damaged ? error.damaged : 'Line is empty here 🤷‍♂️'}
                  </span>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {ButtonByErrorCode(error)}
                </StyledTableCell>
              </>
            )}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
