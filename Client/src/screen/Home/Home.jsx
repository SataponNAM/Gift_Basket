import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function home() {
    const navigate = useNavigate()

    const { email, isAdmin } = useAuth()

    const makeBasket = (e) => {
        navigate('/dash/makeBasket/basket')
    }

    let content

    if (!isAdmin) {
        content = (
            <Container>
                <div>
                    
                </div>
                
                <div>
                    <Button onClick={makeBasket}>Make your own basket.</Button>
                </div>
            </Container>
        );
    } else {
        navigate('/dash/admin/home')
    }

    return content
}

export default home