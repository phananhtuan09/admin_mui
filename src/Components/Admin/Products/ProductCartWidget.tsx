// material

import { Badge } from '@mui/material';
// component
import Iconify from '@/Components/Global/Iconify';
import { Theme as customTheme } from '@/theme/theme.interface';
import { styled, useTheme, Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------
interface RootStyleProps {
  theme: customTheme;
}
const RootStyle = styled('div')(({ theme }: RootStyleProps) => {
  const defaultRootTheme = useTheme();
  return {
    zIndex: 999,
    right: 0,
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    alignItems: 'center',
    top: defaultRootTheme.spacing(16),
    height: defaultRootTheme.spacing(5),
    paddingLeft: defaultRootTheme.spacing(2),
    paddingRight: defaultRootTheme.spacing(2),
    paddingTop: defaultRootTheme.spacing(1.25),
    boxShadow: theme.customShadows.z20,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
    borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
    transition: theme.transitions.create('opacity'),
    '&:hover': { opacity: 0.72 },
  };
});

// ----------------------------------------------------------------------

export default function CartWidget() {
  const defaultTheme: any = useTheme();
  return (
    <RootStyle theme={defaultTheme}>
      <Badge showZero badgeContent={0} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}
