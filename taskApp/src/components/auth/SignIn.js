import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, Redirect} from "react-router-dom";
import './auth.css'
import {Logo} from "../Logo";
import {useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {AxiosHelper} from "../../helpers/AxiosHelper";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const {register, handleSubmit, errors} = useForm();
  const [redirect, setRedirect] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading();
    AxiosHelper('login/', 'POST', data)
      .then(({status, data}) => {
        if(status === 200){
        const {token} = data;
          localStorage.setItem('token', token);
          Swal.close();
          setRedirect(true)
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario y/o contraseña incorrectos',
        })
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Logo/>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="username"
            label="Nombre de Usuario"
            name="username"
            error={!!errors.username}
            autoComplete="none"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            name="password"
            error={!!errors.password}
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item>
              <Link to={'sign-up'} className={'_link'}>
                {"No tienes cuenta? Registrate aquí"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {
        redirect && <Redirect to={'/task'} />
      }
    </Container>
  );
}