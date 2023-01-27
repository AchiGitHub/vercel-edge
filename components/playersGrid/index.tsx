import { Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from 'styles/playersgrid.module.css';
import { PlayerGridProp } from 'types/player-grid-types';

const PlayerGrid = ({
  playerList,
  playerClicked,
  clickedPlayerId,
}: PlayerGridProp) => {
  const backgroundGridColors: { [key: string]: string } = {
    rule_subbed: 'red',
    rule_med: 'orange',
    INT: 'blue',
  };
  const isClickable = (index:number) => {
    // if a subbed ou player make it unclickable
    if (playerList[index] && !playerList[index].disabled) {
      return {
        // backgroundColor: 'blue',
        // opacity: [0.9, 0.8, 0.7],
        cursor: 'pointer',
      };
    } else {
      return {
        cursor: 'not-allowed',
      };
    }
  };
  const sendClickedPlayerDate = (index:number) => {
    // do the color Change
    if (playerList[index] && !playerList[index].disabled)
      playerClicked(playerList[index]);
  };

  const rightBorder = (id:number) => {
    if (id % 6 == 0) {
      return false;
    }
    return true;
  };

  const borderTop = (id:number) => {
    if (id <= 6) {
      return true;
    } else {
      return false;
    }
  };
  const bottomBorder = (index:number) => {
    if (index > Math.floor(playerList.length / 6) * 6) {
      return false;
    } else {
      return true;
    }
  };
  const calculateCells = () => {
    if (playerList.length % 6 == 0) {
      return playerList.length;
    } else {
      return (Math.floor(playerList.length / 6) + 1) * 6;
    }
  };
  const noOfCells = calculateCells();

  const getBackgroundColor = (index: number) => {
    // if the grid box is clicked
    if (playerList[index].personId == clickedPlayerId) {
      return 'blue';
    } else {
      // check for special moves colors
      return backgroundGridColors[playerList[index].positions.selected.code];
    }
  };
  return (
    <Box className={styles['player-box']}>
      <Grid
        className={styles['grid-box']}
        container
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {Array.from(Array(noOfCells)).map((_, index) => (
          <Grid
            sx={{
              borderRight: rightBorder(index + 1) ? '1px solid #B9B9BB' : 0,
              borderTop: borderTop(index + 1) ? '1px solid #B9B9BB' : 0,
              borderBottom: bottomBorder(index + 1) ? '1px solid #B9B9BB' : 0,
              '&:hover': isClickable(index),
              backgroundColor: playerList[index] && getBackgroundColor(index),
            }}
            item
            xs={12 / 6}
            sm={12 / 6}
            md={12 / 6}
            key={index}
            onClick={() => sendClickedPlayerDate(index)}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 20,
                  },
                }}
              >
                {playerList[index]?.jumperNumber || ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    sm: 13,
                  },
                }}
              >
                {playerList[index]?.displayName || ''}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerGrid;
