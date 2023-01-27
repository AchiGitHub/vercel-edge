export interface PlayerListsProps {
  players?: PlayerPayload[];
  defaultBenchPlayers?: BenchPlayer[];
  onClickedPlayer?: Function;
  onConfirm?: Function;
}

export interface PlayerPayload {
  dateOfBirth?: string;
  displayName?: string;
  firstname?: string;
  fullname?: string;
  height?: number;
  jumperNumber?: number;
  matchAge?: number;
  personId?: number;
  positions?: object;
  surname?: string;
  weight?: number;
}

export interface BenchPlayer {
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
