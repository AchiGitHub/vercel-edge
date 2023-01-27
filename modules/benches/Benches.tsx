import { useState, useEffect } from 'react';
import { dehydrate, useQuery, QueryClient } from '@tanstack/react-query';
import { getMatchPersonData } from '../../hooks';
import useDataStore from '../../store';
import PlayerGrid from 'components/playersGrid';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import styles from '../../styles/benches.module.css';
import Button from 'components/common/button/button';
import { palette } from 'utils/palette';
import Modal from 'components/common/modal/modal';
import ErrorIcon from '@mui/icons-material/Error';
import { getBenchPlayers } from 'utils/get-bench';
import { Context, Player, SavePayload } from 'types/benches-types';
const Benches = () => {
  const [apiData, setApiData] = useState<Array<SavePayload>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [benchPlayers, setBenchPlayers] = useState<Array<Player>>([]);
  const [playerLists, setPlayerLists] = useState<Array<Player>>([]);
  const selectedTeam = useDataStore((state) => state.match);
  const setSelectedTab = useDataStore((state) => state.setSelectedTab);

  const { data: personData = [], isLoading } = useQuery({
    queryKey: ['player'],
    queryFn: () => getMatchPersonData(selectedTeam.id, selectedTeam.name),
    refetchOnWindowFocus: false,
  });

  const setPlayerList = useDataStore((state) => state.setStartingPlayerLis);
  const currentQuarter = useDataStore((state) => state.currentQuarter);

  const setBench = useDataStore((state) => state.setBench);
  const setSquad = useDataStore((state) => state.setSquad);

  useEffect(() => {
    setPlayerList(personData?.players);
    const initialPayload: SavePayload[] = [];
    const players: Player[] = [];
    if (currentQuarter === 1) {
      personData?.players?.forEach(function (player: Player) {
        if (player.positions.selected.code === 'INT') {
          players.push(player);
          initialPayload.push({
            TransactionId: 0,
            PlayerId: player.personId,
            Period: 0,
            PeriodSeconds: 0,
            UTCDate: 0,
            IsReturned: true,
            MoveType: 'string',
            SubstituteReason: 0,
            BreachReason: 'string',
            IsStartingBench: true,
            IsInjury: true,
            IsRevoke: true,
            IsBreach: true,
            DoesCount: true,
          });
        }
      });

      setBenchPlayers(players);
      setApiData(initialPayload);
    }
  }, [personData?.players]);

  useEffect(() => {
    const formatBenchPlayers = getBenchPlayers(benchPlayers);
    setPlayerLists(formatBenchPlayers);
  }, [personData?.players, benchPlayers]);

  const changeDefaultBench = (user: any) => {
    let playerIndex = benchPlayers.findIndex(
      (player) => player.personId === user.personId
    );

    if (playerIndex > -1) {
      setBenchPlayers((player) =>
        player.filter((player) => player.personId !== user.personId)
      );
    } else {
      setBenchPlayers((data) => [...data, user]);
    }

    let index = apiData.findIndex(
      (player) => player.PlayerId === user.personId
    );

    if (index > -1) {
      setApiData(apiData.filter((player) => player.PlayerId !== user.personId));
      return;
    }
    const data: SavePayload = {
      TransactionId: 0,
      PlayerId: user.personId,
      Period: 0,
      PeriodSeconds: 0,
      UTCDate: 0,
      IsReturned: true,
      MoveType: 'string',
      SubstituteReason: 0,
      BreachReason: 'string',
      IsStartingBench: true,
      IsInjury: true,
      IsRevoke: true,
      IsBreach: true,
      DoesCount: true,
    };
    setApiData([...apiData, data]);
  };

  const onConfirm = () => {
    if (apiData.length > 4) {
      setOpen(true);
      return;
    }
    if (apiData.length < 4) {
      setOpen(true);
      return;
    }
    const benchLists = [...benchPlayers];
    const newPlayers = [...playerLists];
    const benchPersonIds = benchLists.map((value) => value.personId);
    const players = [];
    for (const player of newPlayers) {
      if (benchPersonIds.find((id) => id == player.personId) === undefined) {
        players.push(player);
      }
    }

    setBench({ currentQuarter, benchPlayers: benchLists });
    setSquad({ currentQuarter, players });
    setSelectedTab(0);
  };

  const cancel = () => {
    const initialPayload: SavePayload[] = [];
    const players: Player[] = [];
    if (currentQuarter === 1) {
      personData?.players?.forEach(function (player: Player) {
        if (player.positions.selected.code === 'INT') {
          players.push(player);
          initialPayload.push({
            TransactionId: 0,
            PlayerId: player.personId,
            Period: 0,
            PeriodSeconds: 0,
            UTCDate: 0,
            IsReturned: true,
            MoveType: 'string',
            SubstituteReason: 0,
            BreachReason: 'string',
            IsStartingBench: true,
            IsInjury: true,
            IsRevoke: true,
            IsBreach: true,
            DoesCount: true,
          });
        }
      });

      setBenchPlayers(players);
      setApiData(initialPayload);
    }
  };

  if (isLoading && playerLists.length === 0) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return (
    <Box className={styles['bench-grid']}>
      <Box className={styles['bench-grid-container']}>
        <Box className={styles['bench-grid-header']}>
          <Box className={styles['headline']}>
            <Box></Box>
            <Box
              className={styles['players-grid-header']}
              height="50px"
              sx={{
                border: 2,
                borderTopRadius: 2,
                borderColor: 'black',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            >
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  padding: '7px',
                  paddingLeft: '33px',
                }}
              >
                Bench
              </Typography>
            </Box>
          </Box>
        </Box>

        <PlayerGrid
          playerList={playerLists}
          playerClicked={changeDefaultBench}
          clickedPlayerId={-1}
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt="10px"
          mb="10px"
        >
          <Button
            disabled={false}
            loading={false}
            onClick={() => cancel()}
            text="Cancel"
            variant="outlined"
            textColor={palette.white}
            width="200px"
            height="50px"
          />
          <Button
            text="Confirm"
            width="200px"
            height="50px"
            variant="contained"
            fontWeight="600"
            hoverBackground={palette.white}
            disabled={false}
            loading={false}
            textColor={palette.darkBlue}
            backgroundColor={palette.white}
            style={{ marginLeft: '10px' }}
            onClick={() => onConfirm()}
          />
        </Stack>
        <Modal open={open} handleClose={() => setOpen(false)}>
          <Box>
            <Box className={styles['error-container']}>
              <ErrorIcon style={{ color: palette.error }} fontSize="large" />
              <Typography mt="10px" fontWeight="600">
                Bench players count must be 4 !
              </Typography>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context: Context) {
  const { matchId, team } = context.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [matchId, team],
    queryFn: () => getMatchPersonData(matchId, team),
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Benches;
