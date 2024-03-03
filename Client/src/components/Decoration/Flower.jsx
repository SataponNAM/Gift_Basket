import { useState } from 'react';
import { useGetDecorationQuery } from "../../slices/decorationApiSlice";
import { memo, useEffect } from 'react';
import { Container, Image, Card } from "react-bootstrap";

const Flower = ({ decoId, selectedFlower, setSelectedFlower, total, setTotal }) => {
  const { deco } = useGetDecorationQuery("decorationList", {
    selectFromResult: ({ data }) => ({
      deco: data?.entities[decoId]
    })
  })

  const handleOnChange = () => {
    if (selectedFlower !== null && deco._id !== selectedFlower.id) {
      setTotal((prevTotal) => prevTotal - selectedFlower.price);
    }
    setSelectedFlower(deco);
    setTotal((prevTotal) => prevTotal + deco.price);
  }

  const classes = selectedFlower != null && deco._id === selectedFlower.id ? "border border-success" : null;

  if (deco.category === "Flower") {
    return (
      <Container className="mt-2">
        <Card style={{ width: '10rem' }} onClick={handleOnChange} className={classes}>
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

const memorized = memo(Flower);

export default memorized;

