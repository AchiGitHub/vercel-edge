import { Box } from '@mui/material';
import styles from 'styles/home.module.css';
import { Match as MatchType } from 'types/match-types';
import MatchTime from './match-time/match-time';
import TeamName from './team-name';
import VenueDate from './venue-date';

interface MatchProps {
    match: MatchType;
    round: string;
    className: string;
}

function Match({ match, className, round }: MatchProps) {
    return (
        <Box className={`${styles['table-row']} ${styles['background-opacity']} ${styles[className]}`} >
            <Box className={`${styles['team-cell']} ${styles['border-right']} ${styles['flex-content-center']}`}>
                <TeamName id={match.squads.home.id} name={match.squads.home.name} match={match} side="home" round={round} />
            </Box>
            <Box className={styles['desktop-view']}>
                <Box className={`${styles['team-cell']} ${styles['border-right']} ${styles['flex-content-center']}`}>
                    <VenueDate venue={match.venue.code} date={match.date.startDate} />
                </Box>
                <Box className={`${styles['team-cell']} ${styles['border-right']}`}>
                    <Box className={styles['margin-20']}>
                        <MatchTime timeZone={match.venue.timeZone} utcMatchStart={match.date.utcMatchStart} />
                    </Box>
                </Box>
            </Box>
            <Box className={styles['device-view']}>
                <Box className={`${styles['team-cell']} ${styles['border-right']}`}>
                    <Box mt='10px' ml='20px' mr='20px'>
                        <VenueDate venue={match.venue.code} date={match.date.startDate} />
                    </Box>
                    <Box ml='20px' mr='20px' mb='20px'>
                        <MatchTime timeZone={match.venue.timeZone} utcMatchStart={match.date.utcMatchStart} />
                    </Box>
                </Box>
            </Box>
            <Box className={`${styles['team-cell']} ${styles['flex-content-center']}`}>
                <TeamName id={match.squads.away.id} name={match.squads.away.name} match={match} side="away" round={round} />
            </Box>
        </Box>
    )
}

export default Match