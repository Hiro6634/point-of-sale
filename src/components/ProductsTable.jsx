import React, { useContext } from "react";
import trashIcon from '../assets/trash-outline.svg';
import { ProductsContext } from "../context/product.context";

const ProductTable = () => {
    const {products} = useContext(ProductsContext);
    return(
        <div   className="w-full  flex flex-col  items-start">
            <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
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
                        return(
                            product.enable?
                            (
                                <tr key={product.id} className="p-2">
                                    <td className="p-2 text-sm font-bold tracking-wide text-left" style={{backgroundColor: product.color}}>{product.name.toUpperCase()}</td>
                                    <td className="p-2 text-sm font-mono tracking-wide text-right">${product.price}</td>
                                    <td className="p-2 text-sm font-mono tracking-wide text-right">0</td>
                                    <td className="p-2 text-sm font-mono tracking-wide text-right"><img src={trashIcon} alt="trashicon" className="h-5"/></td>
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