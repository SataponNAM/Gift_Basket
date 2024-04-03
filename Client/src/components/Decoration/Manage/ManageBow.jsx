import { useGetDecorationQuery, useDeleteDecorationMutation } from "../../../slices/decorationApiSlice";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ManageBow = ({ decoId }) => {
  const { deco } = useGetDecorationQuery("decorationList", {
    selectFromResult: ({ data }) => ({
      deco: data?.entities[decoId]
    })
  });

  const navigate = useNavigate()
  const [senDel] = useDeleteDecorationMutation()

  const editClick = () => {
    navigate(`/adminDash/admin/product/bow/edit/${deco._id}`)
  }

  const deleteClick = async () => {
    await senDel({id : deco._id})
  }

  if (!deco || deco.category !== "Bow") {
    return null;
  }

  return (
    <Container className="mt-2">
      <Card style={{ width: '13rem', height: '22rem' }}>
        <Card.Img variant="top" src={`${deco.image}`} style={{ height: '50%', objectFit: 'cover' }} />
        
        <Card.Body style={{ height: '40%' }}>
          <Card.Title style={{ fontSize: '1rem', lineHeight: '1.2', 
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {deco.name}
          </Card.Title>
          
          <Card.Text>Price : {deco.price} ฿</Card.Text>
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
  
}

export default ManageBow;
