import axios from 'axios'


// Login User
export const login = async (user) => {
  
  try {
    const res = await axios.post('api/auth/login', { 
      email: user.email,
      password: user.password
    })
    localStorage.setItem('usertoken', res.data)
    return res.data

    
  } catch (err) {
   alert(err,'danger');
  }
};

// Register User
export const register = async (newUser) => {
  try{
    const res= await axios.post('api/auth/register', {
      role_id: 2,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    
    return res.data;

  }catch(err){
    alert(err,'danger');
  }
 
}

