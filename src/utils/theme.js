import { createMuiTheme } from "@material-ui/core/styles";
// import { green, red, blue, purple } from "@material-ui/core/colors/";

import Akrobat from "../fonts/Akrobat-Regular.woff2";

const akrobat = {
  fontFamily: "Akrobat",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Akrobat'),
    local('Akrobat-Regular'),
    url(${Akrobat}) format('woff2')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Akrobat", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [akrobat],
      },
    },
    MuiTableCell: {
      head: {
        fontWeight: 600,
        fontSize: 16,
      },
    },
  },
  palette: {
    primary: {
      light: "#62bbe1",
      main: "#18a5e1",
      dark: "#0294d2",
      contrastText: "#fff",
    },
    // secondary: purple,
  },
  status: {
    danger: "orange",
  },
});

export default theme;
