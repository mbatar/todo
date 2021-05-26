import React from "react";
import { useDispatch } from "react-redux";
import { LOGIN, REGISTER } from "../redux/actions/actionTypes";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Auth() {
  const classes = useStyles();
  const [isLoginForm, setIsLoginForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const dispatch = useDispatch();

  function changeAuthStatus() {
    setIsLoginForm((v) => !v);
  }
  function handleChange(e) {
    setFormData((v) => {
      return {
        ...v,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: LOGIN, payload: formData });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoginForm ? "Giriş Yap" : "Kayıt Ol"}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isLoginForm && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="İsim"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Soyisim"
                    name="lastName"
                    autoComplete="lname"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-Posta Adresi"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Parola"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            {!isLoginForm && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Parola (Tekrar)"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoginForm ? "Giriş Yap" : "Kayıt Ol"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={changeAuthStatus}>
                {isLoginForm
                  ? "Hesabım yok, Kayıt Ol"
                  : "Hesabım var, Giriş Yap"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
