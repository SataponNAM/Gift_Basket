import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from "react-bootstrap";
import { useGetBasketQuery, useDeleteBasketMutation } from "../../../slices/basketApiSlice";

const ManageBasket = ({ basketId }) => {
  const { basket } = useGetBasketQuery("basketList", {
    selectFromResult: ({ data }) => ({
      basket: data?.entities[basketId]
    })
  });

  const navigate = useNavigate()
  const [senDel] = useDeleteBasketMutation()

  const editClick = () => {
    navigate(`/adminDash/admin/product/basket/edit/${basket._id}`)
  }

  const deleteClick = async () => {
    await senDel({id : basket._id})
  }

  if (basket) {
    return (
      <Container className="mt-2">
          <Card style={{ width: '13rem', height: '22rem' }}>
            <Card.Img variant="top" src={basket.image} style={{ height: '50%', objectFit: 'cover' }}/>
            <Card.Body style={{ height: '40%' }}>
            
              <Card.Text style={{ fontSize: '1rem', lineHeight: '1.2', 
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {basket.name}
              </Card.Text>

              <Card.Text>Price : {basket.price} ฿</Card.Text>
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

export default ManageBasket;
