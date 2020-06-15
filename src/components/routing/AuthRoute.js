import React,{ Fragment} from 'react'
import { Route, Switch } from 'react-router-dom';
import Landing from '../layout/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import DynamicLayoutNavbar from '../layout/DynamicLayoutNavbar';



const AuthRoute = () => {
  
  return (
    <Fragment>
      <DynamicLayoutNavbar layout="AUTH_NAV"/>
      <section className="container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </Fragment>
  )
};

export default AuthRoute;
