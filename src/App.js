import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomeComponent from './components/HomeComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import UserComponent from './components/UserComponent'
import AdminComponent from './components/AdminComponent'

import ProfileAdmin from './components/ProfileAdmin'
import { isAuthenticated } from "./components/auth";


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

class App extends Component {

  render() {
    return (

      <BrowserRouter>
        <Switch>
        <div className="App">
          <Route exact path="/" component={HomeComponent} />
          <div className="container">
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/profile-user" component={UserComponent} />
            <Route  exact path="/profile-admin" component={AdminComponent} />
          </div>
        </div>
        </Switch>
  </BrowserRouter>
    )
  }
}

export default App