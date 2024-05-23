import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <div className="bg-gray-300 min-h-screen flex items-center justify-center p-6">
                <Outlet />
            </div>
        </>
    )
}

export default AppLayout;