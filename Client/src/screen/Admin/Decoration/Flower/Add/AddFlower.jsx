import { Container, Form, Button } from "react-bootstrap"
import { useState } from "react"
import Base64Convert from "../../../../../hooks/Base64Convert"
import { useNavigate } from "react-router-dom"
import { useAddDecorationMutation } from "../../../../../slices/decorationApiSlice"

import '../../../global_admin.css'

function AddFlower() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Flower")
    const [type, setType] = useState("")
    const [image, setImage] = useState("")

    const [addFlower] = useAddDecorationMutation()

    const navigate = useNavigate()

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
    }

    const onAdd = async (e) => {
        e.preventDefault()
        await addFlower({name, category, type, price, image})

        navigate('/adminDash/admin/product/flower/flowerList')
    }

    return (
        <Container>
            <h1>Add Flower</h1>

            <Form onSubmit={onAdd}>
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
                    <Form.Label>Color</Form.Label>
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

export default AddFlower