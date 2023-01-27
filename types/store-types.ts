import { Match, SelectedTeamState } from 'types/match-types';

export interface Player {
  firstname: string;
  surname: string;
  positions: {
    selected: {
      id: number;
      code: string;
      name: string;
    };
    season: {
      id: number;
      code: string;
      name: string;
    };
  };
  jumperNumber: number;
  displayName: string;
  fullname: string;
  personId: number;
  disabled?: boolean;
}

export interface SpecialMovesPlayer {
  personId: number;
  quarter: number;
  quarterTime: number;
  timerId?: ReturnType<typeof setInterval>;
  time: number;
  player: Player;
}

type RuledOutPlayers = {
  [playerId: number]: SpecialMovesPlayer;
};

export interface Bench {
  TransactionId?: number;
  PlayerId?: number;
  Period?: number;
  PeriodSeconds?: number;
  UTCDate?: number;
  IsReturned?: boolean;
  MoveType?: string;
  SubstituteReason?: number;
  BreachReason?: string;
  IsStartingBench?: boolean;
  IsInjury?: boolean;
  IsRevoke?: boolean;
  IsBreach?: boolean;
  DoesCount?: boolean;
}

type SetBench = {
  currentQuarter: number;
  benchPlayers: Player[];
};

type SetSquad = {
  currentQuarter: number;
  players: Player[];
};

export type AddSpecialMovePlayer = {
  player?: Player | null;
  timerId?: ReturnType<typeof setInterval>;
  quarterTime: number;
};

export type SetSpecialMovePlayerTimer = {
  playerId?: number;
  time: number;
};

export interface Store {
  match: {
    id: number;
    name: string;
    match: Match | null;
  };
  selectedTab: number | string;
  interchangeCount: number;
  startingPlayerList: Player[];
  gameQuarter?: number;
  gameTimerId?: number;
  quarterTimerId?: number;
  currentQuarter: number;
  quarters: {
    [key: number]: {
      moves?: number;
      bloodRuleInterchange: RuledOutPlayers;
      concussionInterchange: RuledOutPlayers;
      medicalInjuryInterchange: SpecialMovesPlayer[];
      medicalSubInterchange: SpecialMovesPlayer[];
      exceptionalInjuryInterchange: SpecialMovesPlayer[];
      stretcherInjuryInterchange: SpecialMovesPlayer[];
      selectedBench?: Player[];
      startingSquad: Player[];
    };
  };
}

export interface Action {
  setStartingPlayerLis: (PlayerList: Player[]) => void;
  setSelectedTab: (selectedTab: number | string) => void;
  setBench: (DefaultQuarterOneBench: SetBench) => void;
  setSquad: (DefaultQuarterOneBench: SetSquad) => void;
  setSelectedMatch: (selectedMatch: SelectedTeamState) => void;
  setInterchangeCount: (count: number) => void;
  addConcussionPlayer: (data: AddSpecialMovePlayer) => void;
  addexceptionalInjuryPlayer: (data: AddSpecialMovePlayer) => void;
  addStretcherInjuryPlayer: (data: AddSpecialMovePlayer) => void;

  setConcussionPlayerTimer: (data: SetSpecialMovePlayerTimer) => void;
  setexceptionalInjuryPlayerTimer: (data: SetSpecialMovePlayerTimer) => void;
  setstretcherInjuryPlayerTimer: (data: SetSpecialMovePlayerTimer) => void;
}
