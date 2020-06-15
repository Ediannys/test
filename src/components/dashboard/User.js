import React from 'react'
import jwt_decode from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { createTicket, updateStatusTicket, getUserTickets } from '../../actions/TicketFunctions'

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";


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
  divTable:{
    width: '70%',
    margin: 'auto'
  },
  margin: {
    margin: theme.spacing(1),
  },
  statusTrue:{
    backgroundColor: '#34a53494',
    color: 'white',
    padding: '3px',
    '&:hover, &:focus':{
      backgroundColor: '#34a53494',
    }
  },
  statusFalse:{
    backgroundColor: '#f44336',
    color: 'white',
    padding: '3px',
    '&:hover, &:focus':{
      backgroundColor: '#f44336',
    }
  }
}));


function reducer (state, action) {
    switch (action.type) {
    case 'CREATE_TICKET':
      createTicket(action.ticket)
      console.log(action.ticket);
      return "";
      case 'UPDATE_STATUS':
        updateStatusTicket(action.ticket)
        console.log(action.ticket);
        return "";
      default:
        throw new Error();
    }
  }

function User() {

let history = useHistory();
if(localStorage.getItem('rol')!= 2) history.push("/profile-admin");

const classes = useStyles();
const token = localStorage.usertoken;
const decoded = jwt_decode(token);


const [rows, setRows] = React.useState([])
const [user, setUser] = React.useState({
    id:decoded.id,
    first_name: decoded.first_name,
    last_name: decoded.last_name,
    email: decoded.email
  }
  );
const [update, setUpdate] = React.useState(0);
const [ticket, setTicket] = React.useState({
    id: '',
    issue: '',
    user_id: user.id
  });
const { issue, user_id} = ticket;
const [state, dispatch] = React.useReducer(reducer);
const [showMessage, setShowMessage] = React.useState('none');


React.useEffect(() => {

    userTickets()

    async function userTickets() {
        getUserTickets(user.id).then(tickets => {
          if(tickets == []) setShowMessage('block')
            console.log(tickets);
            setRows(tickets)
        })
    }
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

const updateStatus = (id, status) => {
    if(status==1) status=0;
    else status=1;

    const ticket = {
        id: id,
        status: status
    }

    dispatch({ type: 'UPDATE_STATUS', ticket});
    setUpdate(update + 2);
    
    }

    //MODAL ADD

const [openAdd, setModalAddOpen] = React.useState(false);

  const modalAddOpen = () => {
    setModalAddOpen(true);
  }

  const modalAddClose = () => {
    setModalAddOpen(false);
  }

    
  return (

    <div>
   <Typography className={classes.header} variant="h4" gutterBottom marked="left" align="left">
      Tickets 
   </Typography>
   <div className={classes.divTable}>
      <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Asunto</TableCell>
                  <TableCell>Creado</TableCell>
                  <TableCell className={classes.root}>
                     Estado
                     <Fab size="small" className={classes.buttonAdd} color="primary" aria-label="add" onClick={modalAddOpen}>
                        <AddIcon />
                     </Fab>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               <Typography  style={{display: showMessage}}variant="p" gutterBottom marked="center" align="center">
                  Agrega un ticket   <InsertEmoticonIcon style={{top: '6px', position:'relative'}}/>
               </Typography>
               {rows.map((row) => (
               <TableRow key={row.id}>
                  <TableCell>{row.issue}</TableCell>
                  <TableCell>{row.created}</TableCell>
                  <TableCell>
                     {row.status ? 
                     <Chip  onClick={()=>
                     updateStatus(row.id, row.status)} label="Pendiente" className={classes.statusFalse} /> : 
                     <Chip  onClick={()=>
                     updateStatus(row.id, row.status)} label="Recibido" className={classes.statusTrue} />
                     }
                  </TableCell>
               </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>


      {/** Modal Ticket Add */}
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
         <DialogActions>
            <Button onClick={modalAddClose} color="primary">
            Cancelar
            </Button>
            <Button onClick={createTicket} color="primary">
            Agregar
            </Button>
         </DialogActions>
      </Dialog>
   </div>
</div>
    
  
  );

}

export default User