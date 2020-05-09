import React, { Component } from 'react'
import Register from './Register'

import Navbar from './Navbar'

class RegisterComponent extends Component {
  render() {
    return (
    <React.Fragment>
       <Navbar/>
       <Register />
    </React.Fragment>
    
    )
  }
}

export default RegisterComponent