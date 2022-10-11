import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------
interface PageProps {
  children?: React.ReactNode;
  title?: string;
  meta?: string;
}
const Page = forwardRef(
  ({ children, title = '', meta, ...other }: PageProps, ref) => (
    <>
      <Helmet>
        <title>{`${title} | Minimal-UI`}</title>
        {meta}
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

export default Page;
