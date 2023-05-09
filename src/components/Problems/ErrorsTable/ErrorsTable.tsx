import { FC, forwardRef, useEffect, useRef } from 'react';

import { deleteLine, editLine } from '../../../redux/slices/editor';

import { TableVirtuoso } from 'react-virtuoso';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, ButtonGroup } from '@mui/material';

import { AddZero, DeleteLine, EditLine } from '../Buttons';

import { ErrorsMap, IError } from '../../../shared/types';
import { useAppDispatch } from '../../../redux/hooks/hooks';

const ButtonByErrorCode = (line: number, error: IError, dispatch: any) => {
  const onReplace = () => {
    const splitedDescription = error.description.split(' ');
    const firstFormulaDefinitionLine =
      +splitedDescription[splitedDescription.length - 1];

    dispatch(
      editLine({ line: firstFormulaDefinitionLine, editedLine: error.damaged })
    );

    dispatch(deleteLine(line));
  };

  switch (error.errorCode) {
    case 0:
      return (
        <ButtonGroup>
          <EditLine damaged={error.damaged} line={line} />
          <DeleteLine line={line} />
        </ButtonGroup>
      );
    case 1:
      return <EditLine damaged={error.damaged} line={line} />;
    case 2:
      return <AddZero line={line} />;
    case 3:
      return (
        <ButtonGroup>
          <EditLine damaged={error.damaged} line={line} />
          <DeleteLine line={line} />
        </ButtonGroup>
      );
    case 4:
      return (
        <ButtonGroup>
          <Button
            onClick={onReplace}
            sx={{ width: '150px' }}
            size='small'
            variant='outlined'
          >
            replace
          </Button>
          <DeleteLine line={line} />
        </ButtonGroup>
      );
    case 5:
      return <EditLine damaged={error.damaged} line={line} />;

    default:
      return <span>No quick fix available</span>;
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

interface ErrorsTableProps {
  errors: ErrorsMap;
}

const ErrorsTable: FC<ErrorsTableProps> = ({ errors }) => {
  const dispatch = useAppDispatch();

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    return () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  }, []);

  return (
    <div ref={tableRef}>
      <TableVirtuoso
        style={{
          height: 'calc((63.75px * 8) + 57px)',
          // boxShadow: '0 2px 2px rgba(0, 0, 0, 0.12)',
          // border: '1px solid #eaeaea',
        }}
        className='hide-scrollbars'
        data={Object.entries(errors)}
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
        itemContent={(_: number, [line, error]: [string, IError]) => (
          <>
            <StyledTableCell align='center'>{`${error.description} [Ln:${line},Cd:${error.errorCode}]`}</StyledTableCell>
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
              {ButtonByErrorCode(+line, error, dispatch)}
            </StyledTableCell>
          </>
        )}
      />
    </div>
  );
};

export default ErrorsTable;
