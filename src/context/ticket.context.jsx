import React, { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer.utils';

const INITIAL_STATE = {
    tickets: []
}

export const TicketContext = createContext(INITIAL_STATE);

const TICKET_ACTION_TYPES = {
    ADD_TICKET: 'ADD_TICKET'
}

const ticketReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case TICKET_ACTION_TYPES.ADD_TICKET:
            return {
                ...state,
                tickets: addTicket(state.tickets, payload)
            }
        default:
            throw new Error(`unhandled type of ${type} in ticketReducer`);
    }
}

const addTicket = (tickets, ticketToAdd) => {
        return [...tickets, ticketToAdd];
}

export const TicketProvider = ({children}) => {
    const [state, dispatch] = useReducer(ticketReducer, INITIAL_STATE);

    const pushTicket = (ticket) => {
        dispatch(createAction(TICKET_ACTION_TYPES.ADD_TICKET, ticket));
    }
    
    const buildTicket = (cart, total) => {
        //TODO: Ver como es el tema de concurrencia
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2,'0');
        const day = String(currentDate.getDay() + 1).padStart(2,'0');
        const hour = String(currentDate.getHours() + 1).padStart(2,'0');
        const minutes = String(currentDate.getMinutes() + 1).padStart(2,'0');
        const seconds = String(currentDate.getSeconds() + 1).padStart(2,'0');
        const miliseconds = String(currentDate.getMilliseconds() + 1).padStart(3,'0');

        const items = cart.map((product, index) => {
            const id = `${year}${month}${day}${hour}${minutes}${seconds}${miliseconds}${String(index).padStart(4,'0')}`;
            return {
                id: id,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
                stotal: product.price * product.quantity
            };
        });
        const ticket = {
            items:items,
            total:total
        }

        return ticket;
    }
    
    const value = {
        tickets: state.tickets,
        pushTicket,
        buildTicket
    };

    return (
        <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
    )
}
