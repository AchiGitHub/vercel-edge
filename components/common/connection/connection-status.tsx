import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { IConnectionStatus } from 'types/connection-status-types'
import styles from 'styles/connection.module.css';

function ConnectionStatus({ status }: IConnectionStatus) {

    if (status) {
        return (
            <div className={`${styles['container']} ${styles['connected']}`}>
                <TaskAltIcon />
                <Typography ml="5px">Connected</Typography>
            </div>
        );
    }

    return (
        <div className={`${styles['container']} ${styles['disconnected']}`}>
            <ErrorOutlineIcon />
            <Typography ml="5px">Disconnected</Typography>
        </div>
    )
}

export default ConnectionStatus