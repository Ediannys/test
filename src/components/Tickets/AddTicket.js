import React, { Component, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { createTicket } from '../../actions/TicketFunctions'
im

const useStyles = makeStyles((theme) => ({

  buttonAdd: {
    position: 'absolute',
    right: '0px',
    bottom: '0px'
  },

  selectEmpty: {
    width: '58%',
    marginLeft: '26px'
  }

}));

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_TICKET':
      createTicket(action.ticket)
      console.log(action.id);
      return "";
    default:
      throw new Error();
  }
}

const createTicket = (event) => {

  let ticket={
    issue: event.target.value,
    user_id: event.target.value
  }

  dispatch({ type: 'REMOVE_TICKET', id});
}


const AddTicket = () => {

  const classes = useStyles();

  const [ticket, setTicket] = React.useState({
    issue: null,
    user_id: null
  });

  const [open, setModalAddOpen] = React.useState(false);

  const modalAddOpen = () => {
    setModalAddOpen(true);
  }

  const modalAddClose = () => {
    setModalAddOpen(false);
  }

  return (

    <Fragment>
      <Fab size="small" className={classes.buttonAdd} color="primary" aria-label="add" onClick={() => modalAddOpen()}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={modalAddClose} aria-labelledby="form-dialog-title" fullWidth="600px">
        <DialogTitle id="form-dialog-title">Agregar Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="issue"
            value=""
            onChange=""
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
            value=""
            onChange=""
            className={classes.selectEmpty}>


            <MenuItem value="1">prueba</MenuItem>


          </Select>
        </div>
        <DialogActions>
          <Button onClick={modalAddClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

    </Fragment>
  )
};

export default AddTicket