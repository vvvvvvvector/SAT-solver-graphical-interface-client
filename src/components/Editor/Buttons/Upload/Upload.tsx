import React from "react";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setDimacs } from "../../../../redux/slices/editor";
import { setFormula } from "../../../../redux/slices/formula";
import { clearSolutions } from "../../../../redux/slices/solutions";

import { IconButton, Tooltip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export const Upload: React.FC = () => {
  const dispatch = useDispatch();

  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        toast.success("Formula was successfully uploaded!");

        const dimacs = reader.result as string;

        dispatch(setDimacs(dimacs));
        dispatch(setFormula([]));
        dispatch(clearSolutions());
      };

      reader.onerror = () => {
        toast.error("Error while uploading file!");
      };
    }

    e.target.value = ""; // allows re-add the same file again
  };

  return (
    <Tooltip title="Upload formula" arrow>
      <IconButton color="primary" component="label">
        <input
          hidden
          type="file"
          onChange={onClickUpload}
          accept=".txt, .dimacs"
        />
        <UploadFileIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};
