import React from "react";
import { toast } from "react-hot-toast";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton, Tooltip } from "@mui/material";

const SaveButton: React.FC = () => {
  const { dimacs } = useSelector((state: RootState) => state.editor);

  const onClickSave = () => {
    if (window.confirm("Do you want to save a formula to a file?")) {
      const filename = window.prompt("Enter a filename: ");

      if (filename) {
        const blob = new Blob([dimacs], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.download = `${filename}.txt`;
        link.href = url;
        link.click();

        toast.success("Formula was successfully saved!");
      }
    }
  };

  return dimacs.length ? (
    <Tooltip title="Save formula to a file" arrow>
      <IconButton onClick={onClickSave} color="primary">
        <FileDownloadOutlinedIcon color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    <></>
  );
};

export default SaveButton;
