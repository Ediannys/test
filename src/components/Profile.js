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
import { getAllUserTickets } from './TicketFunctions'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



 function  Profile () {
  const classes = useStyles();

 
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    getAllUserTickets().then(tickets=>{

      console.log(tickets);
      setRows(tickets)
    })
    
  },[]);


 

  return (
    <TableContainer  component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell>Asunto</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Creado</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.issue}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.requested_ticket}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
}

export default Profile