import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import styles from 'styles/common.module.css';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { CheckBoxProps } from 'types/checkbox-types';

const CheckBoxComponent = ({
  label,
  onChecked,
  checkBoxValue,
}: CheckBoxProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkBoxValue}
            onChange={() => onChecked()}
            className={styles['checkbox-styles']}
            checkedIcon={<CheckBoxOutlinedIcon />}
          />
        }
        sx={{
          '& .MuiTypography-root': { fontSize: 12, marginTop: 0.5 },
          alignItems: 'flex-start',
          '& .MuiSvgIcon-root': {
            marginRight: '24px',
            width: '25px',
            height: '25px',
          },
        }}
        label={label}
        labelPlacement="start"
      />
    </FormGroup>
  );
};

export default CheckBoxComponent;
