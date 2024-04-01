import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './Success.css'

function Success() {
    const [message, setMessage] = useState("");
    const { status } = useParams();

    useEffect(() => {
        if (status) {
            setMessage("Success");
        }
    }, []);

    return (
        <>
            <Container className="success-container">
            <h1>{message}</h1>
            </Container>
        </>
    )
}

export default Success