// icons
import { Icon } from '@iconify/react';
// @mui

import { Box, SxProps } from '@mui/material';
// ----------------------------------------------------------------------

interface IconifyProps {
  icon: string;
  sx?: SxProps;
  width?: number;
  height?: number;
  color?: string;
}
export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
