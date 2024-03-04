import { useState } from 'react';
import { useGetCardQuery } from "../../slices/cardApiSlice";
import { memo } from 'react';
import { Container, Card } from "react-bootstrap";

const CardCompo = ({ cardId, selectedCard, setSelectedCard, total, setTotal }) => {
  const { cardData } = useGetCardQuery("cardList", {
    selectFromResult: ({ data }) => ({
        cardData: data?.entities[cardId]
    })
  });

  const handleOnClick = () => {
    if (selectedCard !== null) {
      if (cardData._id !== selectedCard.id) {
          setTotal((prevTotal) => prevTotal - selectedCard.price);
          setTotal((prevTotal) => prevTotal + cardData.price);
      }
  } else {
      setTotal((prevTotal) => prevTotal + cardData.price);
  }
    setSelectedCard(cardData)
  };

  // css ของขอบ card
  const classes = selectedCard != null && cardData._id === selectedCard.id ? "border border-success" : null;

  if (cardData) {
    return (
      <Container className="mt-2">
        <Card style={{ width: '18rem' }} onClick={handleOnClick} className={classes}>
          <Card.Img variant="top" src={cardData.image} />
          <Card.Body>
            <Card.Text>{cardData.name}</Card.Text>
            <Card.Text>{cardData.price} baths</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    return null;
  }
}

const memorized = memo(CardCompo);

export default memorized;
