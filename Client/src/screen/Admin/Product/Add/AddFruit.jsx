import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddProductMutation } from "../../../../slices/productApiSlice";
import Base64Convert from "../../../../hooks/Base64Convert";

import '../../global_admin.css'

function AddFruit() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Fruit")
    const [type, setType] = useState("")
    const [image, setImage] = useState("")

    const [addFruit] = useAddProductMutation()

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
        //console.log(image)
    }

    const onAdd = async (e) => {
        e.preventDefault()
        const result = await addFruit({ name, category, type, price, image })
        //console.log(result)

        navigate('/adminDash/admin/product/fruit/fruitList')
    }
    
    return (
        <Container>
            <h1>Add Fruit</h1>

            <Form className="mt-3" onSubmit={onAdd}>
                <Form.Group className="mt-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Type of fruit</Form.Label>
                    <Form.Control
                        type="text"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept='.jpeg, .png, .jpg'
                        onChange={imageUploaded}
                    />
                </Form.Group>

                <Button className="mt-2 button" type="submit">Save</Button>

            </Form>
        </Container>
    )
}

export default AddFruit