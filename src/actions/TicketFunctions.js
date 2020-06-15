import axios from 'axios'

export const createTicket = newTicket => {

  return axios
    .post('api/tickets', {
      user_id: newTicket.user_id,
      issue: newTicket.issue,
      status: 0, 
    })
    .then(response => {
      console.log('Ticket Guardado')
    })
}


export const getTickets = function () {
    return axios
      .get('api/tickets')
      .then(response => {
        console.log(response.data);
        return response.data
      }).catch(err => {
        console.log(err)
      })
  }

  
export const getTicket = id => {
    return axios
      .get('api/tickets/'+id)
      .then(response => {
        return response.data
      }).catch(err => {
        console.log(err)
      })
  }

  export const getAllUserTickets = () => {
    return axios
      .get('api/all_user_tickets')
      .then(response => {
        return response.data
      }).catch(err => {
        console.log(err)
      })
  }


  export const getUserTickets = id => {
    return axios
      .get('api/user_tickets/'+id)
      .then(response => {
        return response.data
      }).catch(err => {
        console.log(err)
      })
  }

  export const updateStatusTicket = ticket => {
    return axios
      .put('api/ticket_status/'+ ticket.id, {
        status:  ticket.status
      })
      .then(response => {
        console.log('Ticket actualizado')
      }).catch(err => {
        console.log(err)
      })
  }


  export const updateTicket = ticket => {
    return axios
      .put('api/tickets/'+ ticket.id, {
        user_id: ticket.user_id,
        issue: ticket.issue, 
      })
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
  }



  export const removeTicket = id => {
    return axios
      .delete('api/tickets/'+id)
      .then(response => {
        console.log('Ticket Eliminado')
      }).catch(err => {
        console.log(err)
      })
  }