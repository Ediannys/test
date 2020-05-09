import axios from 'axios'


  export const getUsers = () => {
    return axios
      .get('api/users')
      .then(response => {
        return response.data
      }).catch(err => {
        console.log(err)
      })
  }

