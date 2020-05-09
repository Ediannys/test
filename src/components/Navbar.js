import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';



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
    }

  

}));


function Navbar() {

  const classes = useStyles();


  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar >
          <div className={classes.menu}>

            <Link className={classes.link} to="/">

              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <HomeIcon />
              </IconButton>

            </Link>


            <Link className={classes.link} to="/login" color="inherit" >
              <Button className={classes.button} color="inherit">Iniciar Sesión</Button>
            </Link>

          </div>





        </Toolbar>
        <div>




        </div>
      </AppBar>
    </div>

  )
}


export default Navbar