export const theme = {
  colors: {
    primary: 'dodgerblue',
    black: 'black'
  },
  fonts: {
    sans: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    mono: 'Courier New, monospace'
  },
  borderRadius: {
    none: 0,
    small: 4,
    medium: 8,
    large: 16,
    round: 99999
  }
};

export const global = {
  body: {
    backgroundColor: theme.colors.black,
    fontFamily: theme.fonts.sans
  }
};
