export type SavePayload = {
  TransactionId: 0;
  PlayerId: number;
  Period: number;
  PeriodSeconds: number;
  UTCDate: number;
  IsReturned: boolean;
  MoveType: string;
  SubstituteReason: 0;
  BreachReason: 'string';
  IsStartingBench: boolean;
  IsInjury: boolean;
  IsRevoke: boolean;
  IsBreach: boolean;
  DoesCount: boolean;
};

export type Player = {
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
};

export type Context = {
  params: {
    matchId: number;
    team: string;
  };
};
