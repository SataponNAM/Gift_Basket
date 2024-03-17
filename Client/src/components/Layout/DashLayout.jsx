import { Outlet } from "react-router-dom";
import Nav from "../Navbar/Navbar";

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

export default DashLayout