import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { login } from '../../actions/AuthFunctions'
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { email, required } from '../form/validation';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import Typography from '@material-ui/core/Typography';



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
  }

}));

function Login() {

  const classes = useStyles();
  const [disabled, setDisabled] = React.useState(true);
  let history = useHistory();




  const validate = (values) => {
    const errors = required(['email', 'password'], values);
    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
        console.log('entro');
        setDisabled(true);
      }
      else setDisabled(false);

    }

    return errors;
  };

  const handleSubmit = (values) => {

    const user = {
      email: values.email,
      password: values.password
    }
    
    login(user).then(res=>{
      if(res){
        localStorage.setItem('isAuthenticated',true)
        let decoded = jwt_decode(res)
        localStorage.setItem('rol', decoded.role_id)
        if(decoded.role_id == 2)history.push("/profile-user");
        else history.push("/profile-admin");
      }
    })

  };

  return (

    <div className={classes.divSigIn}>
      <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}  >
        {({ handleSubmit, values, submitting }) => (


          <form onSubmit={handleSubmit} className={classes.form}>
            <Typography variant="h4" gutterBottom marked="center" align="center">
            Iniciar Sesión
            
          </Typography>
          

          <Typography variant="body2" align="center">
            {'¿ No tienes una cuenta? '}
            <Link href="/register" align="center" underline="always">
              Regístrate
            </Link>
          </Typography>
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
              Ingresar
              </FormButton>
          </form>
        )}
      </Form>
    </div>

  )
}





export default Login