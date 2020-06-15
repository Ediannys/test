import React,{ Fragment} from 'react'
import { Route, Switch } from 'react-router-dom';
import Admin from '../dashboard/Admin';
import User from '../dashboard/User';
import DynamicLayoutNavbar from '../layout/DynamicLayoutNavbar';



const ProfileRoute = () => {
  
  return (
    <Fragment>
      <DynamicLayoutNavbar layout="PROFILE_NAV"/>
      <section className="container">
        <Switch>
          <Route exact path="/profile-admin" component={Admin} />
          <Route exact path="/profile-user" component={User} />
        </Switch>
      </section>
    </Fragment>
  )
};

export default ProfileRoute;
