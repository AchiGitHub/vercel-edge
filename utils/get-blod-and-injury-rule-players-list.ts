import useDataStore from 'store';
import { Player, SpecialMovesPlayer } from 'types/store-types';

export const generatePlayerList = (): Player[] => {
  const { currentQuarter, quarters, startingPlayerList } =
    useDataStore.getState();
  const medicalSubArr: SpecialMovesPlayer[] =
    quarters[currentQuarter]?.medicalSubInterchange;
  const medicalInjArr: SpecialMovesPlayer[] =
    quarters[currentQuarter]?.medicalInjuryInterchange;

  const clonedPlayersArr: Player[] = startingPlayerList.slice();

  interface ArrtoObjtype {
    [key: number]: SpecialMovesPlayer;
  }

  const objectFromArr = (playerArr: SpecialMovesPlayer[]) => {
    let newArrtoObj: ArrtoObjtype = {};

    if (playerArr !== undefined && playerArr.length) {
      for (const player of playerArr) {
        newArrtoObj[player.personId] = player;
      }
    }
    return newArrtoObj;
  };

  const medicalSubPlyrObj = objectFromArr(medicalSubArr);
  const medicalInjuryPlyrObj = objectFromArr(medicalInjArr);

  let newPlayerArr: Player[] = [];

  clonedPlayersArr.map((player: Player) => {
    let modifiedPlayer: any = { ...player };
    if (medicalInjuryPlyrObj[player.personId]) {
      modifiedPlayer = {
        ...modifiedPlayer,
        positions: {
          ...modifiedPlayer.positions,
          selected: {
            ...modifiedPlayer.positions.selected,
            code: 'rule_subbed',
            disabled: true,
          },
        },
      };
    } else if (medicalSubPlyrObj[player.personId]) {
      modifiedPlayer = {
        ...modifiedPlayer,
        positions: {
          ...modifiedPlayer.positions,
          selected: {
            ...modifiedPlayer.positions.selected,
            code: 'rule_med',
            disabled: true,
          },
        },
      };
    } else {
      modifiedPlayer = {
        ...modifiedPlayer,
        positions: {
          ...modifiedPlayer.positions,
          selected: {
            ...modifiedPlayer.positions.selected,
            code: 'player',
            disabled: false,
          },
        },
      };
    }
    newPlayerArr.push(modifiedPlayer);
  });
  return newPlayerArr;
};
