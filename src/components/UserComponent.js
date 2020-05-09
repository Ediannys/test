import React, { Component } from 'react'
import Profile from './Profile'

import ProfileNavbar from './ProfileNavbar'

class UserComponent extends Component {
  render() {
    return (
    <React.Fragment>
       <ProfileNavbar/>
       <Profile />
    </React.Fragment>
    
    )
  }
}

export default UserComponent