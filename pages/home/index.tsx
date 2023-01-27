import React from 'react';
import { Box } from "@mui/material";
import { dehydrate, useQuery, QueryClient } from "@tanstack/react-query";
import Button from "components/common/button/button";
import Header from "components/common/header";
import Round from "modules/matches/round";
import { fetchMatchFixtures } from "hooks";

import styles from 'styles/home.module.css';
import { palette } from "utils/palette";
import { TeamProvider } from 'context/selected-match-context';
import Modal from 'components/common/modal/modal';
import { SelectedTeamState } from 'types/match-types';
import MatchVerification from 'modules/matches/match-confirmation/match-confirmation';
import CircularProgress from '@mui/material/CircularProgress';
import useDataStore from 'store';

const SelectMatch = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<SelectedTeamState>({
    round: null,
    match: null,
    teamId: 0,
    side: "home"
  });
  const setSelectedMatch = useDataStore((state) => state.setSelectedMatch);
  const setSelectedTab = useDataStore((state) => state.setSelectedTab);

  const { data, isLoading } = useQuery({
    queryKey: ["match"],
    queryFn: fetchMatchFixtures,
  });

  const cancelSelection = () => {
    setSelectedTeam({
      match: null,
      round: null,
      teamId: 0,
      side: "home"
    })
  }

  const confirmTeam = () => {
    setSelectedMatch(selectedTeam);
    setSelectedTab(1);
  }

  return (
    <>
      <Box className={styles['background-content']} />
      <Box className={styles['container']}>
        <Box className={styles['content']}>
          <Header title='Match and Team Selection' />
          <TeamProvider
            value={{
              selectedTeamId: selectedTeam.teamId,
              selectedTeam: selectedTeam.side,
              selectedMatch: selectedTeam.match,
              selectedRound: selectedTeam.round,
              setSelectedTeam: setSelectedTeam
            }}
          >
            <main>
              <Box className={styles['scroll-container']}>
                {isLoading ? <Box className={styles['window-height']}><CircularProgress /></Box> : data?.map((round) => <Round key={round.id} roundName={round.name} matches={round.matches} />)}
              </Box>
              <Box className={styles['button-row']}>
                <Button
                  disabled={false}
                  loading={false}
                  onClick={cancelSelection}
                  text="Cancel"
                  variant="outlined"
                  textColor={palette.white}
                  width="243px"
                  height="48px"
                  fontSize={20}
                />
                <Button
                  text="Confirm"
                  width="243px"
                  height="48px"
                  variant="contained"
                  fontWeight="600"
                  fontSize={20}
                  disabled={false}
                  loading={false}
                  textColor={palette.darkBlue}
                  hoverBackground={palette.white}
                  backgroundColor={palette.white}
                  style={{ marginLeft: '10px' }}
                  onClick={() => { setOpen(true) }}
                />
              </Box>
            </main>
          </TeamProvider>
        </Box>
        <Modal open={open} handleClose={() => setOpen(false)}>
          <Box>
            <MatchVerification selectedTeam={selectedTeam} handleConfirm={confirmTeam} handleClose={() => setOpen(false)} />
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["match"],
    queryFn: fetchMatchFixtures,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default SelectMatch;
