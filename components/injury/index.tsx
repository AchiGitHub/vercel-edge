import React from 'react';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import PlayerGrid from 'components/playersGrid';
import { useEffect, useState } from 'react';
import styles from 'styles/blood-rule-player-grid.module.css';
import Button from 'components/common/button/button';
import { palette } from 'utils/palette';
import styled from '@emotion/styled';
import useDataStore from 'store';
import { Player } from 'types/store-types';
import { generatePlayerList } from 'utils/get-blod-and-injury-rule-players-list';

const InjuryRulePlayerGrid = () => {
  const [clickedPlayerId, setClickedPlayerId] = useState<number>(0);
  const setSelectedTab = useDataStore((state) => state.setSelectedTab);
  const playerClicked = (playerdetails: Player) => {
    setClickedPlayerId(playerdetails.personId);
  };
  const [playerList, setPlayerList] = useState<Player[]>([]);

  const injuryRuleCancel = () => {};
  const injuryRuleSubmit = () => {
    setSelectedTab(0);
  };

  useEffect(() => {
    const updatedPlayerList = generatePlayerList();
    setPlayerList(updatedPlayerList);
  }, []);

  //update the state related to relevant quater
  const setInjurytype = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //   personId: number;
    // quarter: number;
    // gameTime: string;
    // realTime: string;
    // timerId: number;
    console.log('Injusry type', (e.target as HTMLInputElement).value);
  };

  const StyledRadio = styled(Radio)({
    '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)': {
      color: 'white',
    },
    '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
      color: 'white',
    },
  });

  return (
    <div className={styles['blood-grid']}>
      <div className={styles['blood-grid-container']}>
        <Box className={styles['blood-grid-header']}>
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
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '25px',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '4px',
              }}
            >
              Injury
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Stack
                direction='row'
                display='flex'
                alignItems='center'
              >
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      value='exceptional'
                      control={
                        <StyledRadio onClick={(e) => setInjurytype(e)} />
                      }
                      label='Exceptional Injury'
                    />
                    <FormControlLabel
                      value='stretcher'
                      control={
                        <StyledRadio onClick={(e) => setInjurytype(e)} />
                      }
                      label='Stretcher Use'
                    />
                  </Box>
                </RadioGroup>
              </Stack>
            </Box>
          </Box>
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
            onClick={() => injuryRuleCancel()}
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
            onClick={() => injuryRuleSubmit()}
          />
        </Stack>
      </div>
    </div>
  );
};
export default InjuryRulePlayerGrid;
