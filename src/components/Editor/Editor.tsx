import React from "react";

import Gutter from "./Gutter/Gutter";
import TextArea from "./TextArea/TextArea";
import Errors from "./Errors/Errors";
import { Save, Upload, Fix, Clear, RemoveDuplicates } from "./Buttons/";

import styles from "./Editor.module.scss";

export const Editor: React.FC = () => {
  const errorsRef = React.useRef<HTMLDivElement>(null);
  const gutterRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={styles.editor}>
      <Gutter ref={gutterRef} />
      <div className={styles.content}>
        <TextArea gutterRef={gutterRef} errorsRef={errorsRef} />
        <Errors ref={errorsRef} />
      </div>
      <div className={styles.controls}>
        <div className={styles.buttons}>
          <Save />
          <Upload />
          <Fix />
          <RemoveDuplicates />
        </div>
        <Clear />
      </div>
    </div>
  );
};
