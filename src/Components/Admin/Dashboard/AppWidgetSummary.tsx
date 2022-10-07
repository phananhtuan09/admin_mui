// @mui
import { Card, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '@/Components/Global/Iconify';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

type Color = 'info' | 'primary' | 'warning' | 'error' | 'success' | 'secondary';

interface AppWidgetSummaryProps {
  title: string;
  total: number;
  icon: string;
  color?: Color;
  darker?: string;
  sx?: SxProps;
}

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}: AppWidgetSummaryProps) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme: any) => theme.palette[color].darker,
        bgcolor: (theme: any) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
