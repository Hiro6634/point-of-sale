import React, { useContext } from "react";
import Cart from "../components/Cart";
import ProductTable from "../components/ProductsTable";
import { CartContext } from "../context/cart.context";

const Home = () => {
    const { hide } = useContext(CartContext);

    return (
        <div className="w-full">
            <ProductTable />
            {hide ? null : (<Cart />)}
        </div>
    );
}

export default Home;