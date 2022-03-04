import TicketActionTypes from './ticket.types';

export const sendTicket = (ticket) => ({
    type: TicketActionTypes.SEND_TICKET,
    payload: ticket
});
