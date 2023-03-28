import React from "react";

import {
  Editor,
  Panel,
  Formula,
  Solutions,
  ErrorsList,
} from "../../components";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Editor />
          <ErrorsList />
          <Panel />
          <Formula />
          <Solutions />
        </div>
      </div>
    </>
  );
};

export default Home;
