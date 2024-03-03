import { useState } from 'react';
import { useGetCardQuery } from "../../slices/cardApiSlice";
import { memo } from 'react';
import { Container, Card } from "react-bootstrap";

const CardCompo = ({ cardId, selectedCard, setSelectedCard }) => {
  const { cardData } = useGetCardQuery("cardList", {
    selectFromResult: ({ data }) => ({
        cardData: data?.entities[cardId]
    })
  });

  const selected = () => {
    setSelectedCard(cardData)
    console.log(selectedCard)
  };

  // css ของขอบ card
  const classes = selectedCard != null && cardData._id === selectedCard.id ? "border border-success" : null;

  if (cardData) {
    return (
      <Container className="mt-2">
        <Card style={{ width: '18rem' }} onClick={selected} className={classes}>
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
