import React, { Component } from 'react'
import Login from './Login'

import Navbar from './Navbar'

class LoginComponent extends Component {
  render() {
    return (
    <React.Fragment>
       <Navbar/>
       <Login />
    </React.Fragment>
    
    )
  }
}

export default LoginComponent