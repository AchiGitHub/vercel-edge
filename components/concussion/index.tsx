import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Button from 'components/common/button/button';
import PlayerGrid from 'components/playersGrid';
import { useState, useEffect } from 'react';
import { palette } from 'utils/palette';
import styles from 'styles/concussion-rule.module.css';
import CheckBoxComponent from 'components/common/checkbox/checkbox';
import { Player } from 'types/store-types';
import { getConcussionPlayers } from 'utils/get-concussion-players';
import { startTimer } from 'utils/timer';
import useDataStore from 'store';
import { useMatchTime } from 'context/match';

const ConcusRulePlayerGrid = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<{ playerId: number, player: Player } | null>(null);
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const [playerList, setPlayerList] = useState<undefined | Player[]>();

  const { matchTime } = useMatchTime();
  
  const addHeadInjuryPlayer = useDataStore(state => state.addConcussionPlayer);
  const setPlayerTimer = useDataStore(state => state.setConcussionPlayerTimer);
  const setCurrentTab = useDataStore(state => state.setSelectedTab);

  const playerClicked = (player: Player) => {
    setSelectedPlayer({ playerId: player.personId, player });
  };

  const cancel = () => {};

  const submit = () => {
    startTimer({player: selectedPlayer?.player, time: matchTime, addPlayer: addHeadInjuryPlayer, setTimer: setPlayerTimer});
    setCurrentTab(0);
  };

  useEffect(() => {
    const upDtPlayerList = getConcussionPlayers();
    setPlayerList(upDtPlayerList);
  }, []);

  const onChecked = () => {
    setCheckBoxValue(!checkBoxValue);
  };

  if (playerList === undefined) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return (
    <div className={styles['grid']}>
      <Box
        sx={{ direction: 'column', justifyContent: 'space-between' }}
        className={styles['grid-container']}
      >
        <Box className={`${styles['grid-header']}`}>
          <div className={styles['headline']}>
            <Typography
              fontWeight='600'
              fontSize='24px'
              lineHeight='32.02px'
            >
              Concussion
            </Typography>
            <CheckBoxComponent
              label='Decrease the Interchange Count'
              onChecked={onChecked}
              checkBoxValue={checkBoxValue}
            />
          </div>
        </Box>

        <PlayerGrid
          playerList={playerList}
          playerClicked={playerClicked}
          clickedPlayerId={selectedPlayer?.playerId}
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
            onClick={() => cancel()}
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
            onClick={() => submit()}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default ConcusRulePlayerGrid;
