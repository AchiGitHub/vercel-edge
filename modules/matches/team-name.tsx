import { Box, Typography } from '@mui/material'
import { useSelectedTeam } from 'context/selected-match-context';

import styles from 'styles/home.module.css';
import { Match } from 'types/match-types';

interface TeamNameProps {
    id: number;
    name: string;
    side: string;
    match: Match;
    round: string;
}

function TeamName({ id, name, side, match, round }: TeamNameProps) {

    const { selectedMatch, selectedTeamId, setSelectedTeam } = useSelectedTeam();

    const getStyles = () => {
        if (selectedTeamId === id && match.id === selectedMatch?.id) {
            return `${styles['team-name']} ${styles['selected-team']}`
        }
        return styles['team-name'];
    }

    return (
        <Box
            className={getStyles()} onClick={() => setSelectedTeam({ side, teamId: id, match, round })}>
            <Typography variant='h6'>{name}</Typography>
        </Box>
    )
}

export default TeamName