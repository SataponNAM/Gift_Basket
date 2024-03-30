import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
import { Nav } from "react-bootstrap";

import { FaAngleDown, FaAngleUp  } from "react-icons/fa";

const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState(null);

    const handleMenuClick = (menuId) => {
        if (openMenu === menuId) {
            setOpenMenu(null);
        } else {
            setOpenMenu(menuId);
        }
    };

    return (
        <div className="d-flex">
            <Nav className="flex-column sidebar-nav" >
                <Nav.Link className="sidebar-item" as={Link} to='/adminDash/admin/home'>Home</Nav.Link>
                <Nav.Link className="sidebar-item" as={Link} to='/adminDash/admin/order/orderListAdmin'>Order List</Nav.Link>

                <NavItemWithSubMenu
                    title="All Products"
                    subItems={[
                        { title: "Basket", to: "/adminDash/admin/product/basket/basketList" },
                        { title: "Flower", to: "/adminDash/admin/product/flower/flowerList" },
                        { title: "Ribbon", to: "/adminDash/admin/product/ribbon/ribbonList" },
                        { title: "Bow", to: "/adminDash/admin/product/bow/bowList" },
                        { title: "Beverage", to: "/adminDash/admin/product/drink/drinkList" },
                        { title: "Fruit", to: "/adminDash/admin/product/fruit/fruitList" },
                        { title: "Card", to: "/adminDash/admin/product/card/cardList" }
                    ]}
                    open={openMenu === "products"}
                    onClick={() => handleMenuClick("products")}
                />
            </Nav>
        </div>
    );
};

const NavItemWithSubMenu = ({ title, to, subItems, open, onClick }) => {
    return (
        <Nav.Item>
            <Nav.Link
                className="sidebar-item"
                as={Link}
                to={to}
                onClick={onClick}
            >
                {title}{' '}
                {open ? <FaAngleUp  /> : <FaAngleDown />}
            </Nav.Link>
            {open && (
                <div className="submenu">
                    {subItems.map((item, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link as={Link} to={item.to} className="sidebar-sub-item">{item.title}</Nav.Link>
                        </Nav.Item>
                    ))}
                </div>
            )}
        </Nav.Item>
    );
};


export default Sidebar;
