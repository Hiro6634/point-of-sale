import { useContext } from "react";
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
    const {isCartOpen} = useContext(CartContext);
    
    return(
        <HomeContainer>
            <Products/>
            {isCartOpen?(<Cart/>): null}
        </HomeContainer>
    );
};

export default HomePage;