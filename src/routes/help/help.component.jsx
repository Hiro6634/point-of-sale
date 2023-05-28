import { Outlet } from "react-router-dom";

const Help = () => {
    return(
        <div>
            <h1>Help Page</h1>
            <Outlet/>
        </div>
    );
};

export default Help;