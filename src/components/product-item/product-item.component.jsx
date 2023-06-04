import { 
    ProductItemContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from "./product-item.styles";

const ProductItem = ({product, color}) => {
    const {name, price, quantity, subtotal} = product;
    return(
        <ProductItemContainer>
            <DescriptionContainer>{name.toUpperCase()}{color}</DescriptionContainer>
            <PriceContainer>{price}</PriceContainer>
            <QuantityContainer>{quantity}</QuantityContainer>
            <PriceContainer>{subtotal}</PriceContainer>
            <DeleteContainer>X</DeleteContainer>
        </ProductItemContainer>
    );
};

export default ProductItem;
