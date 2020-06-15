import React,{ Fragment} from 'react'
import { Route, Switch, Redirect   } from 'react-router-dom';
import Admin from '../dashboard/Admin';
import User from '../dashboard/User';
import DynamicLayoutNavbar from '../layout/DynamicLayoutNavbar';
import { isAuthenticated } from "../../components/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);



const ProfileRoute = () => {
  
  return (
    <Fragment>
      <DynamicLayoutNavbar layout="PROFILE_NAV"/>
      <section className="container">
        <Switch>
          <PrivateRoute exact path="/profile-admin" component={Admin} />
          <PrivateRoute exact path="/profile-user" component={User} />
        </Switch>
      </section>
    </Fragment>
  )
};

export default ProfileRoute;
