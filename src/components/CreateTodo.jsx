import React from "react";
import moment from "moment";
import "moment/locale/tr";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../redux/actions/actionTypes";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
const useStyles = makeStyles((theme) => ({
  btn: {
    marginLeft: "-10px",
  },
  addIcon: {
    color: theme.palette.primary.main,
  },
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  addTodo: {
    animationName: "$blinker",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
}));

const CreateTodo = () => {
  const [nowDate, setNowDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const todos = useSelector((state) => state.todos[nowDate]);
  const classes = useStyles();
  const modalRef = React.createRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    description: "",
    expireDate: "",
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ description: "", expireDate: "" });
  };
  const handleSubmit = () => {
    console.log(formData.expireDate.split("T")[0]);
    if (formData.description !== "" && formData.expireDate !== "") {
      dispatch({
        type: ADD_TODO,
        payload: {
          date: formData.expireDate.split("T")[0],
          todo: {
            id: uniqid(),
            description: formData.description,
            expireDate: formData.expireDate,
            isCompleted: false,
          },
        },
      });
      handleModalClose();
    }
  };
  const handleChange = (e) => {
    setFormData((v) => ({ ...v, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <IconButton
        className={`${classes.btn} ${!todos && classes.addTodo}`}
        onClick={handleModalOpen}
      >
        <AddCircleSharpIcon className={classes.addIcon} />
      </IconButton>
      <Dialog
        ref={modalRef}
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Todo Oluştur</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="datetime-local"
                  label="Tarih Saat"
                  type="datetime-local"
                  defaultValue={moment().format().split("+")[0]}
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleChange}
                  name="expireDate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="description"
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  id="description"
                  label="İçerik"
                  autoFocus
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            İptal
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Oluştur
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTodo;
