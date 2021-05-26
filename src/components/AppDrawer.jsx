import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import HistoryIcon from "@material-ui/icons/History";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import ListItemLink from "./ListItemLink";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent:"space-between"
  },
  
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  btn: {
    marginLeft: "-10px",
    color:theme.palette.primary.main
  },
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <div>
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.btn} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            #Todolar
          </Typography>
         
        </Toolbar>

        <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
          <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItemLink
                icon={<FormatListBulletedIcon />}
                primary="Todolar"
                to="/"
                key="1-todo_list"
              />
              <ListItemLink
                icon={<HistoryIcon />}
                primary="Todo Geçmişi"
                to="/history"
                key="2-todo_history"
              />
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
