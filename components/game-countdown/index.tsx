import React from 'react'
import { Typography } from '@mui/material';
import { useMatchTime } from 'context/match';
import { formatSecondsToDisplayTime } from 'utils/date-time-format';

function Timer() {
    
    const { matchTime } = useMatchTime();

    return <Typography fontWeight='600' fontSize='24px' lineHeight='32.02px' textAlign='center'>Q1 {formatSecondsToDisplayTime(matchTime)}</Typography>;
}


export default Timer
