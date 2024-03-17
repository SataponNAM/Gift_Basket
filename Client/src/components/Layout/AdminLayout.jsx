import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Navbar/Navbar";
import AppSidebar from "../Sidebar/Sidebar";
import './Admin.css'

const AdminLayout = () => {
    return (
        <>
            <Nav />
            <div className="wrapper">
                <aside id="sidebar" className="border border-top-0">
                    <AppSidebar />
                </aside>

                <div className="main">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminLayout;
