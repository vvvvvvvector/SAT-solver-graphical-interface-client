import React from "react";

import { Outlet, Link } from "react-router-dom";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div>
          <h2>
            SAT-solver graphical interface<span>🤖</span>
          </h2>
          <ul>
            <li>
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to={"/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to={"/linker"}
              >
                Formulas linker
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
};
