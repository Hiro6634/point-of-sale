import TicketActionTypes from './ticket.types';

const INITAL_STATE = {
    tickets: null
}

const ticketReducer = (state=INITAL_STATE, action ) => {
    switch(action.type){
        case TicketActionTypes.SEND_TICKET:
            return{
                ...state,
                tickets: action.payload
            };
        default:
            return state;
    }
}

export default ticketReducer;