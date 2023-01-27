import { Radio, styled } from '@mui/material';

export const StyledRadio = styled(Radio)({
  '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)': {
    color: 'white',
  },
  '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
    color: 'white',
  },
});
