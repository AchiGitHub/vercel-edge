import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { FooterParameter } from 'types/footer-types';
import styles from 'styles/footer.module.css';

const Footer = ({ setSelectedTab, selectedTab }: FooterParameter) => {
  return (
    <Box>
      <BottomNavigation
        className={styles.content}
        showLabels
        value={selectedTab}
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlinedIcon />}
          className={styles['footer-font-color']}
        />
        <BottomNavigationAction
          label="Benches"
          icon={<SwapHorizIcon />}
          className={styles['footer-font-color']}
        />
        <BottomNavigationAction
          label="Timers"
          icon={<AccessTimeIcon />}
          className={styles['footer-font-color']}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
