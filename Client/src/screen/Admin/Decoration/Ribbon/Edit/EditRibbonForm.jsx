import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react";
import { useUpdateDecorationMutation, selectDecorationById } from "../../../../../slices/decorationApiSlice";
import Base64Convert from "../../../../../hooks/Base64Convert";

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
        <Container>
            <h1>edit</h1>

            <Form className="mt-5" onSubmit={onSave}>
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
                    <Form.Label>สี</Form.Label>
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

export default EditFlower