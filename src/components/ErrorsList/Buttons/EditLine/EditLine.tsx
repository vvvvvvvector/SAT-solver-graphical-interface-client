import React from "react";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { editLine } from "../../../../redux/slices/editor";

import { Button } from "@mui/material";

export const EditLine: React.FC<{ line: number; damaged: string }> = ({
  line,
  damaged,
}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    const editedLine = window.prompt("Edit a clause:", damaged);

    if (editedLine) {
      dispatch(editLine({ line, editedLine }));

      toast.success("Clause was edited successfully!");
    } else {
      toast.error("You have to write something instead of empty line!");
    }
  };

  return (
    <Button
      onClick={onClick}
      sx={{ width: "95px" }}
      size="small"
      variant="outlined"
    >
      Edit
    </Button>
  );
};
