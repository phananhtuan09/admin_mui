import PropTypes from 'prop-types'
// material
import { alpha, styled } from '@mui/material/styles'
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material'
// components
import Iconify from '@/Components/Global/Iconify'
//
import Searchbar from './SearchBar'
import AccountPopover from './AccountPopover'
import LanguagePopover from './LanguagePopover'
import NotificationsPopover from './NotificationsPopover'
import React from 'react'
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280
const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: 'inherit',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

// ----------------------------------------------------------------------

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func,
}

export default function Navbar({ onOpenSidebar }: any) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  )
}
