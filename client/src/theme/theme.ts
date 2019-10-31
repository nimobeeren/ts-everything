import { Interpolation } from '@emotion/core';

/**
 * Defines commonly used styling values.
 */
export const theme = {
  colors: {
    primary: 'dodgerblue',
    positive: 'white',
    negative: 'black'
  },
  fonts: {
    sans: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    mono: 'Courier New, monospace'
  },
  borderRadii: {
    none: 0,
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '99999px'
  }
};

/**
 * Global CSS rules.
 */
export const global: Interpolation = {
  body: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.negative,
    fontFamily: theme.fonts.sans
  }
};
