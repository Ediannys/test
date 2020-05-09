import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeComponent from './components/HomeComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import UserComponent from './components/UserComponent'
import AdminComponent from './components/AdminComponent'

import ProfileAdmin from './components/ProfileAdmin'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={HomeComponent} />
          <div className="container">
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/profile-user" component={UserComponent} />
            <Route exact path="/profile-admin" component={AdminComponent} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App