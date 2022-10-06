import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
//
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';
// ----------------------------------------------------------------------
import { Props } from '@/interfaces/childProps.interface';
import { PaletteProps } from './theme.interface';

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
interface CustomTheme {
  palette: PaletteProps;
  shape: Object;
  //typography:
  //shadows: string[];
  customShadows: Object;
}

export default function ThemeProvider({ children }: Props) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions as CustomTheme);
  theme.components = componentsOverride(theme);
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
