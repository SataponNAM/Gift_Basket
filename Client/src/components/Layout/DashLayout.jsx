import { Outlet } from "react-router-dom";
import Nav from "../Navbar/Navbar.jsx";

const DashLayout = () => {
    return (
        <>
            <div>
                <Nav />
                <div>
                    <Outlet />
                </div>
                
            </div>
        </>
    )
}

export default DashLayout;
