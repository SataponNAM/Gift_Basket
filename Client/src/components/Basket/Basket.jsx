import { useState } from 'react';
import { useGetBasketQuery } from "../../slices/basketApiSlice";
import { memo } from 'react';
import { Container, Card } from "react-bootstrap";

import '../item.css'

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
        <Card style={{ width: '16rem', height: '18rem' }} 
              onClick={selectedCard} className={classes}>
          <Card.Img 
            variant="top" 
            src={`${basket.image}`} 
            style={{ height: '70%', objectFit: 'cover' }} 
          />
          <Card.Body style={{ height: '40%' }} className="item-card">
              <Card.Title style={{ 
                fontSize: '1rem', 
                lineHeight: '1.2', overflow: 'hidden', 
                textOverflow: 'ellipsis', whiteSpace: 'nowrap' 
                }}>
                {basket.name}
              </Card.Title>
              
              <Card.Text>Price : {basket.price} ฿</Card.Text>
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
