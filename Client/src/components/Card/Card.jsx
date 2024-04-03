import { useGetCardQuery } from "../../slices/cardApiSlice";
import { memo } from 'react';
import { Container, Card } from "react-bootstrap";

import '../item.css'

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
  const classes = selectedCard != null && cardData._id === selectedCard.id ? "border border-3 custom-border" : null;

  if (cardData) {
    return (
      <Container className="mt-2">
        <Card style={{ width: '16rem', height: '18rem' }} onClick={handleOnClick} className={classes}>
          <Card.Img variant="top" src={`${cardData.image}`} style={{ height: '70%', objectFit: 'cover' }} />

          <Card.Body style={{ height: '40%' }} className="item-card">
            <Card.Title style={{
              fontSize: '1rem', lineHeight: '1.2',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>

              {cardData.name}
            </Card.Title>

            <Card.Text>Price : {cardData.price} ฿</Card.Text>
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
