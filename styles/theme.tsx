import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#40637A",
    },
    success: {
      main: "#287E29",
    },
    secondary: {
      main: "#F6BE00",
    },
    error: {
      main: "#8B0000",
    },
    info: {
      main: "#DDDDDD",
    },
    warning: {
      main: "#9acd32",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: "scroll",
        },
      },
    },
  },
});

export default theme;
