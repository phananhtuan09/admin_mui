// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import Iconify from '@/Components/Global/Iconify';
import { Theme } from '@/theme/theme.interface';
import { useTheme } from '@mui/material/styles';
// ----------------------------------------------------------------------
interface RootStyleProps {
  theme: Theme;
}
const RootStyle = styled('div')(({ theme }: RootStyleProps) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: useTheme().spacing(16),
  height: useTheme().spacing(5),
  paddingLeft: useTheme().spacing(2),
  paddingRight: useTheme().spacing(2),
  paddingTop: useTheme().spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  return (
    <RootStyle theme={useTheme()}>
      <Badge showZero badgeContent={0} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}
