import { useState } from 'react';
import { useGetBasketQuery } from "../../slices/basketApiSlice";
import { memo } from 'react';
import { Container, Card } from "react-bootstrap";

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
  const classes = selectedBasket != null && basket._id === selectedBasket.id ? "border border-success" : null;

  if (basket) {
    return (
      <Container className="mt-2">
        <Card style={{ width: '18rem' }} onClick={selectedCard} className={classes}>
          <Card.Img variant="top" src={basket.image} />
          <Card.Body>
            <Card.Text>{basket.name}</Card.Text>
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
