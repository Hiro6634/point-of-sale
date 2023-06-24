import useCart from "../../contexts/cart.context";
import useProducts from "../../contexts/products.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Ticket from "../ticket/ticket.component";

import { 
    CheckoutContainer,
    CheckoutTitleContainer,
    CheckoutButtonsContainer
} from "./checkout.style"; 

const Print = (ticket) => {
    console.log(JSON.stringify(ticket,null,2));
}

const Checkout = () => {
    const {cartItems, clearAllItemsFromCart} = useCart();
    const {updateCounters} = useProducts();
    // const {enqueue} = useContext(QueueContext);

    const handleCancel = ()=>{
        clearAllItemsFromCart();
    }; 

    const handleCheckout = () => {
        //Update Counters
        let ticket = {items:[]};
        const total = cartItems.reduce((total, item)=>{
            updateCounters(item.name, item.quantity);
            const sale = item.quantity*item.price;

            ticket.items.push({
                name: item.name,
                quantity: item.quantity,
                sale: sale
            });
            total = total + sale;
            return total;
        //    return decCounter(item.id, item.quantity);
        },0);
        ticket = {
            ...ticket,
            total: total
        }
        Print(ticket);
        clearAllItemsFromCart();
    }

    return(
        <CheckoutContainer>
            <CheckoutTitleContainer>Ticket</CheckoutTitleContainer>
            <Ticket/>
            <CheckoutButtonsContainer>
                <Button onClick={handleCheckout}>FINALIZAR</Button>
                <Button 
                    buttonType={BUTTON_TYPE_CLASSES.google}
                    onClick={handleCancel}
                >
                    CANCELAR
                </Button>
            </CheckoutButtonsContainer>
        </CheckoutContainer>
    );
};

export default Checkout;