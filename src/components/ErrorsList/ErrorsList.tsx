import React from "react";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

import { TableVirtuoso } from "react-virtuoso";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import styles from "./ErrorsList.module.scss";

type ErrorType = {
  line: number;
  errorCode: number;
  description: string;
  damaged: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e0e0e0",
    color: "#28282b",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
}));

export const ErrorsList = () => {
  const { errors } = useSelector((state: RootState) => state.editor);

  return (
    <>
      {errors.length > 0 ? (
        <div className={styles.errors}>
          <h2 className={styles.header}>
            There are {errors.length} errors in Your formula 😢
          </h2>
          <TableVirtuoso
            style={{
              height: "calc((63.75px * 6) + 57px)",
              boxShadow: "0 2px 2px rgba(0, 0, 0, 0.12)",
              border: "1px solid #eaeaea",
            }}
            data={errors}
            components={{
              Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
                <TableContainer component={Paper} {...props} ref={ref} />
              )),
              Table: (props) => (
                <Table
                  {...props}
                  sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
                />
              ),
              TableHead,
              TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
              TableBody: React.forwardRef<HTMLTableSectionElement>(
                (props, ref) => <TableBody {...props} ref={ref} />
              ),
            }}
            fixedHeaderContent={() => (
              <TableRow>
                <StyledTableCell
                  sx={{
                    width: "30%",
                    backgroundColor: "white",
                  }}
                  align="center"
                >
                  Error description
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: "125px",
                    backgroundColor: "white",
                  }}
                  align="center"
                >
                  Damaged line
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: "10%",
                    backgroundColor: "white",
                  }}
                  align="center"
                >
                  Error line
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    backgroundColor: "white",
                  }}
                  align="center"
                >
                  Fix proposition
                </StyledTableCell>
              </TableRow>
            )}
            itemContent={(_: number, row: ErrorType) => (
              <>
                <StyledTableCell align="center">{`🚫 ${row.description}`}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflowX: "scroll",
                  }}
                  align="center"
                >
                  {row.damaged ? row.damaged : "Line is empty here 🙊"}
                </StyledTableCell>
                <StyledTableCell align="center">{row.line}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button size="small" variant="outlined">
                    Fix
                  </Button>
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
