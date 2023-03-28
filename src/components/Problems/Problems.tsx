import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Paper, TableContainer } from "@mui/material";

import styles from "./Problems.module.scss";

export const Problems: React.FC = () => {
  const { errors } = useSelector((state: RootState) => state.editor);

  return (
    <>
      {errors.length > 0 ? (
        <div className={styles.problems}>
          <h2 className={styles.header}>Problems list: </h2>
          <Paper
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.12)",
              boxShadow: "0 2px 2px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Error description</TableCell>
                  <TableCell align="center">Damaged line</TableCell>
                  <TableCell align="center">Error line</TableCell>
                  <TableCell align="center">Fix proposition</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {errors.map((error, index) => (
                  <TableRow key={error.line}>
                    <TableCell align="center" sx={{ width: "32%" }}>
                      {`🚫 ${error.description}`}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "100px",
                        whiteSpace: "nowrap",
                        overflowX: "scroll",
                      }}
                      align="center"
                    >
                      {error.damaged ? error.damaged : "Line is empty here 🙊"}
                    </TableCell>
                    <TableCell align="center">{error.line}</TableCell>
                    <TableCell align="center">
                      {index % 2 ? (
                        <Button
                          size="small"
                          sx={{ width: "100px" }}
                          variant="outlined"
                        >
                          Fix
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          sx={{ width: "100px" }}
                          variant="outlined"
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
