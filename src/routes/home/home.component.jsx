import { useContext, useEffect, useState } from "react";
import Products from "../../components/products/products.component";
import { HomeContainer } from "./home.styles";
import { CartContext } from "../../contexts/cart.context";
const Cart = () => {
    return(
        <div>
            <h2>Cart List</h2>
        </div>
    );
}

const HomePage = () => {
    const {cartCount} = useContext(CartContext);
    const [hideCart, setHideCart] = useState(true);

    useEffect(()=>{
        setHideCart(cartCount===0);
    },[cartCount]);
    return(
        <HomeContainer>
            <Products/>
            {!hideCart?(<Cart/>): null}
        </HomeContainer>
    );
};

export default HomePage;