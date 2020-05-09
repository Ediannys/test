import axios from 'axios'

export const createTicket = newTicket => {

  return axios
    .post('api/tickets', {
      user_id: newTicket.user_id,
      issue: newTicket.issue,
      requested_ticket: 0, 
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


  export const updateTicket = updatedTicket => {
    return axios
      .update('api/tickets'+ updatedTicket.id, {
        user_id: updatedTicket.user_id,
        issue: updatedTicket.issue,
        requested_ticket: updatedTicket.requested_ticket, 
      })
      .then(response => {
        console.log('Ticket Actualizado')
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