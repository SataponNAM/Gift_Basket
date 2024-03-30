import { useState } from 'react';
import { useGetBasketQuery } from "../../slices/basketApiSlice";
import { memo } from 'react';
import { Container, Card } from "react-bootstrap";

import './basket.css'

const Basket = ({ basketId, selectedBasket, setSelectedBasket }) => {
  const { basket } = useGetBasketQuery("basketList", {
    selectFromResult: ({ data }) => ({
      basket: data?.entities[basketId]
    })
  });

  const selectedCard = () => {
    setSelectedBasket(basket)
  };

  // css ของขอบ card
  const classes = selectedBasket != null && basket._id === selectedBasket.id ? "border border-3 custom-border" : null;

  if (basket) {
    return (
      <Container className="mt-2">
        <Card style={{ width: '16rem' }} onClick={selectedCard} className={classes}>
          <Card.Img variant="top" src={basket.image} />
          <Card.Body className="basket-card">
            <Card.Text >{basket.name}</Card.Text>
            <Card.Text>{basket.price} ฿</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    return null;
  }
}

const memorized = memo(Basket);

export default memorized;
