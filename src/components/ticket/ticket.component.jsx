import useCart from "../../contexts/cart.context";
import TicketItem from "../ticket-item/ticket-item.component";

import { 
    TicketContainer,
    TicketHeaderContainer,
    TicketHeaderDescriptionContainer,
    TicketHeaderPriceContainer,
    TicketHeaderQuantityContainer,
    TicketTotal    
} from "./ticket.style"

const Ticket = () => {
    const {
        cartTotal, 
        cartItems
    } = useCart();

    return(
        <TicketContainer>
            <TicketHeaderContainer>
                <TicketHeaderQuantityContainer>CANT.</TicketHeaderQuantityContainer>
                <TicketHeaderDescriptionContainer>DESCRIPCION</TicketHeaderDescriptionContainer>
                <TicketHeaderPriceContainer>S.TOTAL</TicketHeaderPriceContainer>
            </TicketHeaderContainer>
            {
                cartItems.map((item)=><TicketItem key={item.name} item={item}/>)
            }
            <TicketTotal>TOTAL: ${cartTotal}</TicketTotal>
        </TicketContainer>        
    );
};


export default Ticket;