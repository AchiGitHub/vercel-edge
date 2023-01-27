import React, { useState } from 'react'
import { Typography, Stack, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InterchangeButton from './interchange-button'
import styles from 'styles/interchange-screen.module.css';
import useDataStore from 'store';

function InterchangeCount() {

    const [touchPosition, setTouchPosition] = useState<number | null>(null)

    const interchangeCount = useDataStore((state) => state.interchangeCount);
    const setInterchangeCount = useDataStore((state) => state.setInterchangeCount);

    let clicks: number[] = [];
    let timeout: ReturnType<typeof setTimeout>;

    const increaseCount = () => {
        const count = interchangeCount + 1;
        setInterchangeCount(count);
    }

    const decreaseCount = () => {
        if (interchangeCount > 0) {
            const count = interchangeCount - 1;
            setInterchangeCount(count);
        }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = currentTouch - touchDown;

        if (diff > 1) {
            decreaseCount()
        }

        if (diff < -1) {
            increaseCount()
        }

        setTouchPosition(null)
    }

    // TODO: check if the double click is needed. else remove the code
    function clickHandler(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        // Disable Single tap and Double tap on the icon buttons on interchange
        if (target.localName === 'svg' || target.localName === 'path' || target.id === 'interchange-button') return;
        
        clicks.push(new Date().getTime());
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250) {
                decreaseCount();
            } else {
                increaseCount();
            }
        }, 250);
    }

    return (
        <Stack
            flex="column"
            justifyContent="space-between"
            alignItems="center"
            height='100%'
            onClick={clickHandler}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <Box className={styles['interchange-header']}>
                <Typography variant="h5" fontWeight='400' fontSize='24px' lineHeight='32.02px' textAlign='center'>
                    INTERCHANGE
                </Typography>
            </Box>
            <Box className={styles['button-row']}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" padding='20px'>
                    <div>
                        <InterchangeButton icon={RemoveCircleOutlineIcon} onClick={decreaseCount} />
                    </div>
                    <div className={styles['interchange-count']}>
                        <Typography fontSize="60px" fontWeight="700px" lineHeight="72px" textAlign="center">{interchangeCount}</Typography>
                        <Typography fontSize="20px" fontWeight="400" lineHeight="23.44px" textAlign="center">MOVES</Typography>
                    </div>
                    <div>
                        <InterchangeButton icon={AddCircleOutlineIcon} onClick={increaseCount} />
                    </div>
                </Stack>
            </Box>
            <Box height="100px"></Box>
        </Stack>
    )
}

export default InterchangeCount