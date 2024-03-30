import { Container, Form, Button } from "react-bootstrap"
import { useState } from "react"
import Base64Convert from "../../../../hooks/Base64Convert"
import { useAddBasketMutation } from "../../../../slices/basketApiSlice"
import { useNavigate } from "react-router-dom"

import '../../global_admin.css'

function AddBasket() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    const [addBasket] = useAddBasketMutation()

    const navigate = useNavigate()

    const imageUploaded = async (e) => {
        const file = e.target.files[0];
        const im = await Base64Convert(file)
        setImage('data:image/webp;base64,' + im)
        console.log(image)
    }

    const onAdd = async (e) => {
        e.preventDefault()
        await addBasket({name, price, image})

        navigate('/adminDash/admin/product/basket/basketList')
    }

    return (
        <Container>
            <h1>Add Basket</h1>

            <Form onSubmit={onAdd}>
                <Form.Group>
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

export default AddBasket