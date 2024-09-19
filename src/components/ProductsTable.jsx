import React, { useContext } from "react";
import trashIcon from '../assets/trash-outline.svg';
import { CartContext } from "../context/cart.context";
import { ProductsContext } from "../context/product.context";

const ProductTable = () => {
    const {products} = useContext(ProductsContext);
    const {
        addProductToCart, 
        clearProductFromCart,
        getItemQuantity
    } = useContext(CartContext);

    const handleItemClick = (product) => {
        addProductToCart(product);
    }

    const handleItemDel = (product) => {
        clearProductFromCart(product);
    }

    return(
        <div   className="w-full  flex flex-col  items-start">
            <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr className=" columns-1">
                      <th className="p-2 text-sm font-semibold tracking-wide text-left text-silver-500">Descripción</th>  
                      <th className="p-2 text-sm font-semibold tracking-wide text-left">Precio</th>
                      <th className="p-2 text-sm font-semibold tracking-wide text-left">Cant.</th>
                      <th className="p-2 text-sm font-semibold tracking-wide text-left">S.Total</th>
                      <th className="p-2 text-sm font-semibold tracking-wide text-left">Borrar</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(product => {
                        const quantity = getItemQuantity(product.id);
                        return(
                            product.enable?
                            (
                                <tr key={product.id} className="p-2 columns-1">
                                    <td className="p-2 text-sm font-bold tracking-wide text-left" style={{backgroundColor: product.color}} onClick={()=>handleItemClick(product)}>{product.name.toUpperCase()}</td>
                                    <td className="p-2 text-sm font-mono tracking-wide text-right">${product.price}</td>
                                    <td className="p-2 text-sm font-mono tracking-wide text-right">{quantity}</td>
                                    <td className="p-2 text-sm font-mono tracking-wide text-right">${quantity*product.price}</td>
                                    <td className="p-2 text-sm font-mono tracking-wide text-center" onClick={()=>handleItemDel(product)}><img src={trashIcon} alt="trashicon" className="h-5 mx-auto"/></td>
                                </tr>
                            ):(null)
                        );
                    })
                }
                </tbody>
            </table> 
        </div>
    );
}

export default ProductTable;