import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import '../auth/auth.css'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {AxiosHelper} from "../../helpers/AxiosHelper";
import Typography from "@material-ui/core/Typography";

export default function TaskCU({op, setOpen, formData, setEdit}) {
  const {register, handleSubmit, errors} = useForm();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const { title, description, id} = formData;

  const origin = (data) => {
    if(id !== ''){
      onUpdate(data)
    }else{
      onSubmit(data)
    }
  }

  const onUpdate = (data) => {
    let UPDATE_URL = 'todo/' + id + '/';
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading();
    AxiosHelper(UPDATE_URL, 'PUT', (data))
      .then(({status, data}) => {
        console.log(status,data)
        if(status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Tarea actualizada correctamete',
          })
          setOpen(false);
          setEdit(true);
        }

      })
      .catch((e) => {
        Swal.close()
        // localStorage.clear();
        // window.reload();
      })
  }

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading();
    AxiosHelper('todo/', 'POST', data)
      .then(({status, data}) => {
        console.log(data)
        if (status === 201) {
          setOpen(false);
          Swal.close();
        }else if(status === 401){
          localStorage.clear();
          // eslint-disable-next-line no-restricted-globals
          location.reload()
        }
      })
      .catch((e) => {
        localStorage.clear();
        window.reload();
      })
  }


  const form = () => (
    <div
      role="presentation"
    >

      <form className={'formTask'} noValidate onSubmit={handleSubmit(origin)}>
        <Typography component="h1" variant="h5">
          Agregar una Tarea
        </Typography>
        <br/><br/>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              inputRef={register({required: true})}
              error={!!errors.title}
              id="title"
              label="Título"
              name="title"
              autoComplete="off"
              defaultValue={title}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              required
              inputRef={register({required: true})}
              error={!!errors.description}
              fullWidth
              id="description"
              label="Descripción"
              multiline
              rows={4}
              name="description"
              autoComplete="lname"
              defaultValue={description}
            />
          </Grid>

        </Grid>
        <br/><br/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Crear Tarea
        </Button>
      </form>
    </div>
  );

  return (
    <Drawer anchor={'top'} open={op} onClose={toggleDrawer(false)}>
      <IconButton className={'iconB'} aria-label="close" onClick={() => setOpen(false)}>
        <CloseIcon/>
      </IconButton>
      {form()}
    </Drawer>
  );
}
