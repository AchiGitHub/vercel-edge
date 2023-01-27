import useDataStore from 'store';
import { Player } from 'types/benches-types';

export const getBenchPlayers = (benchPlayers: Player[]) => {
  const { startingPlayerList } = useDataStore.getState();
  let newPlayerArray: Player[] = [];
  const clonedPlayersLists = startingPlayerList ?? [];

  const objectWithKeyPair = (players: Player[]) => {
    let object: { [key: number]: Player } = {};
    for (const benchPlayers of players) {
      object[benchPlayers.personId] = benchPlayers;
    }
    return object;
  };

  const benchPlayerObject = objectWithKeyPair(benchPlayers);

  if (clonedPlayersLists !== undefined && clonedPlayersLists.length !== 0) { 
    clonedPlayersLists.forEach((player) => {
      let modifiedPlayer: any= {...player};
      if (player.positions.selected.code === 'MED') {
        modifiedPlayer = {
          ...modifiedPlayer,
          positions: {
            ...modifiedPlayer.positions,
            selected: {
              ...modifiedPlayer.positions.selected,
              code: 'rule_med',
              disabled: true
            }
          }
        }
      } else if (benchPlayerObject[player.personId]) {
        modifiedPlayer = {
          ...modifiedPlayer,
          positions: {
            ...modifiedPlayer.positions,
            selected: {
              ...modifiedPlayer.positions.selected,
              code: 'INT',
              disabled: true
            }
          }
        }
      } else {
        modifiedPlayer = {
          ...modifiedPlayer,
          positions: {
            ...modifiedPlayer.positions,
            selected: {
              ...modifiedPlayer.positions.selected,
              code: 'PLAYER',
              disabled: true
            }
          }
        }
      }
      newPlayerArray.push(modifiedPlayer);
    });
  }
  return newPlayerArray;
};
