import useProducts from "../../contexts/products.context";

import ProductItem from "../product-item/product-item.component";

import { 
    ProductsContainer,
    ProductsBodyContainer,
    ProductsHeaderContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from "./products.style";

const Products = () => {
    const { products } = useProducts();

    return(
        <ProductsContainer>
            <ProductsHeaderContainer>
                <DescriptionContainer>Descripcion</DescriptionContainer>
                <PriceContainer>Precio</PriceContainer>
                <QuantityContainer>Cant.</QuantityContainer>
                <PriceContainer>S.Total</PriceContainer>
                <DeleteContainer>Borrar</DeleteContainer>
            </ProductsHeaderContainer>
            <ProductsBodyContainer>
            {
                products &&
                    products.map((product)=>(
                        <ProductItem 
                            key={product.id} 
                            product={product} 
                            color={product.color}
                        />
                    ))
            }
            </ProductsBodyContainer>
        </ProductsContainer>        
    );
};

export default Products;