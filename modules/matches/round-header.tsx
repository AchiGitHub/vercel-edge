import { Box, Typography } from '@mui/material'

import styles from 'styles/home.module.css';

interface RoundProps {
    round: string
}

function RoundHeader({ round }: RoundProps) {
  return (
    <Box className={`${styles['table-header']} ${styles['background-opacity']}`}>
      <Box>
        <Typography variant='h5'>{round}</Typography>
      </Box>
    </Box>
  )
}

export default RoundHeader