import { 
    ProductsContainer,
    ProductHeaderContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
 } from "./products.style";

const Products = ({products}) => {
    return(
        <ProductsContainer>
            <ProductHeaderContainer>
                <DescriptionContainer>Descripción</DescriptionContainer>
                <PriceContainer>Precio</PriceContainer> 
                <QuantityContainer>Cant.</QuantityContainer>
                <PriceContainer>S.Total</PriceContainer>
                <DeleteContainer>Borrar</DeleteContainer>
            </ProductHeaderContainer>

            <div>
            { 
                products !== null ?
                    products.map((product)=>{
                        return(
                            <div key={product.id}>{product.name}</div>);
                        })
                : null
            }
            </div>
        </ProductsContainer>      
    );
};

export default Products;