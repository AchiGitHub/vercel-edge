import { Alert } from '@mui/material';
import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const StatusBar = () => {
  return (
    <>
      <Alert icon={false} severity="success" action={<FiberManualRecordIcon />}>
        Connected
      </Alert>
    </>
  );
};

export default StatusBar;
