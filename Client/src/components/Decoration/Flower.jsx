import { useGetDecorationQuery } from "../../slices/decorationApiSlice";
import { memo } from 'react';
import { Container, Card } from "react-bootstrap";

import '../item.css'

const Flower = ({ decoId, selectedFlower, setSelectedFlower, total, setTotal }) => {
  const { deco } = useGetDecorationQuery("decorationList", {
    selectFromResult: ({ data }) => ({
      deco: data?.entities[decoId]
    })
  })

  const handleOnChange = () => {
    if (selectedFlower !== null) {
      if (deco._id !== selectedFlower.id) {
        setTotal((prevTotal) => prevTotal - selectedFlower.price);
        setTotal((prevTotal) => prevTotal + deco.price);
      }
    } else {
      setTotal((prevTotal) => prevTotal + deco.price);
    }
    setSelectedFlower(deco);
  }

  const classes = selectedFlower != null && deco._id === selectedFlower.id ? "border border-3 custom-border" : null;

  if (deco.category === "Flower") {
    return (
      <Container className="mt-2">
        <Card style={{ width: '16rem', height: '18rem' }} onClick={handleOnChange} className={classes}>
        
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

const memorized = memo(Flower);

export default memorized;

