import useDataStore from 'store';
import { Player } from 'types/store-types';

export const getConcussionPlayers = (): Player[] => {
  const { startingPlayerList } = useDataStore.getState();
  let newPlayerArray: Player[] = [];
  const players: Player[] = startingPlayerList ?? [];
  const clonedPlayersLists = players.slice() ?? [];

  if (clonedPlayersLists !== undefined && clonedPlayersLists.length !== 0) {
    clonedPlayersLists.forEach((player) => {
      let modifiedPlayer: any = {...player};
      modifiedPlayer = {
        ...modifiedPlayer,
        positions: {
          ...modifiedPlayer.positions,
          selected: {
            ...modifiedPlayer.positions.selected,
            code: 'player',
            disabled: false
          }
        }
      }
      newPlayerArray.push(modifiedPlayer);
    });
  }
  return newPlayerArray;
};
