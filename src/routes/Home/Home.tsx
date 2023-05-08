import React from 'react';

import { Editor, Panel, Formula, Solutions, Problems } from '../../components';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <Editor />
        <Problems />
        <Panel />
        <Solutions />
        <Formula />
      </section>
    </div>
  );
};

export default Home;
