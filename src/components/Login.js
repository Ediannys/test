import React, { Component } from 'react'
import { login } from './AuthFunctions'
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { email, required } from './form/validation';
import RFTextField from './form/RFTextField';
import FormButton from './form/FormButton';
import FormFeedback from './form/FormFeedback';
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
    padding: '0 20%',
  }

}));

function Login() {

  const classes = useStyles();
  const [disabled, setDisabled] = React.useState(true);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    

  };

  return (

    <div className={classes.divSigIn}>
      <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}  >
        {({ handleSubmit2, submitting }) => (


          <form onSubmit={handleSubmit2} className={classes.form}>
            <Typography variant="h4" gutterBottom marked="center" align="center">
            Iniciar Sesión
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