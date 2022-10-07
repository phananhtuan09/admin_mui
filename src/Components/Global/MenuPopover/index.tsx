import PropTypes from 'prop-types';
// material
import { Popover } from '@mui/material';
import { alpha, styled, SxProps } from '@mui/material/styles';
import React from 'react';
// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

// ----------------------------------------------------------------------

interface OriginProps {
  vertical: 'bottom' | 'center' | 'top' | number;
  horizontal: 'center' | 'left' | 'right' | number;
}
interface MenuPopoverTypes {
  children?: React.ReactNode;
  sx?: SxProps;
  open?: boolean;
  anchorEl?: any;
  onClose?: any;
  anchorOrigin?: OriginProps;
  transformOrigin?: OriginProps;
  arrow?: string;
}
export default function MenuPopover({
  children,
  sx,
  ...other
}: MenuPopoverTypes) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      open={false}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}
