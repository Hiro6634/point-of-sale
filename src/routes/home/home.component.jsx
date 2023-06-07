import { useContext, useEffect, useState } from "react";
import Products from "../../components/products/products.component";
import Checkout from "../../components/checkout/checkout.component";
import { HomeContainer } from "./home.styles";
import { CartContext } from "../../contexts/cart.context";

const HomePage = () => {
    const {cartCount} = useContext(CartContext);
    const [hideCart, setHideCart] = useState(true);

    useEffect(()=>{
        setHideCart(cartCount===0);
    },[cartCount]);
    return(
        <HomeContainer>
            <Products/>
            {!hideCart?(<Checkout/>): null}
        </HomeContainer>
    );
};

export default HomePage;