import { Box, Typography } from '@mui/material';
import { formatTime } from 'utils/date-time-format';

interface MatchTimeProps {
    utcMatchStart: string;
    timeZone: string;
}

function MatchTime({ utcMatchStart, timeZone }: MatchTimeProps) {
    const { time, timeZone: regionalTimeZone } = formatTime({ timeZone, utcMatchStart });
    return (
        <Box display='flex' flexDirection='row' justifyContent='center' alignItems="center">
            <Typography fontWeight='400' fontSize='24px'>{time}</Typography>
            <Typography fontSize='14px' fontWeight='400' ml="10px">{regionalTimeZone}</Typography>
        </Box>
    )
}

export default MatchTime