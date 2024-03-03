import { useGetProductQuery } from "../../slices/productApiSlice"
import { Container, Image, Card, CardBody, Form } from "react-bootstrap";
import { memo } from 'react';

const Drink = ({ productId, selectedDrink, setSelectedDrink, sumDrink, setSumDrink }) => {
    const { product } = useGetProductQuery("productList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        })
    })

    const handleOnChange = (e) => {
        const { value, checked } = e.target;
    
        // console.log(`${value} is ${checked}`);
    
        if (checked) {
            setSelectedDrink([...selectedDrink, value]);
        } else {
            setSelectedDrink(selectedDrink.filter((item) => item !== value));
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
                            value={product.id}
                            label={product.name}
                            onChange={handleOnChange}
                        />
                    </div>
                ))}
            </>
        )
    }
}

const memorized = memo(Drink);

export default memorized;