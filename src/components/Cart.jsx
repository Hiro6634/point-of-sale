import React, { useContext } from "react";
import { CartContext } from "../context/cart.context";
import { TicketContext } from "../context/ticket.context";

const Cart = () => {
    const {
        cart, 
        total,
        clearCart
    } = useContext(CartContext);

    const{ 
        pushTicket, 
        buildTicket
    } = useContext(TicketContext);

    const handleCloseCart = () => {
        pushTicket(buildTicket(cart, total));
   
        clearCart();
    }

    const handleCancelCart = () => {
        clearCart();
    }

    return(
        <div className="w-auto min-h-[10vh] flex flex-col items-center mt-12 mx-auto nb-0 p-2.5 font-open-sans-condensed">
            <h2 className="font-open-sans-condensed text-4xl">Ticket</h2>
            <div className="w-[300px] flex flex-col min-h-[10vh]">
                <div className="w-auto flex flex-col border border-gray-500 p-5">
                    <table>
                        <thead>
                            <tr className="w-full border-b border-gray-500 flex flex-row justify-between capitalize font-bold font-open-sans-condensed">
                                <td className="w-1/5">CANT.</td>
                                <td className="w-3/5">DESCRIPCION</td>
                                <td className="w-1/5">S.TOTAL</td>
                            </tr>
                        </thead>
                        <tbody>
                        { cart.length > 0 ? (
                            cart.map((item)=>{
                                return(
                                <tr key={item.id} className="w-full flex flex-row justify-between capitalize font-open-sans-condensed">
                                    <td className="w-1/5 justify-center">{item.quantity}</td>
                                    <td className="w-3/5 text-left" >{item.name.toUpperCase()}</td>
                                    <td className="w-1/5 text-right" >${item.price * item.quantity}</td>
                                </tr>)
                            })
                        ) : null}

                        </tbody>
                    </table>
                    <div className="mt-[10px] ml-auto text-3xl">
                        TOTAL: ${total} 
                    </div>
                </div>
                <div className="w-full flex justify-between">
                <button className="bg-gray-800 text-white font-bold px-5 py-2 w-1/2" onClick={()=>handleCloseCart()}>FINALIZAR</button>
                <button className="bg-blue-500 font-bold px-5 py-2 w-1/2" onClick={()=>handleCancelCart()}>CANCELAR</button>
            </div>
            </div>
        </div>
    );
}

export default Cart;