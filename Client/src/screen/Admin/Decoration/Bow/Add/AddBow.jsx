import { Container, Form, Button } from "react-bootstrap"
import { useState } from "react"
import Base64Convert from "../../../../../hooks/Base64Convert"
import { useNavigate } from "react-router-dom"
import { useAddDecorationMutation } from "../../../../../slices/decorationApiSlice"

function AddBow() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Bow")
    const [type, setType] = useState("")
    const [image, setImage] = useState("")

    const [AddBow] = useAddDecorationMutation()

    const navigate = useNavigate()

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
    }

    const onAdd = async (e) => {
        e.preventDefault()
        await AddBow({name, category, type, price, image})

        navigate('/adminDash/admin/product/bow/bowList')
    }

    return (
        <Container>
            <h1>add</h1>

            <Form onSubmit={onAdd}>
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

export default AddBow