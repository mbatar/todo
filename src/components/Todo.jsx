import React from "react";
import moment from "moment";
import "moment/locale/tr";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch } from "react-redux";
import { COMPLETE_TODO, DELETE_TODO } from "../redux/actions/actionTypes";
import CheckIcon from "@material-ui/icons/Check";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles((theme) => ({
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  todoWarning: {
    animationName: "$blinker",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    marginBottom: 2,
    "&.completedTodo": {
      backgroundColor: teal[100],
    },
    "&.notCompletedTodo": {
      backgroundColor: red[100],
    },
  },
  description: {
    minWidth: "70%",
    [theme.breakpoints.down("sm")]: {
      minWidth: "50%",
    },
  },
  date: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  speedDial: {
    position: "absolute",
    bottom: theme.spacing(-2),
    right: theme.spacing(-0.5),
  },
}));

const Todo = ({ todo, isChecked, handleToggle }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const [nowDate, setNowDate] = React.useState(moment(new Date()));
  const [toDate, setToDate] = React.useState(moment(todo.expireDate));
  const [differenceHour, setDifferenceHour] = React.useState("");
  const [differenceMinute, setDifferenceMinute] = React.useState("");
  React.useEffect(() => {
    let difference = setInterval(() => {
      setNowDate(new Date());
      setToDate(moment(todo.expireDate));
    }, 1000);
    return () => clearInterval(difference);
  }, [todo.expireDate]);

  React.useEffect(() => {
    setDifferenceMinute(toDate.diff(nowDate, "minutes"));
    setDifferenceHour(toDate.diff(nowDate, "hours"));
  }, [nowDate, toDate]);

  const handleOpen = (opr) => {
    opr === "speedDial" ? setOpenSpeedDial(true) : setOpenDialog(true);
  };

  const handleClose = (opr) => {
    opr === "speedDial" ? setOpenSpeedDial(false) : setOpenDialog(false);
  };

  const deleteTodo = () => {
    dispatch({ type: DELETE_TODO, payload: todo.id });
    handleClose("speedDial");
  };
  const completeTodo = () => {
    dispatch({
      type: COMPLETE_TODO,
      payload: {
        date: todo.expireDate.split("T")[0],
        id: todo.id,
      },
    });
  };
  return (
    <>
      <Backdrop open={openDialog || openSpeedDial} />
      <Dialog
        open={openDialog}
        onClose={() => handleClose("dialog")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("dialog")} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => handleClose("dialog")}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem
        key={todo.id}
        role={undefined}
        dense
        button
        onClick={handleToggle(todo.id)}
        className={`${classes.root} ${todo.isCompleted && "completedTodo"} ${
          differenceMinute < -10 && !todo.isCompleted && "notCompletedTodo"
        }`}
        disabled={differenceMinute < -10 || todo.isCompleted}
      >
        <ListItemIcon>
          <Checkbox
            checked={isChecked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": todo.id }}
          />
        </ListItemIcon>
        <ListItemText
          className={classes.description}
          id={todo.id}
          primary={todo.description}
        />
        <ListItemText
          className={classes.date}
          id={todo.expireDate}
          primary={moment(todo.expireDate).format("LLL")}
        />
        <ListItemText
          primary={
            differenceMinute < -10 && !todo.isCompleted
              ? "Kaçırdın"
              : todo.isCompleted
              ? "Tamamlandı"
              : moment(todo.expireDate).from()
          }
        />
        <ListItemSecondaryAction>
          {differenceMinute < 0 && differenceMinute > -10 ? (
            <Tooltip title="5 Dakikaya kadar onayla">
              <IconButton
                onClick={() => handleOpen("dialog")}
                className={classes.todoWarning}
              >
                <ReportProblemOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              className={classes.speedDial}
              icon={
                <SpeedDialIcon
                  icon={<MoreVertIcon />}
                  openIcon={<EditIcon />}
                />
              }
              openIcon={<DeleteIcon />}
              onClose={() => handleClose("speedDial")}
              onOpen={() => handleOpen("speedDial")}
              open={openSpeedDial}
            >
              <SpeedDialAction
                icon={<DeleteIcon />}
                tooltipTitle={"Sil"}
                tooltipOpen
                onClick={deleteTodo}
              />
              {differenceMinute > -10 && (
                <SpeedDialAction
                  icon={<CheckIcon />}
                  tooltipTitle={"Tamamla"}
                  tooltipOpen
                  onClick={completeTodo}
                />
              )}
            </SpeedDial>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default Todo;
