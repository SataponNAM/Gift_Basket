import { useGetProductQuery } from "../../slices/productApiSlice";
import { Container, Form, Card } from "react-bootstrap";
import { memo, useEffect } from 'react';

const Fruit = ({ productId, selectedFruit, setSelectedFruit }) => {
    const { product } = useGetProductQuery("productList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        })
    });

    const handleOnChange = (e) => {
        const { id, checked } = e.target;

        if (checked) {
            setSelectedFruit([...selectedFruit, product]);
        } else {
            setSelectedFruit(selectedFruit.filter((item) => item.id !== id));
        }
    };

    if (product && product.category === "Fruit") {
        return (
            <Container>
                <div className="mb-3">
                    <Form.Check
                        type="checkbox"
                        id={product.id}
                        value={product.price}
                        label={product.name}
                        onChange={handleOnChange}
                    />
                    <Card style={{ width: '6rem' }}>
                        <Card.Img src={product.image}></Card.Img>
                    </Card>
                </div>
            </Container>
        );
    } else {
        return null; // or render something else for non-Fruit products
    }
};

const memorized = memo(Fruit);

export default memorized;
