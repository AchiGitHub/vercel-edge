import { Box, Stack, Typography } from '@mui/material';
import Button from 'components/common/button/button';
import PlayerGrid from 'components/playersGrid';
import { useState, useEffect } from 'react';
import { palette } from 'utils/palette';
import styles from 'styles/blood-rule-player-grid.module.css';
// import { playersFakeList } from 'components/playersGrid/playersFakeList';
import Checkbox from '@mui/material/Checkbox';

import { Player } from 'types/store-types';
import { generatePlayerList } from 'utils/get-blod-and-injury-rule-players-list';
// import { Player } from 'types/store-types';

const BloodRulePlayerGrid = () => {
  const [clickedPlayerId, setClickedPlayerId] = useState<number>(0);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  // const setSelectedTab = useDataStore((state) => state.setSelectedTab);

  const playerClicked = (playerdetails: Player) => {
    setClickedPlayerId(playerdetails.personId);
  };

  const bloddRuleCancel = () => {};

  const bloodRuleSubmit = () => {
    // create the blood rule object
    // personId: number;
    // quarter: number;
    // gameTime: string;
    // realTime: string;
    // timerId: number;
  };

  useEffect(() => {
    // call the util function and get the updated player list
    const upDtPlayerList = generatePlayerList();
    setPlayerList(upDtPlayerList);
  }, []);

  return (
    <div className={styles['blood-grid']}>
      <div className={styles['blood-grid-container']}>
        <Box className={styles['blood-grid-header']}>
          <div>
            <Box
              className={styles['players-grid-header']}
              height='50px'
              sx={{
                border: 2,
                borderTopRadius: 2,
                borderColor: 'black',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Blood
              </Typography>
              <Box>
                Decrease the Interchange Count
                <Checkbox defaultChecked />
              </Box>
            </Box>
          </div>
        </Box>

        <PlayerGrid
          playerList={playerList}
          playerClicked={playerClicked}
          clickedPlayerId={clickedPlayerId}
        />
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          mt='10px'
          mb='10px'
        >
          <Button
            disabled={false}
            loading={false}
            onClick={() => bloddRuleCancel()}
            text='Cancel'
            variant='outlined'
            textColor={palette.white}
            width='200px'
            height='50px'
          />
          <Button
            text='Confirm'
            width='200px'
            height='50px'
            variant='contained'
            fontWeight='600'
            hoverBackground={palette.white}
            disabled={false}
            loading={false}
            textColor={palette.darkBlue}
            backgroundColor={palette.white}
            style={{ marginLeft: '10px' }}
            onClick={() => bloodRuleSubmit()}
          />
        </Stack>
      </div>
    </div>
  );
};

export default BloodRulePlayerGrid;
