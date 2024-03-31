import { useGetProductQuery } from "../../slices/productApiSlice"
import { Container, Image, Form, Card } from "react-bootstrap";
import { memo } from 'react';

const Drink = ({ productId, selectedDrink, setSelectedDrink }) => {
    const { product } = useGetProductQuery("productList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        })
    })

    const handleOnChange = (e) => {
        const { id, checked } = e.target;
    
        if (checked) {
            setSelectedDrink([...selectedDrink, product]);
        } else {
            setSelectedDrink(selectedDrink.filter((item) => item.id !== id));
        }
    };

    if (product && product.category === "Drink") {
        return (
            <>
                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                            type={type}
                            id={product.id}
                            value={product.price}
                            label={product.name}
                            onChange={handleOnChange}
                        />
                        <Card style={{ width: '6rem' }}>
                            <Card.Img src={product.image}></Card.Img>
                        </Card>
                    </div>
                ))}
            </>
        )
    }
}

const memorized = memo(Drink);

export default memorized;