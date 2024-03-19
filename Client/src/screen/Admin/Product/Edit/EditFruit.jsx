import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useState } from "react";
import { selectProductById, useUpdateProductMutation } from "../../../../slices/productApiSlice";
import Base64Convert from "../../../../hooks/Base64Convert";

function EditFruit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const drink = useSelector((state) => selectProductById(state, id));

    const [name, setName] = useState(drink ? drink.name : "")
    const [price, setPrice] = useState(drink ? drink.price : "")
    const [category, setCategory] = useState(drink ? drink.category : "")
    const [type, setType] = useState(drink ? drink.type : "")
    const [image, setImage] = useState(drink ? drink.image : "")

    const [sendUpdate] = useUpdateProductMutation()

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

        navigate('/adminDash/admin/product/fruit/fruitList')
    }
    
    return (
        <Container>
            <h1>Edit Fruit</h1>

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
                    <Form.Label>ประเภทผลไม้</Form.Label>
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

export default EditFruit