import { Player } from './store-types';

export type PlayerGridProp = {
  playerList: Player[];
  playerClicked: Function;
  clickedPlayerId?: number;
};
