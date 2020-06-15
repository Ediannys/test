import React, { Component } from 'react'
import { register } from '../../actions/AuthFunctions'
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { email, required } from '../form/validation';
import { useHistory } from "react-router-dom";

import Link from '@material-ui/core/Link';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';






const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
    padding: '50px 20%',
    background: '#fff5f8' 
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  divSigIn:{
    padding: '0 25%',
  },
  divLogin:{
    marginBottom: '2em',
  }

}));

function Register() {

  const classes = useStyles();
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus] = React.useState(false);
  let history = useHistory();


  const validate = (values) => {
    const errors =required(['firstName', 'lastName', 'email', 'password'], values);
    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
        setDisabled(true);
      }
      else setDisabled(false);

    }

    return errors;
  };

  const handleSubmit = (values) => {
    setStatus(true);
    const user = {
      first_name:values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password
    }
    
    register(user).then(res=>{

      if(res){
        setStatus(false);
        console.log('recibio a res');
        history.push("/login");
      }
    })

  };

  return (
   
    <div className={classes.divSigIn}>
      { status ? <LinearProgress />: <p></p>}
      <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}  >
      
        {({ handleSubmit, values, submitting }) => (


          <form onSubmit={handleSubmit} className={classes.form}>
            <Typography variant="h4" gutterBottom marked="center" align="center">
            Registrarse
            
          </Typography>
          

          <Typography className={classes.divLogin} variant="body2" align="center">
            {'¿Tienes una cuenta? '}
            <Link href="/login" align="center" underline="always">
              Inciar Sesión
            </Link>
          </Typography>
          <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
            <Field
              autoComplete="email"
              autoFocus
              component={RFTextField}
              disabled={submitting}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
              size="large"
            />
            <Field
              fullWidth
              size="large"
              component={RFTextField}
              disabled={submitting}
              required
              name="password"
              autoComplete="current-password"
              label="Password"
              type="password"
              margin="normal"
            />
            
            <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) =>
                submitError ? (
                  <FormFeedback className={classes.feedback} error>
                    {submitError}
                  </FormFeedback>
                ) : null
              }
            </FormSpy>
            <FormButton
              className={classes.button}
              disabled={ (submitting==false) ^ !disabled }
              size="large"
              color="secondary"
              fullWidth
            >
              Registrarse
              </FormButton>
          </form>
        )}
      </Form>
    </div>

  )
}





export default Register