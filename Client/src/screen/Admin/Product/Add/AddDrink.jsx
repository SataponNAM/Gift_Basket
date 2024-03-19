import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddProductMutation } from "../../../../slices/productApiSlice";
import Base64Convert from "../../../../hooks/Base64Convert";

function AddDrink() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Drink")
    const [type, setType] = useState("")
    const [image, setImage] = useState("")

    const [addDrink] = useAddProductMutation()

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
        //console.log(image)
    }

    const onAdd = async (e) => {
        e.preventDefault()
        const result = await addDrink({ name, category, type, price, image })
        //console.log(result)

        navigate('/adminDash/admin/product/drink/drinkList')
    }
    
    return (
        <Container>
            <h1>Add Drink</h1>

            <Form className="mt-5" onSubmit={onAdd}>
                <Form.Group className="mt-3">
                    <Form.Label>ชื่อสินค้า</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>ราคา</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>แบรนด์</Form.Label>
                    <Form.Control
                        type="text"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>รูปภาพ</Form.Label>
                    <Form.Control
                        type="file"
                        accept='.jpeg, .png, .jpg'
                        onChange={imageUploaded}
                    />
                </Form.Group>

                <Button type="submit">Save</Button>

            </Form>
        </Container>
    )
}

export default AddDrink