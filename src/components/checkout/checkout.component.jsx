import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
// import { QueueContext } from "../../contexts/queue.context";
import { decCounter } from "../../utils/firebase/firebase.utils";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Ticket from "../ticket/ticket.component";

import { 
    CheckoutContainer,
    CheckoutTitleContainer,
    CheckoutButtonsContainer
} from "./checkout.style"; 


const Checkout = () => {
    const {cartItems, clearAllItemsFromCart} = useContext(CartContext);
    // const {enqueue} = useContext(QueueContext);

    const handleCancel = ()=>{
        clearAllItemsFromCart();
    }; 

    const handleCheckout = () => {
        //Update Counters
        cartItems.map((item)=>{
           return decCounter(item.id, item.quantity);
        });
        //Print
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