import React, { Component, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

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


const EditTicket = ({ value }) => {

    const classes = useStyles();
    const [issue, setIssue] = React.useState('');
    const [userId, setUserId] = React.useState('');

    const [open, setModalAddOpen] = React.useState(false);

    const modalAddOpen = () => {
        console.log(value);
        setModalAddOpen(true);
    }

    const modalAddClose = () => {
        setModalAddOpen(false);
    }

    return (

        <Fragment>
            <IconButton aria-label="edit" className={classes.margin} size="small" onClick={() => modalAddOpen()}>
                <EditIcon fontSize="inherit" />
            </IconButton>

            <Dialog open={open} onClose={modalAddClose} aria-labelledby="form-dialog-title" fullWidth="600px">
            <DialogTitle id="form-dialog-title">Editar Ticket </DialogTitle>
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

export default EditTicket