import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import TicketItem from '../ticket-item/ticket-item.component';

import { 
    TicketContainer,
    TicketHeaderDescriptionContainer,
    TicketHeaderPriceContainer,
    TicketHeaderQuantityContainer,
    TicketHeaderContainer,
    TicketTotal
} from './ticket.styles';

const Ticket  = ({cartItems, total}) => (
    <TicketContainer>
        <TicketHeaderContainer>
            <TicketHeaderQuantityContainer>CANT.</TicketHeaderQuantityContainer>
            <TicketHeaderDescriptionContainer>DESCRIPCION</TicketHeaderDescriptionContainer>
            <TicketHeaderPriceContainer>S.TOTAL</TicketHeaderPriceContainer>
        </TicketHeaderContainer>
        {
            cartItems ? (
                cartItems.map(item=>(
                    <TicketItem key={item.id} item={item}/>
                ))
            ): null
        }
        <TicketTotal>TOTAL: ${total}</TicketTotal>
    </TicketContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(Ticket);