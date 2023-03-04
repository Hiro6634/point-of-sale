import { Outlet } from "react-router-dom";
import Products from "../../components/products/products.component";

const products = [
    {
        id: 1,
        name: 'pepe',
    },
    {
        id: 2,
        name: 'luis',
    },
    {
        id: 3,
        name: 'juana',
    },
]
const Home = () => {
    return (
        <div>
            <Products products={products}/>
            <Outlet/>
        </div>
    );
}

export default Home;