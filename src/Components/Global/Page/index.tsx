import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { forwardRef } from 'react'
// @mui
import { Box } from '@mui/material'
import React from 'react'
// ----------------------------------------------------------------------
interface PageProps {
  children?: React.ReactNode
  title?: string
  meta?: any
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
)

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
}

export default Page
