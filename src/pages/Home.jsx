import React from "react";
import ProductTable from "../components/ProductsTable";

const Home = () => {
    return(
        <div className="w-full">
            <h1>Productos</h1>
            <ProductTable/>
        </div>
    );
}

export default Home;