import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react";
import { useUpdateDecorationMutation, selectDecorationById } from "../../../../../slices/decorationApiSlice";
import Base64Convert from "../../../../../hooks/Base64Convert";

import '../../../global_admin.css'

function EditFlower() {
    const navigate = useNavigate()
    const { id } = useParams()
    const flower = useSelector((state) => selectDecorationById(state, id));

    const [sendUpdate] = useUpdateDecorationMutation()

    const [name, setName] = useState(flower ? flower.name : "")
    const [price, setPrice] = useState(flower ? flower.price : "")
    const [category, setCategory] = useState(flower ? flower.category : "")
    const [type, setType] = useState(flower ? flower.type : "")
    const [image, setImage] = useState(flower ? flower.image : "")

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
        //console.log(image)
    }

    const onSave = async (e) => {
        e.preventDefault()
        const result = await sendUpdate({ id, name, category, type, price, image })
        //console.log(result)

        navigate('/adminDash/admin/product/flower/flowerList')
    }

    return (
        <Container className="mt-2">
            <h1>Edit Flower</h1>

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

                <Container className="mt-5">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img src={image} />
                    </Card>
                </Container>

                <Button className="mt-5 button" type="submit">Save</Button>

            </Form>
        </Container>
    )
}

export default EditFlower