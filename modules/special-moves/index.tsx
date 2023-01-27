import { Box, Typography } from '@mui/material';
import useDataStore from 'store';
import styles from 'styles/common.module.css';
import { formatSecondsToDisplayTime } from 'utils/date-time-format';

const SpecialMovesGrid = () => {

  const currentQuarter = useDataStore(state => state.currentQuarter);
  const concussionInterchanges = useDataStore(state => state.quarters[currentQuarter].concussionInterchange);

  return (
    <Box>
      <Box className={`${styles['table-header']} ${styles['background-opacity']}`} display="flex">
        <Box className={`${styles['team-cell']} ${styles['border-right']}`}>
          <Typography fontWeight="600" fontSize="16px">Time</Typography>
        </Box>
        <Box className={`${styles['team-cell']} ${styles['border-right']}`}>
          <Typography fontWeight="600" fontSize="16px">Name</Typography>
        </Box>
        <Box className={`${styles['team-cell']} ${styles['border-right']}`}>
          <Typography fontWeight="600" fontSize="16px">Type</Typography>
        </Box>
        <Box className={`${styles['team-cell']}`}>
          <Typography fontWeight="600" fontSize="16px">Status</Typography>
        </Box>
      </Box>
      <Box>
        {
          Object.values(concussionInterchanges).map((data, idx) => <Box key={data.personId} className={`${styles['table-row']} ${styles['background-opacity']}`}>
            <Box className={`${styles['team-cell']} ${styles['border-right']} ${styles['flex-content-center']}`}>
              <Typography fontWeight="600" fontSize="16px">Q1 {formatSecondsToDisplayTime(data.quarterTime)}</Typography>
            </Box>
            <Box className={`${styles['team-cell']} ${styles['border-right']} ${styles['flex-content-center']}`}>
              <Typography fontWeight="600" fontSize="16px">{data.player?.displayName}</Typography>
            </Box>
            <Box className={`${styles['team-cell']} ${styles['border-right']} ${styles['flex-content-center']}`}>
              <Typography fontWeight="600" fontSize="16px">Concussion</Typography>
            </Box>
            <Box className={`${styles['team-cell']} ${styles['border-right']} ${styles['flex-content-center']}`}>
              <Typography fontWeight="600" fontSize="16px">{formatSecondsToDisplayTime(data.time)}</Typography>
            </Box>
          </Box>
          )
        }
      </Box>
    </Box>
  );
};

export default SpecialMovesGrid;
