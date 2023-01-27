import { Typography, Box } from "@mui/material";
import Button from "components/common/button/button";
import ErrorIcon from '@mui/icons-material/Error';
import { useRouter } from "next/router";
import { palette } from "utils/palette";
import { SelectedTeamState } from "types/match-types";

import styles from 'styles/match-confirmation.module.css';

interface MatchVerificationProps {
    selectedTeam: SelectedTeamState;
    handleClose: () => void;
    handleConfirm: () => void;
}

function MatchVerification({ selectedTeam, handleClose, handleConfirm }: MatchVerificationProps) {

    const router = useRouter();

    const onOk = () => {
        handleConfirm();
        router.push('/');
    }

    if (selectedTeam.match) {
        return (
            <Box>
                <Box>
                    <Typography fontWeight="600" fontSize="16px">
                        {`${selectedTeam?.round} - ${selectedTeam?.match?.squads?.home?.name} vs. ${selectedTeam?.match?.squads?.away?.name}`}
                    </Typography>
                    <Typography fontWeight="400" fontSize="14px">
                        {`${selectedTeam?.match?.squads[selectedTeam.side].name} selected. Please click OK to continue.`}
                    </Typography>
                </Box>
                <Box className={styles['button-row']}>
                    <Button
                        text="Cancel"
                        width="108px"
                        height="34px"
                        fontSize={14}
                        variant="outlined"
                        fontWeight="600"
                        disabled={false}
                        loading={false}
                        textColor={palette.white}
                        hoverBackground={palette.ash}
                        backgroundColor={palette.ash}
                        onClick={handleClose}
                    />
                    <Button
                        text="Ok"
                        width="108px"
                        height="34px"
                        variant="outlined"
                        fontWeight="600"
                        fontSize={14}
                        disabled={false}
                        loading={false}
                        textColor={palette.white}
                        style={{ marginLeft: 10 }}
                        hoverBackground={palette.darkBlue}
                        backgroundColor={palette.darkBlue}
                        onClick={onOk}
                    />
                </Box>
            </Box>
        );
    }

    return (
        <Box className={styles['error-container']}>
            <ErrorIcon style={{ color: palette.error }} fontSize="large" />
            <Typography mt="10px" fontWeight='600'>Please select a team to proceed!</Typography>
        </Box>
    )
}

export default MatchVerification;