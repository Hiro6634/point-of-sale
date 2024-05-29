import React, { useContext } from 'react';
import { TicketContext } from '../context/ticket.context';

const Tickets = () => {
    const {tickets} = useContext(TicketContext);
    console.log("TICKETS", tickets);
    return(
        <div>
            <h2>Ticket View</h2>
            {tickets.map((ticket)=>{
                const {items, total} = ticket;
                return(
                    <div>
                        <h3>Items</h3>
                        {items.map((item)=>{
                            const {id, name, quantity, stotal} = item;
                            return(
                                <div>
                                    <span className='px-2'>{id}</span>
                                    <span className='px-2'>{name}</span>
                                    <span className='px-2'>{quantity}</span>
                                    <span className='px-2'>${stotal}</span>
                                </div>
                            );
                        })
                        }
                        <h3>Total:${total}</h3>
                        <hr/>
                    </div>
                );
            })
            }
        </div>
    );
}

export default Tickets;