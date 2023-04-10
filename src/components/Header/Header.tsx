import React from 'react';

import { Outlet, Link } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div>
          <h1>
            SAT-solver graphical interface<span>🤖</span>
          </h1>
          <nav>
            <ul>
              <li>
                <Link
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  to={'/'}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  to={'/linker'}
                >
                  Formulas linker
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
