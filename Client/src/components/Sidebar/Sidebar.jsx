import React from "react";
import { Link } from "react-router-dom";
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import './Sidebar.css';
import { Nav, NavDropdown } from "react-bootstrap";

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper d-flex">
            <Nav className="flex-column mb-3 sidebar-nav" >
                <Nav.Link className="sidebar-item" >รายชื่อลูกค้า</Nav.Link>
                <Nav.Link className="sidebar-item">รายการคำสั่งซื้อ</Nav.Link>

                <NavDropdown title="รายการสินค้า" className="sidebar-item" >
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/basket/basketList'>ตะกร้า</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/flower/flowerList'>ดอกไม้</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/ribbon/ribbonList'>ริบบิ้น</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/bow/bowList'>โบว์</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/drink/drinkList'>Drink</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/adminDash/admin/product/fruit/fruitList'>Fruit</NavDropdown.Item>
                </NavDropdown>
                
            </Nav>
        </div>
    );
};

export default Sidebar;
