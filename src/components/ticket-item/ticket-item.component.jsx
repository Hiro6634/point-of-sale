import React from 'react';

import { 
    TicketItemContainer,
    TicketItemDescriptionContainer,
    TicketItemPriceContainer,
    TicketItemQuantityContainer 
} from './ticket-item.styles';

const TicketItem = ({item}) => (
    <TicketItemContainer>
        <TicketItemQuantityContainer>{item.quantity}</TicketItemQuantityContainer>
        <TicketItemDescriptionContainer>{item.name}</TicketItemDescriptionContainer>
        <TicketItemPriceContainer>${item.price*item.quantity}</TicketItemPriceContainer>
    </TicketItemContainer>
);  

export default TicketItem;