// @mui
import { Box } from '@mui/material';
import { alpha, styled, SxProps, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
import { ColorSelection, Theme } from '@/theme/theme.interface';

type Variant = 'filled' | 'outlined' | 'ghost';
interface OwnerStateProps {
  color: ColorSelection;
  variant: Variant;
}
interface RootStyleProps {
  theme: Theme;
  ownerState: OwnerStateProps;
}
const RootStyle = styled('span')(({ theme, ownerState }: RootStyleProps) => {
  const isLight = theme.palette.mode === 'light';
  const { color, variant } = ownerState;

  const styleFilled = (colorFilled: ColorSelection) => ({
    color: theme.palette[colorFilled].contrastText,
    backgroundColor: theme.palette[colorFilled].main,
  });

  const styleOutlined = (colorOutlined: ColorSelection) => ({
    color: theme.palette[colorOutlined].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[colorOutlined].main}`,
  });

  const styleGhost = (colorGhost: ColorSelection) => ({
    color: theme.palette[colorGhost][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[colorGhost].main, 0.16),
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: useTheme().spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'primary'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) }),
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === 'ghost' && {
            color: isLight
              ? theme.palette.text.secondary
              : theme.palette.common.white,
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

// ----------------------------------------------------------------------
interface LabelProps {
  children?: React.ReactNode;
  color: ColorSelection;
  variant: Variant;
  startIcon?: string;
  endIcon?: string;
  sx?: SxProps;
  theme?: Theme;
}
export default function Label({
  children,
  color = 'primary',
  variant = 'ghost',
  startIcon,
  endIcon,
  sx,
}: LabelProps) {
  const style = {
    width: 16,
    height: 16,
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  };

  return (
    <RootStyle
      ownerState={{ color, variant }}
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
      theme={useTheme()}
    >
      {startIcon && <Box sx={{ mr: 0.75, ...style }}>{startIcon}</Box>}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...style }}>{endIcon}</Box>}
    </RootStyle>
  );
}
