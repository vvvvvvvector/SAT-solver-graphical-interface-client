import { FC } from 'react';

import { Outlet, Link } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';

import styles from './Header.module.scss';

export const Header: FC = () => {
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
            <div></div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/vvvvvvvector/SAT-solver-graphical-interface-frontend'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GitHubIcon
                sx={{
                  cursor: 'pointer',
                  color: '#666666',
                  fontSize: '21px',
                  '&:hover': {
                    color: '#28282b',
                  },
                }}
              />
            </a>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
