import React, {useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import {Add} from "../Logo";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import TaskCU from "./TaskCU";
import TaskList from "./TaskList";

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

const Tasks = () => {
  const classes = useStyles();
  const [title] = useState('Registra una tarea')
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    description : '', title: '', id: ''
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <TaskCU op={open} setOpen={setOpen} formData={formData} setEdit={setEdit}/>
        <CssBaseline/>
        <br/>
        <div style={{cursor: 'pointer'}} className={classes.paper} onClick={() => setOpen(true)}>
          <Add/>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>

        </div>
        <br/><br/>

      </Container>
      <Container component="main" maxWidth="md">
        <TaskList setFormData={setFormData} setOpen={setOpen} edit={edit} setEdit={setEdit} />
      </Container>
    </>
  )
}

export default Tasks
