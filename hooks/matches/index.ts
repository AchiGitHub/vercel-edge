import { Player } from 'types/benches-types';
import { setBearerToken } from '../common/setHeaders';

const getMatchPersonData = async (matchId: number, team: string) => {
  const personList = await fetch(
    `https://api.afl-sandbox.championdata.io/v1/matches/216085122/persons`,
    {
      method: 'GET',
      headers: setBearerToken({
        accept: 'application/json',
      }),
    }
  );
  const personListJson = await personList.json();
  const selectedTeam = personListJson.squads[team];
  const sortedByJumperNumber = selectedTeam?.players?.sort(function (
    firstPlayer: Player,
    secondPlayer: Player
  ) {
    return firstPlayer.jumperNumber - secondPlayer.jumperNumber;
  });
  selectedTeam['player'] = sortedByJumperNumber;
  return selectedTeam;
};

export { getMatchPersonData };
