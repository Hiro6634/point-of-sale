import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout = () => {
    return (
        <div>
            <Navbar className="lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col" />
            <div className="bg-gray-300 min-h-screen flex flex-colitems-center justify-center p-3">
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;