import React from 'react';

import {
  Editor,
  Panel,
  Formula,
  Solutions,
  ErrorsList,
} from '../../components';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <Editor />
        <ErrorsList />
        <Panel />
        <Solutions />
        <Formula />
      </section>
    </div>
  );
};

export default Home;
