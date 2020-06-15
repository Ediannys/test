import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


import { createTicket, getTicket , removeTicket, updateTicket, getAllUserTickets} from '../../actions/TicketFunctions'
import { getUsers } from '../../actions/UserFunctions'



import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 650,
  },
  header:{
    padding: '1em',
    marginBottom: '2em',
    background: '#fff5f8' 
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'relative'
  },
  buttonAdd: {
    position: 'absolute',
    right: '0px',
    bottom: '0px'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  divTable:{
    width: '80%',
    margin: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    width: '58%',
    marginLeft: '26px'
  },
  divIcon:{
    position:'relative',
    left:'35px'
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  statusTrue:{
    background: '#34a53494',
    color: 'white',
    padding: '3px',
  },
  statusFalse:{
    background: '#f44336',
    color: 'white',
    padding: '3px',
  }
}));




function reducer (state, action) {
  switch (action.type) {
    case 'REMOVE_TICKET':
      removeTicket(action.id)
      return;
    case 'CREATE_TICKET':
      createTicket(action.ticket)
      return "";
    case 'UPDATE_TICKET':
      updateTicket(action.ticket)
      return "";
    default:
      throw new Error();
  }
}

function Admin() {

let history = useHistory();

if(localStorage.getItem('rol')!= 1) history.push("/profile-user");

const classes = useStyles();
const [rows, setRows] = React.useState([])
const [users, setUsers] = React.useState([]);
const [update, setUpdate] = React.useState(0);
const [ticket, setTicket] = React.useState({
  id:'',
  issue: '',
  user_id: ''
});
const { issue, user_id} = ticket;
const [state, dispatch] = React.useReducer(reducer);

React.useEffect(() => {

    allUserTickets()

    async function allUserTickets() 
    {
      getAllUserTickets().then(tickets => {
        setRows(tickets) })
    }

    getUsers().then(users => {
        setUsers(users)
    })

}, [update]);

//CRUD

const onChange = (e) =>
    setTicket({ ...ticket, [e.target.name]: e.target.value });


    const createTicket = () => {
      dispatch({ type: 'CREATE_TICKET', ticket});
      setUpdate(update + 1);
      setTicket({ ticket: '' });
      modalAddClose();
    }
    const removeTicket = (id) => {
      dispatch({ type: 'REMOVE_TICKET', id});
      setUpdate(update + 2);
    }
    const updateTicket = (id) => {
      dispatch({ type: 'UPDATE_TICKET', ticket});
      setUpdate(update + 3);
      modalEditClose();
    }

//MODAL ADD

const [openAdd, setModalAddOpen] = React.useState(false);

  const modalAddOpen = () => {
    setModalAddOpen(true);
  }

  const modalAddClose = () => {
    setModalAddOpen(false);
  }

//MODAL EDIT

const [openEdit, setModalEditOpen] = React.useState(false);

  const modalEditOpen = (id) => {

    setModalEditOpen(true);
    getTicket(id).then(res => {
      setTicket({
        id:res.id,
        issue: res.issue,
        user_id: res.user_id
      })  
  })}

  const modalEditClose = () => {
    setModalEditOpen(false);
  }

  return (
    <div>
  <Typography className={classes.header} variant="h4" gutterBottom marked="left" align="left">
          Gestionar Tickets  
      </Typography>
  <div className={classes.divTable}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Asunto</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Creado</TableCell>
            <TableCell className={classes.root}>Estado

              { /** Boton Agregar Ticket */}
              
              <Fab size="small" className={classes.buttonAdd} color="primary" aria-label="add" onClick={modalAddOpen}>
                <AddIcon />
              </Fab>
              
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
              
          <TableRow key={row.id}>
            <TableCell>{row.issue}</TableCell>
            <TableCell>{row.user.first_name}</TableCell>
            <TableCell>{row.user.last_name}</TableCell>
            <TableCell>{row.created}</TableCell>
            <TableCell>
                  {row.status ? 
              <span className={classes.statusFalse}>Pendiente</span> : 
              <span className={classes.statusTrue}>Recibido</span>}

                  
              <span className={classes.divIcon}>
                <IconButton aria-label="delete" className={classes.margin} size="small" onClick={ ()=> removeTicket(row.id) }>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>

                { /** Boton Editar Ticket */}
                <IconButton aria-label="edit" className={classes.margin} size="small" onClick={()=>modalEditOpen(row.id)}>
                  <EditIcon fontSize="inherit" />
                </IconButton>

              </span>
            </TableCell>
          </TableRow>
            ))}
          
        </TableBody>
      </Table>
    </TableContainer>



    { /** Modal Ticket Add */}
    <Dialog open={openAdd} onClose={modalAddClose} aria-labelledby="form-dialog-title" fullWidth="600px">
      <DialogTitle id="form-dialog-title">Agregar Ticket</DialogTitle>
      <DialogContent>
        <TextField
              autoFocus
              margin="dense"
              name="issue"
              value={issue}
              onChange={onChange}
              label="Asunto"
              type="text"
              fullWidth
            />
      </DialogContent>
      <div>
        <InputLabel className={classes.selectEmpty} id="demo-simple-select-label">Usuario</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            name="user_id"
            value={user_id}
            onChange={onChange}
            className={classes.selectEmpty}>
            {users.map((user) => (
              
          <MenuItem value={user.id}>{user.first_name} {user.last_name}</MenuItem>
            ))}
          
        </Select>
      </div>
      <DialogActions>
        <Button onClick={modalAddClose} color="primary">
            Cancelar
          </Button>
        <Button onClick={createTicket} color="primary">
            Agregar
          </Button>
      </DialogActions>
    </Dialog>

    

    
    { /** Modal Ticket Edit */}
    <Dialog open={openEdit} onClose={modalEditClose} aria-labelledby="form-dialog-title" fullWidth="600px">
      <DialogTitle id="form-dialog-title">Editar Ticket</DialogTitle>
      <DialogContent>
        <TextField
              autoFocus
              margin="dense"
              name="issue"
              value={issue}
              onChange={onChange}
              label="Asunto"
              type="text"
              fullWidth
            />
      </DialogContent>
      <div>
        <InputLabel className={classes.selectEmpty} id="demo-simple-select-label">Usuario</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            name="user_id"
            value={user_id}
            onChange={onChange}
            className={classes.selectEmpty}>
            {users.map((user) => (
              
          <MenuItem value={user.id}>{user.first_name} {user.last_name}</MenuItem>
            ))}
          
        </Select>
      </div>
      <DialogActions>
        <Button onClick={ modalEditClose } color="primary">
            Cancelar
          </Button>
        <Button  onClick={ updateTicket } color="primary">
            Agregar
          </Button>
      </DialogActions>
    </Dialog>

  </div>
</div>
  
  );

}

export default Admin