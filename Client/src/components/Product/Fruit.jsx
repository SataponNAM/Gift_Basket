import { useGetProductQuery } from "../../slices/productApiSlice";
import { Container, Form, Image } from "react-bootstrap";
import { memo, useEffect } from 'react';

const Fruit = ({ productId, selectedFruit, setSelectedFruit, sumFruit, setSumFruit }) => {
    const { product } = useGetProductQuery("productList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        })
    });

    useEffect(() => {
        console.log(selectedFruit)
    }, [selectedFruit])

    const handleOnChange = (e) => {
        const { id, checked } = e.target;
    
        if (checked) {
            setSelectedFruit([...selectedFruit, id]);
            setSumFruit(sumFruit + product.price);
        } else {
            console.log(product.price)
            setSumFruit(sumFruit - product.price);
            setSelectedFruit(selectedFruit.filter((item) => item !== id));   
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
                </div>
            </Container>
        );
    } else {
        return null; // or render something else for non-Fruit products
    }
};

const memorized = memo(Fruit);

export default memorized;
