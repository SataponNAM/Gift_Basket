import { Container, Form, Button } from "react-bootstrap"
import { useAddCardMutation } from "../../../../slices/cardApiSlice.jsx"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Base64Convert from "../../../../hooks/Base64Convert.jsx"

import '../../global_admin.css'

function AddCard() {
    const [AddCard] = useAddCardMutation()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [color, setColor] = useState("")
    const [decoration, setDecoration] = useState("")
    const [image, setImage] = useState("")

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
    }

    const onAdd = async (e) => {
        e.preventDefault()
        await AddCard({name, color, decoration, price, image})

        navigate('/adminDash/admin/product/card/cardList')
    }

    return (
        <Container>
            <h1>Add Card</h1>

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
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Decoration</Form.Label>
                    <Form.Control
                        type="text"
                        value={decoration}
                        onChange={e => setDecoration(e.target.value)}
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

export default AddCard