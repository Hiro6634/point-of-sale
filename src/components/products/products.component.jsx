import { useContext, useEffect, useState } from "react";
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
    const [ productsLst, setProductsLst] = useState([]);

    useEffect(() =>{
        if( !categoriesCol ) {
            return;
        }
        setProductsLst(categoriesCol.sort((a,b)=>a.order-b.order).reduce((acc,category)=>{
            productsCol.filter(product=>product.category.toUpperCase() === category.name.toUpperCase())
                .map((product)=>{
                    if( product.enable ){
                        acc.push({
                            color: category.color,
                            ...product}
                        );
                    }
                    return acc;
                })
            return acc;
        },[]));
    }, [productsCol, categoriesCol]);

    return(
        <ProductsContainer>
            <ProductsHeaderContainer>
                <DescriptionContainer>Descripcion</DescriptionContainer>
                <PriceContainer>Precio</PriceContainer>
                <QuantityContainer>Cant.</QuantityContainer>
                <PriceContainer>S.Total</PriceContainer>
                <DeleteContainer>Borrar</DeleteContainer>
            </ProductsHeaderContainer>
            {
            productsLst&&
                productsLst.map((product)=>(
                    <ProductItem 
                        key={product.id} 
                        product={product} 
                        color={product.color}
                    />
                ))
            }
        </ProductsContainer>        
    );
};

export default Products;