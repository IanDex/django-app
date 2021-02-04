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
import Swal from "sweetalert2";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const {register, handleSubmit, errors} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading();
    AxiosHelper('user/', 'POST', data)
      .then(({status, data}) => {
        if(status === 201){
          const {token} = data;
          localStorage.setItem('token', token);
          setRedirect(true);
          Swal.close();
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal intentelo nuevamente ',
        })
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Logo/>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={register({ required: true })}
                error={!!errors.first_name}
                id="first_name"
                label="Nombre"
                name="first_name"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                inputRef={register({ required: true })}
                error={!!errors.last_name}
                fullWidth
                id="last_name"
                label="Apellido"
                name="last_name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>

              <TextField
                autoComplete="fname"
                inputRef={register({ required: true })}
                error={!!errors.username}
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nombre de Usuario"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={register({ required: true })}
                error={!!errors.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={'/'} className={'_link'}>
                Ya tienes cuenta? Ingresa aquí
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