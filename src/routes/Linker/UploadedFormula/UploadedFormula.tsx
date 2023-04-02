import React from "react";
import { toast } from "react-hot-toast";

import { Button } from "@mui/material";

import styles from "./UploadedFormula.module.scss";

const UploadedFormula: React.FC<{
  dimacs: string;
  setDimacs: (value: string) => void;
  index: 1 | 2;
}> = ({ dimacs, setDimacs, index }) => {
  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        toast.success("First formula was successfully uploaded!");

        setDimacs(reader.result as string);
      };

      reader.onerror = () => {
        toast.error("Error while uploading first formula!");
      };
    }

    e.target.value = ""; // allows re-add the same file again
  };

  return (
    <div className={styles.formula}>
      <Button
        sx={{ marginBottom: "25px" }}
        size="large"
        variant="contained"
        component="label"
      >
        {index === 1 ? "Upload 1st formula" : "Upload 2nd formula"}
        <input
          onChange={onClickUpload}
          hidden
          type="file"
          accept=".txt, .cnf"
        />
      </Button>
      <textarea
        wrap="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={dimacs}
        onChange={(e) => setDimacs(e.target.value)}
        placeholder={
          index === 1 ? "1st formula here..." : "2nd formula here..."
        }
      />
    </div>
  );
};

export default UploadedFormula;
