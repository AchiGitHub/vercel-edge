import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Layout from 'components/common/layout';
import styles from 'styles/common.module.css';
import Header from 'components/common/header';
import ButtonLists from 'components/buttons-lists/button-lists';
import InterchangeScreen from 'modules/interchange/interchange-screen';
import BloodRulePlayerGrid from 'components/bloodrule';
import useDataStore from '../store';
import Benches from 'modules/benches/Benches';
import ConcusRulePlayerGrid from 'components/concussion';
import InjuryRulePlayerGrid from 'components/injury';
import SpecialMovesGrid from 'modules/special-moves';
import BreachRulePlayerGrid from 'modules/breach-rule/index';
import { useSignalR } from 'hooks/signalR/useSignalR';
import { Clock } from 'types/signalr';
import { MatchProvider } from 'context/match';
import Toast from 'components/common/toast/toast';
import { useNetworkConnectivity } from 'hooks/common/useNetworkConnectivity';
import { palette } from 'utils/palette';

function Home() {
  const [time, setTime] = useState(0);
  const [token, setToken] = useState<string>("");
  const [isInitialRender, setInitialRender] = useState(true);

  const selectedTab = useDataStore((state) => state.selectedTab);
  const teamName = useDataStore((state) => state.match);

  const { isOnline } = useNetworkConnectivity();

  // Restrict the network alert to display only after the intial render
  useEffect(() => {
    if (isInitialRender) {
      if (!isOnline) {
        setInitialRender(false);
      }
    }
  }, [isOnline])

  // TODO: remove once login is integrated
  useEffect(() => {
    const token = window.localStorage.getItem('token') || "";
    setToken(token);
    getConfig();
  }, [])

  useSignalR({
    accessToken: token,
    updateTime: (clockId: string, clock: Clock) => {
      const clockName = clock.name;
      if (clockName === "Countdown") {
        const splitMiliseconds = clock.time.split('.');
        const splitStr = splitMiliseconds[0].split(':');
        const seconds = (+splitStr[0]) * 60 * 60 + (+splitStr[1]) * 60 + (+splitStr[2]);
        setTime(seconds);
      }
    }
  });

  const getConfig = async () => {
    let res = await fetch(`/api/config`);
    let data = await res.json();
    console.log("Edge config", data);
  }


  const selectedTeamName =
    teamName.name === 'home'
      ? teamName?.match?.squads.home
      : teamName?.match?.squads.away;

  const components: { [key: string | number]: React.ReactNode } = {
    Blood: <BloodRulePlayerGrid />,
    Concussion: <ConcusRulePlayerGrid />,
    Injury: <InjuryRulePlayerGrid />,
    Absent: <BloodRulePlayerGrid />,
    Breach: <BreachRulePlayerGrid />,
    Runners: <BloodRulePlayerGrid />,
    Medical: <BloodRulePlayerGrid />,
    0: <SpecialMovesGrid />,
    1: <Benches />,
  };
  return (
    <MatchProvider value={{ matchTime: time }}>
      <Layout>
        <div className={styles['background-content']} />
        <div className={styles['container']}>
          <div className={styles['content']}>
            <Header title={selectedTeamName?.name ?? ''} />
            <div className={styles['landscape-buttons']}>
              <ButtonLists selectedTab={selectedTab} />
            </div>

            <Grid
              container
              spacing={1}
              mt='8px'
              pt={0}
            >
              <Grid
                md={6}
                xs={12}
                item
                mt={0}
                pt={0}
              >
                <InterchangeScreen />
              </Grid>
              <div className={styles['portrait-buttons']}>
                <ButtonLists selectedTab={selectedTab} />
              </div>
              <Grid
                item
                md={6}
                xs={12}
              >
                {components[selectedTab]}
              </Grid>
            </Grid>
          </div>
        </div>
        {
          !isInitialRender && <Toast color={isOnline ? 'success' : 'danger'} display={isOnline}>
            {
              isOnline ? <Box display='flex' flexDirection='row' alignItems='center' sx={{ color: palette.text['success'] }}>
                <TaskAltIcon />
                <Typography fontWeight='600' fontSize='14px' lineHeight='16.41px' ml='10px'>Internet Connection Restored</Typography>
              </Box> : <Box display='flex' flexDirection='row' alignItems='center' sx={{ color: palette.text['danger'] }}>
                <ErrorOutlineIcon />
                <Typography fontWeight='600' fontSize='14px' lineHeight='16.41px' ml='10px'>No Internet Connection</Typography>
              </Box>
            }
          </Toast>
        }
      </Layout>
    </MatchProvider>
  );
}

export default Home;
