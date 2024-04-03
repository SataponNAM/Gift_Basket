import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row } from "react-bootstrap";
import { useGetCardQuery, useDeleteCardMutation } from '../../../slices/cardApiSlice';

const ManageCard = ({ cardId }) => {
  const { card } = useGetCardQuery("cardList", {
    selectFromResult: ({ data }) => ({
      card: data?.entities[cardId]
    })
  });

  const navigate = useNavigate()
  const [senDel] = useDeleteCardMutation()

  const editClick = () => {
    navigate(`/adminDash/admin/product/card/edit/${card._id}`)
  }

  const deleteClick = async () => {
    await senDel({ id: card._id })
  }

  if (card) {
    return (
      <Container className="mt-2">
        <Card style={{ width: '13rem', height: '22rem' }}>
          <Card.Img variant="top" src={`${card.image}`} style={{ height: '50%', objectFit: 'cover' }} />
          <Card.Body style={{ height: '40%' }}>
            <Card.Title style={{
              fontSize: '1rem', lineHeight: '1.2',
              overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {card.name}
            </Card.Title>

            <Card.Text>Price : {card.price} ฿</Card.Text>
          </Card.Body>

          <Card.Footer style={{ height: 'fit-content' }}>
            <Button variant='outline-primary' className='m-1' onClick={editClick}>
              Edit
            </Button>

            <Button variant='outline-danger' className='m-1' onClick={deleteClick}>
              Delete
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  } else {
    return null;
  }
}

export default ManageCard;
