import { Outlet } from "react-router-dom";
import Nav from "./Navbar/Navbar";

const DashLayout =()=> {
    return (
        <>
            <Nav />
            <div>
                <Outlet />
            </div>
            {/* ใส่ footer */}
        </>
    )
}

export default DashLayout