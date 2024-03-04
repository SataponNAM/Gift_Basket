import { memo, useEffect } from 'react';
import { useGetDecorationQuery } from "../../slices/decorationApiSlice";
import { Container, Image, Card } from "react-bootstrap";

const Ribbon = ({ decoId, selectedRibbon, setSelectedRibbon, total, setTotal }) => {
    const { deco } = useGetDecorationQuery("decorationList", {
        selectFromResult: ({ data }) => ({
            deco: data?.entities[decoId]
        })
    })

    const handleOnClick = () => {
        if (selectedRibbon !== null) {
            if (deco._id !== selectedRibbon.id) {
                setTotal((prevTotal) => prevTotal - selectedRibbon.price);
                setTotal((prevTotal) => prevTotal + deco.price);
            }
        } else {
            setTotal((prevTotal) => prevTotal + deco.price);
        }
        setSelectedRibbon(deco);
    }

    const classes = selectedRibbon != null && deco._id === selectedRibbon.id ? "border border-success" : null;

    if (deco.category === "Ribbon") {
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
const memorized = memo(Ribbon);

export default memorized;