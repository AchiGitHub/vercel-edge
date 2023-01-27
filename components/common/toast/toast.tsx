import React, { useState, useEffect } from 'react'
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { palette } from 'utils/palette';

interface ToastProps {
    color: 'danger' | 'success';
    display: boolean;
    children: React.ReactNode;
}

function Toast({ color, display, children }: ToastProps) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        let timer = setInterval(() => {
            setShow(false);
        }, 4000);

        return () => {
            clearInterval(timer);
        }
    }, [display]);

    if (show) {
        return <Box position='absolute' top='40px' zIndex='999' width='100%'>
            <Box display='flex' justifyContent='space-between' alignItems='center' margin='0 20px' borderRadius='5px' height="46px" padding='0 10px' bgcolor={palette[color]}>
                <Box>
                    {children}
                </Box>
                <IconButton onClick={() => setShow(false)}>
                    <CloseIcon fontSize='small' sx={{ color: palette.text[color] }} />
                </IconButton>
            </Box>
        </Box>
    }

    return <></>;

}

export default Toast