import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCardById, useUpdateCardMutation } from "../../../../slices/cardApiSlice"; 
import { Button, Container, Form, Image } from "react-bootstrap";
import { useState } from "react";
import Base64Convert from "../../../../hooks/Base64Convert";

import '../../global_admin.css'

function EditCard() {
    const navigate = useNavigate()
    const { id } = useParams()
    const card = useSelector((state) => selectCardById(state, id));
    //console.log(card)

    const [name, setName] = useState(card ? card.name : "")
    const [price, setPrice] = useState(card ? card.price : "")
    const [color, setColor] = useState(card ? card.color : "")
    const [decoration, setDecoration] = useState(card ? card.decoration : "")
    const [image, setImage] = useState(card ? card.image : "")

    const [sendUpdate] = useUpdateCardMutation()

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
        //console.log(image)
    }

    const onSave = async (e) => {
        e.preventDefault()
        const result = await sendUpdate({ id, name, color, decoration, price, image })
        //console.log(result)

        navigate('/adminDash/admin/product/card/cardList')
    }

    return (
        <Container>
            <h1>Edit Card</h1>

            <Form className="mt-3" onSubmit={onSave}>
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

export default EditCard