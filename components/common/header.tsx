import React from 'react';
import Box from '@mui/material/Box';

import styles from 'styles/header.module.css';
import ConnectionStatus from 'components/common/connection/connection-status';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useNetworkConnectivity } from 'hooks/common/useNetworkConnectivity';

const Header = ({ title = "Match and Team Selection" }: { title?: string }) => {
    const { isOnline } = useNetworkConnectivity();
    return (
      <Box>
        <Box className={styles.content}>
          <ConnectionStatus status={isOnline} />
          <Typography
            sx={{
              fontSize: '30px',
              fontWeight: '600',
              textAlign: 'center'
            }}
          >
            {title}
          </Typography>
          <Box className={styles['right-content']}>
            <Box className={styles['logo']}>
              <Image
                src={require('../../public/afl-logo.png')}
                alt="AFL Logo"
                width={80}
                height={40}
              />
            </Box>
            <Typography>Interchange Capture</Typography>
          </Box>
        </Box>
      </Box>
    );
};

export default Header;
