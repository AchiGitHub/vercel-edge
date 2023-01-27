import React, { useContext } from 'react';
import { TeamContext } from 'types/match-types';

const SelectedMatchContext = React.createContext<TeamContext>({
    selectedMatch: null,
    selectedTeam: "",
    selectedTeamId: 0,
    selectedRound: '',
    // eslint-disable-next-line no-unused-vars
    setSelectedTeam: (...args: any[]) => { }
});

export const TeamProvider = SelectedMatchContext.Provider;

export const useSelectedTeam = () => {
    const team = useContext(SelectedMatchContext);
    return team;
}