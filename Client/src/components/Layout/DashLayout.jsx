import { Outlet } from "react-router-dom";
import Nav from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

const DashLayout = () => {
    return (
        <>
            <div>
                <Nav />
                <div>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default DashLayout;
