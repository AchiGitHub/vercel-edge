import React from 'react';
import { Button as MaterialButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps {
  text: string;
  width?: string;
  height?: string;
  fontSize?: number;
  loading: boolean;
  disabled: boolean;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverBackground?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: 'text' | 'outlined' | 'contained';
  fontWeight?: 'normal' | 'bold' | '500' | '600' | '700' | '800' | '900';
  onClick: () => void;
}

function Button({
  text,
  width,
  style,
  height,
  loading,
  endIcon,
  disabled,
  startIcon,
  fontSize = 16,
  hoverBackground,
  backgroundColor,
  borderColor = '#fff',
  variant = 'contained',
  textColor = 'primary',
  fontWeight = '500',
  onClick
}: ButtonProps) {

  // Create custom button with specific styles
  const CustomButton = styled(MaterialButton)({
    width,
    height,
    fontSize,
    borderColor,
    backgroundColor,
    color: textColor,
    fontWeight,
    textTransform: 'unset',
    '&:hover': {
      backgroundColor: hoverBackground,
      border: 'none'
    }
  })

  if (loading) {
    return <CircularProgress aria-label='spinner' />
  } else {
    return (
      <CustomButton
        style={style}
        variant={variant}
        endIcon={endIcon}
        disabled={disabled}
        startIcon={startIcon}
        onClick={onClick}>
        {text}
      </CustomButton>
    )
  }

}

export default Button