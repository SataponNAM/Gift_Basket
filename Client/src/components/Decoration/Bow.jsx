import { memo } from 'react';
import { useGetDecorationQuery } from "../../slices/decorationApiSlice";
import { Container, Card } from "react-bootstrap";

import '../item.css'

const Bow = ({ decoId, selectedBow, setSelectedBow, total, setTotal }) => {
    const { deco } = useGetDecorationQuery("decorationList", {
        selectFromResult: ({ data }) => ({
            deco: data?.entities[decoId]
        })
    })

    const handleOnClick = () => {
        if (selectedBow !== null) {
            if (deco._id !== selectedBow.id) {
                setTotal((prevTotal) => prevTotal - selectedBow.price);
                setTotal((prevTotal) => prevTotal + deco.price);
            }
        } else {
            setTotal((prevTotal) => prevTotal + deco.price);
        }
        setSelectedBow(deco);
    }

    const classes = selectedBow != null && deco._id === selectedBow.id ? "border border-3 custom-border" : null;

    if (deco.category === "Bow") {
        return (
            <Container className="mt-2">
                <Card style={{ width: '16rem', height: '18rem' }} onClick={handleOnClick} className={classes}>
                
                <Card.Img variant="top" src={`${deco.image}`} style={{ height: '70%', objectFit: 'cover' }} />
                
                <Card.Body style={{ height: '40%' }} className="item-card">
                    <Card.Title style={{ fontSize: '1rem', lineHeight: '1.2', 
                                         overflow: 'hidden', textOverflow: 'ellipsis', 
                                         whiteSpace: 'nowrap' }}>{deco.name}</Card.Title>
                    
                    <Card.Text>Price : {deco.price} ฿</Card.Text>
                
                </Card.Body>
                
                </Card>
            </Container>
        );
    } else {
        return null
    }
}

const memorized = memo(Bow);

export default memorized;