import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import { CategoriesContext } from "../../contexts/categories.context";

import ProductItem from "../product-item/product-item.component";

import { 
    ProductsContainer,
    ProductsHeaderContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from "./products.style";

const Products = () => {
    const { productsCol } = useContext(ProductsContext);
    const { categoriesCol } = useContext(CategoriesContext);

    return(
        <ProductsContainer>
            <ProductsHeaderContainer>
                <DescriptionContainer>Descripcion</DescriptionContainer>
                <PriceContainer>Precio</PriceContainer>
                <QuantityContainer>Cant.</QuantityContainer>
                <PriceContainer>S.Total</PriceContainer>
                <DeleteContainer>Borrar</DeleteContainer>
            </ProductsHeaderContainer>
            {categoriesCol&&productsCol&&
                categoriesCol.sort((a,b)=>a.order-b.order).map((category)=>(
                    productsCol.filter(product=>product.category.toUpperCase()===category.name.toUpperCase())
                        .map((product)=>{
                            const {id} = product;
                            return(<ProductItem key={id} product={product} color={category.color}/>);
                        })
                ))
            }
        </ProductsContainer>        
    );
};

export default Products;