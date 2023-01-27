import React, { useEffect, useState } from 'react';
import styles from '../../styles/interchange-screen.module.css';
import { Stack } from '@mui/material';
import Image from 'next/image';
import { Box } from '@mui/system';
import Icon from '@mui/material/Icon';
import InterchangeCount from './interchange-count';
import useDataStore from 'store';
import Coutndown from 'components/game-countdown';
import { AlertClassNames } from 'types/interchange';

export const ColorContext = React.createContext<AlertClassNames>({ body: '', header: '', button: '' });

const InterchangeScreen = () => {
  
  const interchangeCount = useDataStore((state) => state.interchangeCount);
  
  const [alertClassName, setAlertClassName] = useState<AlertClassNames>({ body: '', header: '', button: '' });
  const [configWarningLimit, setConfigWarningLimit] = useState(10);
  const [configCountLimit, setConfigCountLimit] = useState(15);

  // TODO: Remove and Get wrning limit and count limit from configuration
  useEffect(() => {
    setConfigWarningLimit(parseInt(localStorage.getItem('warning') || '') || 10);
    setConfigCountLimit(parseInt(localStorage.getItem('count') || '') || 15);
  }, []);

  useEffect(() => {
    if (interchangeCount >= configWarningLimit && interchangeCount < configCountLimit) {
      setAlertClassName({ 
        header: 'warning-header',
        body: 'warning',
        button: 'warning-button'
      });
    } else if (interchangeCount >= configCountLimit) {
      setAlertClassName({
        header: 'count-limit-header', 
        body: 'count-limit',
        button: 'count-limit-button'
      });
    } else {
      setAlertClassName({
        header: '',
        body: '',
        button: ''
      });
    }
  }, [interchangeCount])


  return (
    <ColorContext.Provider value={alertClassName}>
      <div className={styles['interchange-grid']}>
        <Stack
          direction="column"
          spacing={2}
          className={`${styles['interchange-grid-container']} ${styles[alertClassName.body]}`}
        >
          <Box className={`${styles['interchange-grid-header']} ${styles[alertClassName.header]}`}>
            <div className={styles['headline']}>
              <div></div>
              <Coutndown />
              <Icon>
                <Image alt="icon" src="/Zoom.svg" width={20} height={20} />
              </Icon>
            </div>
          </Box>
          <InterchangeCount />
        </Stack>
      </div>
    </ColorContext.Provider>
  );
};

export default InterchangeScreen;
