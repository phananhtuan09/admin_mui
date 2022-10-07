import React, { ReactNode } from 'react';
import { Props } from '@/interfaces/childProps.interface';
import { useState } from 'react';

// material
import { styled } from '@mui/material/styles';
//
import Navbar from '@/Components/Admin/Navbar';
import SideBar from '@/Components/Admin/SideBar';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------
const DefaultLayout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <Navbar onOpenSidebar={() => setOpen(true)} />
      <SideBar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
};
export default DefaultLayout;
