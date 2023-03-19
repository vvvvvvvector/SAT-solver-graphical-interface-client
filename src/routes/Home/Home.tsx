import React from "react";

import { Editor, Panel, Formula, Solutions } from "../../components";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Editor />
          <Panel />
          <Formula />
          <Solutions />
        </div>
      </div>
    </>
  );
};

export default Home;
