import axios from 'axios'

export const register = newUser => {
  console.log(newUser);
  return axios
    .post('api/auth/register', {
      id_role: newUser.id_role,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
      
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('api/auth/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}