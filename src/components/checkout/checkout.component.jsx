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
    const {cartItems, cartTotal, clearAllItemsFromCart} = useCart();
    const {updateStock} = useProducts();
    // const {enqueue} = useContext(QueueContext);

    const handleCancel = ()=>{
        clearAllItemsFromCart();
    }; 

    const handleCheckout = () => {
        //Update Counters
        let ticket = {items:[]};
        cartItems.map((item)=>{
            const sale = item.quantity * item.price;
            updateStock(item.id, item.quantity);
            return ticket.items.push({
                name: item.name,
                quantity: item.quantity,
                sale: sale
            });
        });
        ticket = {
            ...ticket,
            total: cartTotal
        };
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