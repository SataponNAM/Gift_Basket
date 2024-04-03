import { useGetProductQuery, useDeleteProductMutation } from "../../../slices/productApiSlice";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageFruit = ({ drinkId }) => {
    const { product } = useGetProductQuery("productList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[drinkId]
        })
    })

    const navigate = useNavigate()
    const [senDel] = useDeleteProductMutation()

    const editClick = () => {
        navigate(`/adminDash/admin/product/fruit/edit/${product._id}`)
    }

    const deleteClick = async () => {
        await senDel({ id: product._id })
    }

    if (!product || product.category !== "Fruit") {
        return null;
    }

    return (
        <Container className="mt-2">
            <Card style={{ width: '13rem', height: '22rem' }}>
                <Card.Img variant="top" src={product.image} style={{ height: '50%', objectFit: 'cover' }} />

                <Card.Body style={{ height: '40%' }}>
                    <Card.Title style={{
                        fontSize: '1rem', lineHeight: '1.2',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                        {product.name}
                    </Card.Title>

                    <Card.Text>Price : {product.price} ฿</Card.Text>
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
    )

}


export default ManageFruit;