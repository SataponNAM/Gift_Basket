import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Footer from "../../components/Footer/Footer.jsx";

import './Home.css';

function home() {
    const navigate = useNavigate()

    const { email, isAdmin } = useAuth()

    const makeBasket = (e) => {
        navigate('/dash/makeBasket/basket')
    }

    let content

    if (!isAdmin) {
        content = (
            <>
                <Container className="home-container">
                    <div className="home-details">
                        <h2>Make Your Own Basket</h2>
                        <p>Let's start decorating your gift basket for your loved one</p>
                        <Button onClick={makeBasket} className="main-button">Start</Button>
                    </div>
                </Container>
                <Footer />
            </>
        );
    } else {
        navigate('/adminDash/admin/home')
    }

    return content
}

export default home