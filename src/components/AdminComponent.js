import React, { Component } from 'react'
import ProfileAdmin from './ProfileAdmin'

import ProfileNavbar from './ProfileNavbar'

class AdminComponent extends Component {
  render() {
    return (
    <React.Fragment>
       <ProfileNavbar/>
       <ProfileAdmin />
    </React.Fragment>
    
    )
  }
}

export default AdminComponent