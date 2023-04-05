import React from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../../../axios";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";

import { Button } from "@mui/material";

import { buttonStyle } from "../../../../shared/mui";
import { setFormula } from "../../../../redux/slices/formula";
import {
  clearSolutions,
  setSolutions,
} from "../../../../redux/slices/solutions";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoopIcon from "@mui/icons-material/Loop";

import styles from "./FindAll.module.scss";

enum Status {
  PENDING = "pending",
  STOPPED = "stopped",
  NOTSTARTED = "not started",
  END = "end",
}

export const FindAll: React.FC<{ solver: string }> = ({ solver }) => {
  const dispatch = useDispatch();

  const loop = React.useRef<Status>(Status.NOTSTARTED);

  const [counter, setCounter] = React.useState(0);

  const { clauses, changed } = useSelector((state: RootState) => state.formula);
  const { dimacs, errors } = useSelector((state: RootState) => state.editor);

  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const onClickFindAll = async () => {
    const solutions: number[][] = [];

    setLoading(true);

    setOpen(true);

    const response = await axiosInstance.post("/solve", {
      dimacs,
      solver,
    });

    if (response.data.satisfiable) {
      dispatch(setFormula(response.data.clauses.slice(0, -1)));

      sessionStorage.setItem("formula", JSON.stringify(response.data.clauses));

      dispatch(clearSolutions());
      //dispatch(setSolution(response.data.first_solution));
      solutions.push(response.data.first_solution);
      setCounter((prev) => prev + 1);

      loop.current = Status.PENDING;

      while (loop.current === Status.PENDING) {
        const response = await axiosInstance.post("/next-solution", {
          solver,
          formula: sessionStorage.getItem("formula"),
        });

        if (response.data.satisfiable) {
          //dispatch(setSolution(response.data.next_solution));
          solutions.push(response.data.next_solution);
          setCounter((prev) => prev + 1);

          sessionStorage.setItem(
            "formula",
            JSON.stringify(response.data.clauses)
          );
        } else {
          loop.current = Status.END;
        }
      }
    }

    setLoading(false);

    setOpen(false);

    if (loop.current === Status.STOPPED) {
      setCounter(solutions.length);

      toast.success(
        `Successfully found: ${solutions.length} ${
          solutions.length === 1 ? "solution" : "solutions"
        }`,
        {
          duration: 3000,
        }
      );
    } else if (loop.current === Status.END) {
      toast.success("Successfully found all solutions!", {
        duration: 3000,
      });
    }

    setCounter(0);

    dispatch(setSolutions(solutions));
  };

  const onClickFindOther = async () => {
    const solutions: number[][] = [];

    setOpen(true);

    setLoading(true);

    loop.current = Status.PENDING;

    while (loop.current === Status.PENDING) {
      const response = await axiosInstance.post("/next-solution", {
        solver,
        formula: sessionStorage.getItem("formula"),
      });

      if (response.data.satisfiable) {
        //dispatch(setSolution(response.data.next_solution));
        solutions.push(response.data.next_solution);
        setCounter((prev) => prev + 1);

        sessionStorage.setItem(
          "formula",
          JSON.stringify(response.data.clauses)
        );
      } else {
        loop.current = Status.END;
      }
    }

    setOpen(false);

    setLoading(false);

    if (loop.current === Status.END) {
      toast.success("Successfully found all other solutions!", {
        duration: 3000,
      });
    } else {
      setCounter(solutions.length);

      toast.success(
        `Successfully found: ${solutions.length} ${
          solutions.length === 1 ? "solution" : "solutions"
        }`,
        {
          duration: 3000,
        }
      );
    }

    dispatch(setSolutions(solutions));

    setCounter(0);
  };

  return (
    <>
      {clauses.length > 0 && !changed ? (
        <>
          <Button
            disabled={errors.length > 0 || loading}
            onClick={onClickFindOther}
            sx={buttonStyle}
            variant="contained"
            endIcon={<LoopIcon />}
          >
            Find other solutions
          </Button>
          {loading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <div className={styles.dialog}>
                <h3>{`Found ${counter} ${
                  counter == 1 ? "solution" : "solutions"
                }`}</h3>
                <CircularProgress color="primary" />
                <Button
                  sx={{
                    maxWidth: "200px",
                    width: "100%",
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                    loop.current = Status.STOPPED;
                  }}
                >
                  Stop
                </Button>
              </div>
            </Backdrop>
          )}
        </>
      ) : (
        <>
          <Button
            disabled={dimacs.length === 0 || errors.length > 0}
            onClick={onClickFindAll}
            sx={buttonStyle}
            variant="contained"
            endIcon={<LoopIcon />}
          >
            Find All
          </Button>
          {loading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <div className={styles.dialog}>
                <h3>{`Found ${counter} ${
                  counter == 1 ? "solution" : "solutions"
                }`}</h3>
                <CircularProgress color="primary" />
                <Button
                  sx={{
                    maxWidth: "200px",
                    width: "100%",
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                    loop.current = Status.STOPPED;
                  }}
                >
                  Stop
                </Button>
              </div>
            </Backdrop>
          )}
        </>
      )}
    </>
  );
};
