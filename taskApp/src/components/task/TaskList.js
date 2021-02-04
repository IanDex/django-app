import React, {useEffect, useState} from 'react'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Button, Checkbox} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {AxiosHelper} from "../../helpers/AxiosHelper";
import EditIcon from '@material-ui/icons/Edit';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

const TaskList = ({setOpen, setFormData, edit, setEdit}) => {

  const [tasks, setTasks] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [redir, setRedir] = useState(false);


  useEffect(() => {
    loadPosts('todo/');
  }, [])

  const loadPosts = (url) => {
    AxiosHelper(url, 'GET')
      .then(({status, data}) => {
        if (status === 200) {
          const {links, results} = data;
          setTasks(results);
          setPrevious(links.previous);
          setNext(links.next);

        }

      })
      .catch((e) => {
        localStorage.clear();
        window.reload();
      })

  }

  if (edit) {
    loadPosts('todo/');
    setEdit(false)
  }

  const handleDelete = (id) => {
    let DELETE_URL = 'todo/' + id + '/';
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta accion no se puede devolver!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosHelper(DELETE_URL, 'DELETE')
          .then(({status, data}) => {
            console.log(status, data)
            Swal.fire(
              'Eliminado!',
              'La tarea se elimino correctamente',
              'success'
            )
            loadPosts('todo/');
          })
          .catch((e) => {
            localStorage.clear();
            window.reload();
          })

      }
    })

  }

  const handleUpdate = (id, data) => {
    let UPDATE_URL = 'todo/' + id + '/';
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading();
    AxiosHelper(UPDATE_URL, 'PUT', (data))
      .then(({status, data}) => {
        console.log(status, data)
        if (status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Tarea actualizada correctamete',
          })
          loadPosts('todo/');
        }

      })
      .catch((e) => {
        Swal.close()
        // localStorage.clear();
        // window.reload();
      })
  }

  const prevPage = () => {
    loadPosts(previous);
  }

  const nextPage = () => {
    loadPosts(next);
  }

  return (
    <div className="posts-list">


      <div className="content">
        <Table className="" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tarea</TableCell>
              <TableCell style={{textAlign:'center'}}>Competado</TableCell>
              <TableCell style={{textAlign:'center'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, key) => {
              return <React.Fragment key={task.id}>
                <TableRow>

                  <TableCell>{task.title}<br/>{task.description}</TableCell>
                  <TableCell style={{textAlign:'center'}}>
                    <Checkbox
                      checked={task.completed}
                      onChange={(e) => {
                        console.log(e.target.checked)
                        handleUpdate(task.id, {
                          completed: e.target.checked,
                          title: task.title,
                          description: task.description
                        })
                      }}
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
                  </TableCell>
                  <TableCell style={{textAlign:'center'}}>
                    <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
                      <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => {
                      setOpen(true);
                      setFormData({
                        id: task.id,
                        title: task.title,
                        description: task.description
                      })
                    }}>
                      <EditIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            })}

          </TableBody>
        </Table>
        <br/><br/><br/>
        <div className="pagination">
          <Button disabled={previous === null} onClick={prevPage} variant="contained">Anterior</Button>
          <Button disabled={next === null} onClick={nextPage} variant="contained">Próximo</Button>
          <br/><br/><br/>
          <Button disabled={next === null} onClick={() => {
            localStorage.clear();
            setRedir(true);
          }} variant="contained">Cerrar Sesión</Button>
          {
            redir && <Redirect to={'/'} />
          }
        </div>
        <br/><br/><br/>
      </div>

    </div>
  )
}

export default TaskList
