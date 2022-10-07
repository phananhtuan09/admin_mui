import { CSSProperties } from 'react';
import { PaletteMode } from '@mui/material';
interface ColorProps {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
}
interface ChartColor {
  violet: string[];
  blue: string[];
  green: string[];
  yellow: string[];
  red: string[];
}
interface Background {
  paper: string;
  default: string;
  neutral: string;
}
interface Text {
  primary: string;
  secondary: string;
  disabled: string;
}
interface Shape {
  borderRadius: number;
}
interface CustomShadows {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}
interface BreakpointsValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
interface Breakpoints {
  between?: Function;
  down?: Function;
  keys?: string[];
  not?: Function;
  only?: Function;
  unit?: string;
  up?: Function;
  values: BreakpointsValues;
}
interface GreyProps {
  0: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  50008: string;
  50012: string;
  50016: string;
  50024: string;
  50032: string;
  50048: string;
  50056: string;
  50080: string;
}
export interface PaletteProps {
  common: object;
  primary: ColorProps;
  secondary: ColorProps;
  info: ColorProps;
  success: ColorProps;
  warning: ColorProps;
  error: ColorProps;
  grey: GreyProps;
  gradients: object;
  chart: ChartColor;
  divider: string;
  text: Text;
  background: Background;
  action: object;
  mode: PaletteMode;
}

export interface typographyProps {
  fontFamily: string;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: CSSProperties;
  h2: CSSProperties;
  h3: CSSProperties;
  h4: CSSProperties;
  h5: CSSProperties;
  h6: CSSProperties;
  subtitle1: CSSProperties;
  subtitle2: CSSProperties;
  body1: CSSProperties;
  body2: CSSProperties;
  caption: CSSProperties;
  overline: CSSProperties;
  button: CSSProperties;
}
export interface ThemeOptions {
  breakpoints: Breakpoints;
  shape: Shape;
  mixins?: unknown;
  palette: PaletteProps;
  shadows?: unknown;
  customShadows: CustomShadows;
  transitions?: unknown;
  components?: Record<string, any>;
  typography: Record<string, any>;
  zIndex?: Record<string, number>;
}
