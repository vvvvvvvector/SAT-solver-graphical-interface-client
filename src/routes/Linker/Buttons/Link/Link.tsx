import React from "react";

import { Button } from "@mui/material";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";

export const Link: React.FC<{
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}> = ({ disabled, loading, onClick }) => {
  return (
    <Button
      sx={{
        maxWidth: "310px",
        width: "100%",
      }}
      disabled={disabled}
      variant="outlined"
      onClick={onClick}
      endIcon={<InsertLinkOutlinedIcon />}
    >
      {loading ? "Linking..." : "Link formulas"}
    </Button>
  );
};
