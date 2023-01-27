import React, { useContext } from 'react';
import { MatchContext } from 'types/match-types';

const Match = React.createContext<MatchContext>({
    matchTime: 0
});

export const MatchProvider = Match.Provider;

export const useMatchTime = () => {
    const matchTimer = useContext(Match);
    return matchTimer;
}