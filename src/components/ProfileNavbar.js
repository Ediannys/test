import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#e85380',
    height: '80px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    }},
    menu: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    button:{
      marginTop:'10px'
    },
    header:{
      marginTop: '8px'
    }

}));


function ProfileNavbar() {

let history = useHistory();
  const classes = useStyles();
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({
    id:decoded.id,
    first_name: decoded.first_name,
    last_name: decoded.last_name,
    email: decoded.email
  }
  );

  const handleLogOut = () => {
    localStorage.removeItem('usertoken')
    history.push("/");

};

  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar >
          <div className={classes.menu}>

          <Typography className={classes.header} variant="button" display="block" gutterBottom marked="left" align="left">
          <PersonIcon style={{position: 'relative', top:'3px'}}/>
            <span style={{margin: '12px'}}>{user.first_name}</span>
            <span>{user.last_name} </span>
      </Typography>
          
                
            <Link className={classes.link} to="/login" color="inherit" >
              <Button className={classes.button} onClick={handleLogOut} color="inherit">Cerrar Sesión</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}


export default ProfileNavbar