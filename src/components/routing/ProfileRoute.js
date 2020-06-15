import React,{ Fragment} from 'react'
import { Route, Switch } from 'react-router-dom';
import Admin from '../dashboard/Admin';
import DynamicLayoutNavbar from '../layout/DynamicLayoutNavbar';



const ProfileRoute = () => {
  
  return (
    <Fragment>
      <DynamicLayoutNavbar layout="PROFILE_NAV"/>
      <section className="container">
        <Switch>
          <Route exact path="/profile-admin" component={Admin} />
        </Switch>
      </section>
    </Fragment>
  )
};

export default ProfileRoute;
