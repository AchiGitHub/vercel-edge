import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Button from 'components/common/button/button';
import { palette } from 'utils/palette';
import styles from 'styles/breach-rule-player-grid.module.css';
import FirstStep from './first-step';

const BreachRulePlayerGrid = () => {
  const submit = () => {};
  const cancel = () => {};

  return (
    <div className={styles['grid']}>
      <Box
        sx={{ direction: 'column', justifyContent: 'space-between' }}
        className={styles['grid-container']}
      >
        <Box className={`${styles['grid-header']}`}>
          <div className={styles['headline']}>
            <Typography fontWeight="600" fontSize="24px" lineHeight="32.02px">
              Breach
            </Typography>
          </div>
        </Box>
        <FirstStep />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt="10px"
          mb="10px"
        >
          <Button
            disabled={false}
            loading={false}
            onClick={() => cancel()}
            text="Cancel"
            variant="outlined"
            textColor={palette.white}
            width="200px"
            height="50px"
          />
          <Button
            text="Confirm"
            width="200px"
            height="50px"
            variant="contained"
            fontWeight="600"
            hoverBackground={palette.white}
            disabled={false}
            loading={false}
            textColor={palette.darkBlue}
            backgroundColor={palette.white}
            style={{ marginLeft: '10px' }}
            onClick={() => submit()}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default BreachRulePlayerGrid;
