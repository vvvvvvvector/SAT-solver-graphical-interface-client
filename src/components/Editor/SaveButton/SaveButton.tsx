import React from "react";
import { toast } from "react-hot-toast";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton } from "@mui/material";

const SaveButton: React.FC = () => {
  const { dimacs } = useSelector((state: RootState) => state.editor);

  const onClickSave = () => {
    if (window.confirm("Do you want to save a formula in a file?")) {
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
    <IconButton onClick={onClickSave} color="primary">
      <FileDownloadOutlinedIcon color="primary" />
    </IconButton>
  ) : (
    <></>
  );
};

export default SaveButton;
