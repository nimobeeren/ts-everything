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
    small: 4,
    medium: 8,
    large: 16,
    round: 99999
  }
};

export const global = {
  body: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.negative,
    fontFamily: theme.fonts.sans
  }
};
