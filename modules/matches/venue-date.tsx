import { Typography, Box } from '@mui/material';
import { formatMatchStartDate } from 'utils/date-time-format';

interface VenueDateProps {
  venue: string;
  date: string;
}

function VenueDate({ date, venue }: VenueDateProps) {
  const { day, month, numericDay, year } = formatMatchStartDate({ date });
  return (
    <Box display='flex' flexDirection='column'>
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Typography fontWeight='700' fontSize='16px' lineHeight='28px'>{day}</Typography>
        <Typography ml='10px' fontWeight='400' fontSize='16px' lineHeight='28px'>{`${numericDay} ${month} ${year}`}</Typography>
      </Box>
      <Box>
        <Typography fontSize="12px">{venue}</Typography>
      </Box>
    </Box>
  )
}

export default VenueDate;