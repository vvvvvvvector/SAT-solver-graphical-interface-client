import React from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import styles from "./Overlay.module.scss";

import Status from "../status";

const Overlap: React.FC<{
  open: boolean;
  setOpen: (value: boolean) => void;
  counter: number;
  loop: React.MutableRefObject<Status>;
}> = ({ open, setOpen, counter, loop }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <div className={styles.dialog}>
        <h3>{`Found ${counter} ${
          counter == 1 ? "solution" : "solutions"
        }...`}</h3>
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
  );
};

export default Overlap;
