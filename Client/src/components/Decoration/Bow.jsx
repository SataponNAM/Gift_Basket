import { memo, useEffect } from 'react';
import { useGetDecorationQuery } from "../../slices/decorationApiSlice";
import { Container, Image, Card } from "react-bootstrap";

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

    const classes = selectedBow != null && deco._id === selectedBow.id ? "border border-success" : null;

    if (deco.category === "Bow") {
        return (
            <Container className="mt-2">
                <Card style={{ width: '10rem' }} onClick={handleOnClick} className={classes}>
                    <Card.Img variant="top" src={`${deco.image}`} />
                    <Card.Body>
                        <Card.Title>{deco.name}</Card.Title>
                        <Card.Text>{deco.price} baths</Card.Text>

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