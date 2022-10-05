import PropTypes from 'prop-types'
// icons
import { Icon } from '@iconify/react'
// @mui
import { Box } from '@mui/material'
import { SxProps } from '@mui/material/styles'
import React from 'react'
// ----------------------------------------------------------------------

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
}
interface IconifyProps {
  icon: string
  sx?: SxProps
  width?: number
  height?: number
}
export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />
}
