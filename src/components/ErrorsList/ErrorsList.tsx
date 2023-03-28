import React from "react";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

import { TableVirtuoso, TableComponents } from "react-virtuoso";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

import styles from "./ErrorsList.module.scss";

type ErrorType = {
  line: number;
  errorCode: number;
  description: string;
  damaged: string;
};

const VirtuosoTableComponents: TableComponents<ErrorType> = {
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
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const fixedHeaderContent = () => {
  return (
    <TableRow>
      <TableCell
        sx={{
          width: "30%",
          backgroundColor: "background.paper",
        }}
        align="center"
      >
        Error description
      </TableCell>
      <TableCell
        sx={{
          maxWidth: "100px",
          backgroundColor: "background.paper",
        }}
        align="center"
      >
        Damaged line
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: "background.paper",
        }}
        align="center"
      >
        Error line
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: "background.paper",
        }}
        align="center"
      >
        Fix proposition
      </TableCell>
    </TableRow>
  );
};

const rowContent = (_index: number, row: ErrorType) => {
  return (
    <React.Fragment>
      <TableCell align="center">{`🚫 ${row.description}`}</TableCell>
      <TableCell
        sx={{
          whiteSpace: "nowrap",
          overflowX: "scroll",
        }}
        align="center"
      >
        {row.damaged ? row.damaged : "Line is empty here 🙊"}
      </TableCell>
      <TableCell align="center">{row.line}</TableCell>
      <TableCell align="center">
        <Button size="small" variant="outlined">
          Fix
        </Button>
      </TableCell>
    </React.Fragment>
  );
};

export const ErrorsList = () => {
  const { errors } = useSelector((state: RootState) => state.editor);

  return (
    <>
      {errors.length > 0 ? (
        <div className={styles.errors}>
          <h2 className={styles.header}>
            There are {errors.length} errors in Your formula 😢
          </h2>
          <Paper
            sx={{
              height: "calc(63.75px * 7)",
              marginBottom: "30px",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              boxShadow: "0 2px 2px rgba(0, 0, 0, 0.12)",
            }}
          >
            <TableVirtuoso
              data={errors}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </Paper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
