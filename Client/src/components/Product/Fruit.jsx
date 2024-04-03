import { memo } from 'react';
import { useGetProductQuery } from "../../slices/productApiSlice";
import { Container, Card } from "react-bootstrap";

import '../item.css'

const Fruit = ({ productId, selectedFruit, setSelectedFruit }) => {
    const { product } = useGetProductQuery("productList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        })
    });

    const handleOnClick = () => {
        const isSelected = selectedFruit.some(item => item.id === product.id);
        if (isSelected) {
            setSelectedFruit(selectedFruit.filter(item => item.id !== product.id));
        } else {
            setSelectedFruit([...selectedFruit, product]);
        }
    };

    if (product && product.category === "Fruit") {
        const isSelected = selectedFruit.some(item => item.id === product.id);
        const cardStyle = {
            width: '16rem',
            height: '18rem',
            cursor: 'pointer',
            border: isSelected ? '3px solid #ffac6c' : '1px solid #c7c7c7',
        };


        return (
            <Container>
                <div className="mb-3">
                    <Card style={cardStyle} onClick={handleOnClick}>
                        <Card.Img variant="top" src={product.image}
                            style={{ height: '70%', objectFit: 'cover' }} />

                        <Card.Body style={{ height: '40%' }} className="item-card">
                            <Card.Title style={{
                                fontSize: '1rem', lineHeight: '1.2', overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                            }}>
                                {product.name}
                            </Card.Title>

                            <Card.Text>Price : {product.price} ฿</Card.Text>

                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    } else {
        return null;
    }
};

const memorized = memo(Fruit);

export default memorized;
