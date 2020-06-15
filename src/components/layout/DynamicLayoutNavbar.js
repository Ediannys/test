import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode'

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
        }
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        marginTop: '10px'
    }
}));

const DynamicLayoutNavbar = (props) => {

    let history = useHistory();
    const { layout } = props.layout;
    const classes = useStyles();

    const handleLogOut = () => {
        localStorage.removeItem('usertoken')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('role')
        history.push("/");
    };

    const renderNavbar = () => {

        switch (props.layout) {
            case 'AUTH_NAV': {
                if (!localStorage.getItem('isAuthenticated'))
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
                            </AppBar>
                        </div>
                    )
                return (<div></div>);
            }
            case 'PROFILE_NAV': {

                if (localStorage.getItem('isAuthenticated')) {
                    const token = localStorage.usertoken
                    const decoded = jwt_decode(token)
                    return (
                        <AppBar position="static">
                            <Toolbar >
                                <div className={classes.menu}>
                                    <Typography className={classes.header} variant="button" display="block" gutterBottom marked="left" align="left">
                                        <PersonIcon style={{ position: 'relative', top: '3px' }} />
                                        <span style={{ margin: '12px' }}>{decoded.first_name}</span>
                                        <span>{decoded.last_name} </span>
                                    </Typography>
                                    <Link className={classes.link} to="/login" color="inherit" >
                                        <Button className={classes.button} onClick={handleLogOut} color="inherit">Cerrar Sesión</Button>
                                    </Link>
                                </div>
                            </Toolbar>
                        </AppBar>
                    )
                }
                return (<div></div>)
            }
        }
    }
    return (
        renderNavbar()
    )

};

export default DynamicLayoutNavbar