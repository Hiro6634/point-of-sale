import { 
    TicketItemContainer,
    TicketItemDescriptionContainer,
    TicketItemPriceContainer,
    TicketItemQuantityContainer 
} from "./ticket-item.style";

const TicketItem = ({item}) => {
    const {quantity, name, price} = item;
    const subTotal = price * quantity;
    return(
        <TicketItemContainer>
            <TicketItemQuantityContainer>{quantity}</TicketItemQuantityContainer>
            <TicketItemDescriptionContainer>{name}</TicketItemDescriptionContainer>
            <TicketItemPriceContainer>{subTotal}</TicketItemPriceContainer>
        </TicketItemContainer>        
    );
};

export default TicketItem;