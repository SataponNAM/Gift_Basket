import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function home(){
    const navigate = useNavigate()

    const makeBasket =(e)=>{
        navigate('/dash/makeBasket/basket')
    }

    return(
        <Container>
            <div>
                {/* รูปภาพ */}
            </div>
            <div>
                <Button onClick={makeBasket}>Make your own basket.</Button>
            </div>
        </Container>
        
    )
}

export default home