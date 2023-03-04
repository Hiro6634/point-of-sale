import { 
    ProductsContainer
 } from "./products.style";

const Products = ({products}) => {
    return(
        <ProductsContainer>
            
            { products.map((product)=>{
                <div>{product.name}</div>
            })}

        </ProductsContainer>      
    );
};

export default Products;