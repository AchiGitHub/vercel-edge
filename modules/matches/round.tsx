import { Box } from "@mui/material"
import AvailableMatch from "modules/matches/match"
import RoundHeader from "modules/matches/round-header"
import { Match } from "types/match-types";

interface RoundProps {
    roundName: string;
    matches: Match[];
}

function Round({ roundName, matches }: RoundProps) {

    // Set stylying based on the current match
    const getClassName = (idx: number) => {
        if (idx === matches.length - 1) {
            return 'bottom-radius';
        }
        return '';
    }

    return (
        <Box mt="10px">
            <RoundHeader round={roundName} />
            {matches?.map((match, idx) => <AvailableMatch key={match.id} match={match} className={getClassName(idx)} round={roundName} />)}            
        </Box>
    )
}

export default Round