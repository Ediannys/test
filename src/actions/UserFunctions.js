import axios from 'axios'


  export const getUsers = async () => {

    try{

      const res= await axios.get('api/users')
      return res.data;

    }catch(err){
      alert(err,'danger');
    }
    
  }

