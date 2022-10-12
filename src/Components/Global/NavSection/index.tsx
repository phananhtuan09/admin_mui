import { useState } from 'react';
import {
  matchPath,
  NavLink as RouterLink,
  useLocation,
  NavLinkProps,
} from 'react-router-dom';
// material
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from '@mui/material';
import { alpha, styled, useTheme, Theme } from '@mui/material/styles';
//
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const ListItemStyle = styled(({ children, ...props }: ListItemStyleProps) => {
  if (children) {
    return (
      <ListItemButton disableGutters {...props}>
        {children}
      </ListItemButton>
    );
  }
  return <ListItemButton disableGutters {...props} />;
})(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
//--------------------------------------------------------------------
interface NavConfigProps {
  title: string;
  path: string;
  icon: JSX.Element;
  info?: string;
  children?: any | any[];
}
interface NavSectionProps {
  navConfig: Array<NavConfigProps>;
}
interface ListItemStyleProps {
  key?: string;
  component?: React.ForwardRefExoticComponent<
    NavLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  to?: string;
  sx?: SxProps;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[];
}

// ----------------------------------------------------------------------

// interface NavItemInterface {
//   title?: string;
//   path: string;
//   icon?: JSX.Element;
//   info: string;
//   children?: React.ReactNode;
// }
interface NavItemProps {
  item: NavConfigProps;
  active: (path: string) => boolean;
}
function NavItem({ item, active }: NavItemProps) {
  const customTheme: Theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState<boolean>(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev: boolean) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      customTheme.palette.primary.main,
      customTheme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {/* {info && info} */}
          <Iconify
            icon={
              open
                ? 'eva:arrow-ios-downward-fill'
                : 'eva:arrow-ios-forward-fill'
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((itemList: NavConfigProps) => {
              const titleList = itemList.title;
              const pathList = itemList.path;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={titleList}
                  component={RouterLink}
                  to={pathList}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) =>
                          theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={titleList} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {/* {info && info} */}
    </ListItemStyle>
  );
}

export default function NavSection({ navConfig, ...other }: NavSectionProps) {
  const { pathname } = useLocation();

  const match = (path: string) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item: NavConfigProps) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
