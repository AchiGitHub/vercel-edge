import React, { useContext } from 'react';
import { Icon, IconButton } from '@mui/material';
import { ColorContext } from './interchange-screen';

import styles from 'styles/interchange-screen.module.css';

interface InterchangeButtonProps {
  icon: React.ElementType;
  onClick: () => void;
}

function InterchangeButton({ icon, onClick }: InterchangeButtonProps) {

  // Get alert class name for 'warning' and 'count-limit
  const alertClassName = useContext(ColorContext);

  return (
    <IconButton id='interchange-button' className={styles[alertClassName.button] || styles['interchange-button']} aria-label="button-icon" onClick={onClick}>
      <Icon component={icon} sx={{ fontSize: '60px', cursor: 'pointer' }} />
    </IconButton>
  )
}

export default InterchangeButton