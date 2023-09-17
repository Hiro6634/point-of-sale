import { useEffect, useState } from "react";
import useCart from "../../contexts/cart.context";

import { 
    ProductItemContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from "./product-item.styles";


const ProductItem = (props) => {
    const {product} = props;
    const {name, price, color } = product;
    const [quantity, setQuantity] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const {        
        addItemToCart,
        clearItemFromCart,
        getQuantityFromCart,
        cartCount
    } = useCart();

    const handleNameClick = () => {
        addItemToCart(product);
    }

    const handleDeleteClick = () => {
        clearItemFromCart(product);
    }

    useEffect(()=>{
        const qtty = getQuantityFromCart(product);
        setQuantity(qtty);
        setSubtotal(qtty*price);
    },[cartCount, price, product, getQuantityFromCart]);

    return(
        <ProductItemContainer>
            <DescriptionContainer 
                color={color} 
                onClick={handleNameClick}
            >
                {name.toUpperCase()}
            </DescriptionContainer>
            <PriceContainer>${price}</PriceContainer>
            <QuantityContainer>{quantity}</QuantityContainer>
            <PriceContainer>${subtotal}</PriceContainer>
            <DeleteContainer
                onClick={handleDeleteClick}
            >
                &#10005;
            </DeleteContainer>
        </ProductItemContainer>
    );
};

export default ProductItem;
