import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

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
            <h1>{message}</h1>
        </>
    )
}

export default Success