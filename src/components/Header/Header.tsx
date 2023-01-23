import React from "react";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <h1 style={styles}>
      SAT-solver graphical interface <span>🤖</span>
    </h1>
  );
};
