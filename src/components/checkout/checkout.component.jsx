import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Ticket from "../ticket/ticket.component";

import { 
    CheckoutContainer,
    CheckoutTitleContainer,
    CheckoutButtonsContainer
} from "./checkout.style"; 


const Checkout = () => {
    const {clearAllItemsFromCart} = useContext(CartContext);
    const handleCancel = ()=>{
        clearAllItemsFromCart();
    }; 

    return(
        <CheckoutContainer>
            <CheckoutTitleContainer>Ticket</CheckoutTitleContainer>
            <Ticket/>
            <CheckoutButtonsContainer>
                <Button>FINALIZAR</Button>
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