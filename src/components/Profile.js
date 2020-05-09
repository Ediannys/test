import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createTicket } from './TicketFunctions'
import { getAllUserTickets } from './TicketFunctions'
import { getUsers } from './UserFunctions'
import Typography from '@material-ui/core/Typography';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
    width: '70%',
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
}));

function Profile() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [issue, setIssue] = React.useState('');
  const [userId, setUserId] = React.useState('');

  React.useEffect(() => {

    allUserTickets()

     async function allUserTickets() {
       getAllUserTickets().then(tickets => {

      console.log(tickets);
      setRows(tickets)
    })
  }

    getUsers().then(users=>{
      setUsers(users)
    })

  }, [open]);

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTicket = () => {

    const ticket= {
      issue: issue,
      user_id: userId
    }

    createTicket(ticket)
    setUserId('')
    setIssue('')
    setOpen(false);

    
    
  };

 

  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const handleChangeIssue = (event) => {
    setIssue(event.target.value);
  };




  return (

    <div>



      <Typography className={classes.header} variant="h4" gutterBottom marked="left" align="left">
          Gestionar Tickets
            
      </Typography>


      <div >
      
    </div >


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
              <Fab size="small" className={classes.buttonAdd} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
              </Fab> 
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.issue}</TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.requested_ticket}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth="600px">
       
          <DialogTitle id="form-dialog-title">Agregar Ticket</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="issue"
              value={issue}
              onChange={handleChangeIssue}
              label="Asunto"
              type="text"
              fullWidth
            />
          </DialogContent>
          <div>
          <InputLabel className={classes.selectEmpty} id="demo-simple-select-label">Asunto</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userId}
            onChange={handleChangeUserId}
            className={classes.selectEmpty}>
            {users.map((user) => (
              <MenuItem value={user.id}>{user.first_name} {user.last_name}</MenuItem>
            ))}
          </Select>

          </div>
         
         
        
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateTicket} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>






    </div>

     
    </div>
  );

}

export default Profile