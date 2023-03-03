import { Outlet } from "react-router-dom";

const Navigation = () => {
    return(
        <div>
            <div>
                <h2>Navigation</h2>
            </div>
            <Outlet/>
        </div>
    );
}

export default Navigation;