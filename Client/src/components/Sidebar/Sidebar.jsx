import React from "react";
import { Link } from "react-router-dom";
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import './Sidebar.css';
import { Nav, NavDropdown } from "react-bootstrap";

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper d-flex">
            <Nav className="flex-column mb-3 sidebar-nav" >
                <Nav.Link className="sidebar-item" as={Link} to='/adminDash/admin/home'>Home</Nav.Link>
                <Nav.Link className="sidebar-item" as={Link} to='/adminDash/admin/order/orderListAdmin'>Order List</Nav.Link>

                <NavDropdown title="All Products" className="sidebar-item" >
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/basket/basketList'>Basket</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/flower/flowerList'>Flower</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/ribbon/ribbonList'>Ribbon</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/bow/bowList'>Bow</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/drink/drinkList'>Beverage</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/fruit/fruitList'>Fruit</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/card/cardList'>Card</NavDropdown.Item>
                </NavDropdown>
                
            </Nav>
        </div>
    );
};

export default Sidebar;
