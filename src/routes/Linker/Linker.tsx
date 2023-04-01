import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../axios";

import { useDispatch } from "react-redux";
import { clearErrors, setDimacs } from "../../redux/slices/editor";
import { clearSolutions } from "../../redux/slices/solutions";
import { setFormula } from "../../redux/slices/formula";

import { Button } from "@mui/material";

import styles from "./Linker.module.scss";

const Linker: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstDimacs, setFirstDimacs] = React.useState("");
  const [secondDimacs, setSecondDimacs] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const onClickLink = async () => {
    const firstDimacsFiltered = firstDimacs
      .split("\n")
      .filter((line) => {
        return line.match(
          /^p\s+cnf\s+[1-9][0-9]*\s+[1-9][0-9]*\s*$|^\s*(?:-?[1-9][0-9]*\s+)+0\s*$/
        );
      })
      .join("\n");

    const secondDimacsFiltered = secondDimacs
      .split("\n")
      .filter((line) => {
        return line.match(
          /^p\s+cnf\s+[1-9][0-9]*\s+[1-9][0-9]*\s*$|^\s*(?:-?[1-9][0-9]*\s+)+0\s*$/
        );
      })
      .join("\n");

    setFirstDimacs(firstDimacsFiltered);
    setSecondDimacs(secondDimacsFiltered);

    try {
      setLoading(true);

      const response = await axiosInstance.post("/link", {
        firstDimacs: firstDimacsFiltered,
        secondDimacs: secondDimacsFiltered,
      });

      setLoading(false);

      dispatch(setDimacs(response.data.result));
      dispatch(clearErrors());
      dispatch(clearSolutions());
      dispatch(setFormula([]));

      navigate("/");

      toast.success("Formulas were successfully linked!");
    } catch (error: any) {
      setLoading(false);

      if (error.response.status === 421) {
        // Formulas are the same
        toast.error(error.response.data.detail);
      } else if (error.response.status === 422) {
        // There is no formula definition in the first formula
        toast.error(error.response.data.detail);
      } else if (error.response.status === 423) {
        // There is no formula definition in the second formula
        toast.error(error.response.data.detail);
      } else {
        toast.error("Something went wrong!");
      }

      console.error(error);
    }
  };

  const onClickUploadFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        toast.success("First formula was successfully uploaded!");

        const dimacs = reader.result as string;

        setFirstDimacs(dimacs);
      };

      reader.onerror = () => {
        toast.error("Error while uploading first formula!");
      };
    }

    e.target.value = ""; // allows re-add the same file again
  };

  const onClickUploadSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        toast.success("Second formula was successfully uploaded!");

        const dimacs = reader.result as string;

        setSecondDimacs(dimacs);
      };

      reader.onerror = () => {
        toast.error("Error while uploading second file!");
      };
    }

    e.target.value = ""; // allows re-add the same file again
  };

  return (
    <div className={styles.container}>
      <section className={styles.linker}>
        <div className={styles.formulas}>
          <div className={styles.formula}>
            <Button
              sx={{ marginBottom: "25px" }}
              size="large"
              variant="contained"
              component="label"
            >
              Upload 1st formula
              <input
                onChange={onClickUploadFirst}
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
              value={firstDimacs}
              onChange={(e) => setFirstDimacs(e.target.value)}
              placeholder="First formula..."
            />
          </div>
          <div className={styles.formula}>
            <Button
              sx={{ marginBottom: "25px" }}
              size="large"
              variant="contained"
              component="label"
            >
              Upload 2nd formula
              <input
                onChange={onClickUploadSecond}
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
              value={secondDimacs}
              onChange={(e) => setSecondDimacs(e.target.value)}
              placeholder="Second formula..."
            />
          </div>
        </div>
        <Button
          sx={{
            maxWidth: "300px",
            width: "100%",
          }}
          disabled={loading || firstDimacs === "" || secondDimacs === ""}
          size="large"
          variant="outlined"
          onClick={onClickLink}
        >
          {loading ? "Linking..." : "Link"}
        </Button>
      </section>
    </div>
  );
};

export default Linker;
