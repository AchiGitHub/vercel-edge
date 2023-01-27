export type Round = {
    code: string;
    id: number;
    matches: Match[];
    name: string;
    number: number;
    phaseNumber: number;
}

export type Match = {
    id: number;
    roundOrder: number;
    squads: {
        away: {
            code: string;
            id: number;
            name: string;
        };
        home: {
            code: string;
            id: number;
            name: string;
        };
    };
    date: {
        startDate: string;
        startTime: string;
        utcMatchStart: string;
    };
    status: {
        id: number;
        name: string;
        code: string;
        typeId: number;
        typeName: string;
    };
    type: {
        id: number;
        name: string;
        code: string;
    };
    venue: {
        id: number;
        code: string;
        name: string;
        timeZone: string;
    };
};

export type AllMatchData = {
    competitionCode: string;
    competitionId: number;
    competitionName: string;
    competitionType: string;
    endDate: string;
    endYear: number;
    firstMatchStart: string;
    phases: {
        rounds: {
            code: string;
            id: number;
            matches: Match[];
            name: string;
            number: number;
            phaseNumber: number;
        }[];
        id: number;
        name: string;
        code: string;
    }[];
    seasonId: number;
    startDate: string;
    startYear: number;
}

export type TeamContext = {
    selectedMatch: Match | null;
    selectedTeam: string;
    selectedTeamId: number;
    selectedRound: string | null;
    setSelectedTeam: (...args: any[]) => any
}

export type SelectedTeamState =  {
    match: Match | null;
    teamId: number;
    side: 'home' | 'away';
    round: string | null;
}

export type MatchContext = {
    matchTime: number;
}