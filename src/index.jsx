import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        "&:hover": {
          backgroundColor: teal[50],
        },
        color: teal[500],
      },
    },
    MuiButton: {
      root: {
        "&:hover": {
          backgroundColor: teal[50],
        },
      },
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: teal[50],
        },
      },
      
    },
    MuiSpeedDial:{
      fab:{
        width:36,
        height:36,
        backgroundColor:"transparent",
        color:teal[500],
        boxShadow:"none",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }
    }
  },
  palette: {
    primary: {
      main: teal[500],
      light: teal[50],
    },
    secondary: {
      // This is green.A700 as hex.
      main: red[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
