import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import CreateTodo from "./CreateTodo";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import moment from "moment";
import "moment/locale/tr";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  btn: {
    marginLeft: "-10px",
  },
  notTodo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Todos() {
  const [nowDate, setNowDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const todos = useSelector((state) => state.todos[nowDate]);
  const classes = useStyles();
  const [checkedList, setCheckedList] = React.useState([0]);
  const [sortedTodos, setSortedTodos] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checkedList.indexOf(value);
    const newChecked = [...checkedList];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedList(newChecked);
  };

  React.useEffect(() => {
    let dateInterval = setInterval(() => {
      setNowDate(moment(new Date()).format("YYYY-MM-DD"));
    }, 1000);
    const sorted = todos
      ? todos.sort(
          (a, b) =>
            new Date(a.expireDate).getTime() - new Date(b.expireDate).getTime()
        )
      : [];
    setSortedTodos(sorted);
    return () => clearInterval(dateInterval);
  }, [todos]);

  return (
    <>
      <Toolbar className={classes.toolbarSecondary}>
        <CreateTodo />
        {/* <Button>Seçilenleri Sil</Button> */}
      </Toolbar>
      {todos ? (
        <List className={classes.root}>
          {sortedTodos.map((todo) => (
            <Todo
              todo={todo}
              handleToggle={handleToggle}
              isChecked={checkedList.includes(todo.id)}
              key={todo.id}
            />
          ))}
        </List>
      ) : (
        <div className={classes.notTodo}>
          <Typography variant="body1" gutterBottom>
            Kayıtlı todo bulunmamakta
          </Typography>
        </div>
      )}
    </>
  );
}
