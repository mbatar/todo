import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import Todo from "./Todo";
import EditIcon from "@material-ui/icons/Edit";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  historyItem:{
    "&.completedTodo": {
      backgroundColor: teal[100],
    },
    "&.notCompletedTodo": {
      backgroundColor: red[100],
    },
    marginBottom:3
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function TodoHistory() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { todos } = useSelector((state) => state);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {Object.keys(todos).map((todoDate, index) => (
        <Accordion
          key={todoDate}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography className={classes.heading}>{todoDate}</Typography>
            {/* <Typography className={classes.secondaryHeading}>
              {todos[todoDate].length}
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.root}>
              {todos[todoDate].map((todo) => (
                <ListItem
                  key={todo.id}
                  role={undefined}
                  dense
                  button
                  onClick={() => console.log("sa")}
                  className={`${classes.historyItem} ${todo.isCompleted ? "completedTodo" : "notCompletedTodo"}`}
                >
                  <ListItemText
                    id={`checkbox-list-label-${todo.id}`}
                    primary={todo.description}
                  />

                  <ListItemSecondaryAction>
                    <ListItemIcon>
                      {todo.isCompleted ? <DoneIcon /> : <CloseIcon />}
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
