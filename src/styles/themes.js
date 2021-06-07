import { createMuiTheme } from "@material-ui/core/styles"

export const lawyersTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3377ff",
      dark: "#2b354f",
    },
    secondary: {
      light: "#ffffff",
      main: "#9ca9c4",
    },
    text: {
      primary: "#47536b",
      secondary: "#9ca9c4",
    },
  },

  typography: {
    htmlFontSize: 10,
    fontSize: 16,
    fontFamily: "DM Sans, Roboto",
    h1: {
      fontSize: "4.2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "3.4rem",
    },
    h3: {
      fontSize: "2.8rem",
    },
    h4: {
      fontSize: "2.2rem",
      margin: "10px 0",
    },
    h5: {
      fontSize: "1.8rem",
    },
    h6: {
      fontSize: "1.6rem",
    },
    body1: {
      fontSize: "1.8rem",
    },
    body2: {
      fontSize: "1.6rem",
    },
    caption: {
      fontSize: "1.4rem",
    },
  },
})
