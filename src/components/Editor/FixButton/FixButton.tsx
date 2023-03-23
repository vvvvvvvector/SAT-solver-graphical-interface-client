import React from "react";
import { toast } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";

import { IconButton, Tooltip } from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import axiosInstance from "../../../axios";
import { setDimacs } from "../../../redux/slices/editor";

const FixButton: React.FC = () => {
  const dispatch = useDispatch();

  const { dimacs } = useSelector((state: RootState) => state.editor);
  const { errors } = useSelector((state: RootState) => state.editor);

  const onClickFix = async () => {
    try {
      const response = await toast.promise(
        axiosInstance.post("/fix", {
          dimacs: dimacs.replaceAll(/c .*\n|c\n|\nc$|\nc .*|c$/g, ""),
        }),
        {
          loading: "Fixing dimacs...",
          success: "Successfully fixed!",
          error: "Error occured while fixing dimacs!",
        }
      );

      dispatch(setDimacs(response.data.fixed));
    } catch (error) {
      console.log(error);
    }
  };

  return errors.length > 0 ? (
    <Tooltip title="Try to fix errors in dimacs" arrow>
      <IconButton onClick={onClickFix} color="primary">
        <AutoFixHighOutlinedIcon color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    <></>
  );
};

export default FixButton;
