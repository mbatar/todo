import React from "react";
import "../styles/App.css";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./Auth";
import AppDrawer from "./AppDrawer";
import Todos from "./Todos";
import TodoHistory from "./TodoHistory";
import NotMatch from "./NotMatch";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
}));

function App() {
  const classes = useStyles();
  const { user } = useSelector((state) => state);
  return (
    <div id="app">
      <CssBaseline />
      {user ? (
        <>
          <Container>
            <AppDrawer />
            <div className={classes.root}>
              <Switch>
                <Route path="/" exact component={Todos} />
                <Route path="/history" component={TodoHistory} />
                <Route component={NotMatch} />
              </Switch>
            </div>
          </Container>
        </>
      ) : (
        <Switch>
          <Route exact path="/" render={(props) => <Auth {...props} />} />
          <Route component={NotMatch} />
        </Switch>
      )}
    </div>
  );
}

export default App;
