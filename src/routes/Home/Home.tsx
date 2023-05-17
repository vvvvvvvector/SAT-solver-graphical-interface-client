import React from 'react';

import { Editor, Panel, Formula, Solutions, Problems } from '../../components';

import styles from './Home.module.scss';

import { IconButton, Tooltip } from '@mui/material';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <div className={styles.panelContainer}>
          <div className={styles.panel}>
            <div className={styles.select}>
              <span>Selected SAT-solver:</span>
              <div>
                <span>Cadical</span>
                <svg
                  transform='scale(1 -1)'
                  width='10'
                  height='6'
                  viewBox='0 0 10 6'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                    fill='#2C2C2C'
                  />
                </svg>
              </div>
            </div>
            <div className={styles.divi}></div>
            <Tooltip title='Solve' arrow placement='top'>
              <IconButton>
                <CalculateOutlinedIcon
                  sx={{
                    color: '#fff',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Next solution' arrow placement='top'>
              <IconButton>
                <ForwardOutlinedIcon
                  sx={{
                    color: '#fff',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Find all solutions' arrow placement='top'>
              <IconButton>
                <LoopIcon
                  sx={{
                    color: '#fff',
                  }}
                />
              </IconButton>
            </Tooltip>
            <div className={styles.divi}></div>
            <Tooltip title='Save formula to a file' arrow placement='top'>
              <IconButton>
                <FileDownloadOutlinedIcon
                  sx={{
                    color: '#fff',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Upload formula' arrow placement='top'>
              <IconButton>
                <UploadFileIcon
                  sx={{
                    color: '#fff',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip
              title='Try to fix all errors in DIMACS'
              arrow
              placement='top'
            >
              <IconButton>
                <AutoFixHighOutlinedIcon
                  sx={{
                    color: '#fff',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Remove duplicate clauses' arrow placement='top'>
              <IconButton>
                <ContentCutOutlinedIcon
                  sx={{
                    color: '#fff',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Clear workspace' arrow placement='top'>
              <IconButton>
                <DeleteOutlineIcon
                  sx={{
                    color: '#f43f5e',
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Editor />
        <Problems />
        {/* <Panel /> */}
        <Solutions />
        <Formula />
      </section>
    </div>
  );
};

export default Home;
