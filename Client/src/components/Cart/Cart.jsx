import { useNavigate } from "react-router-dom"
import { memo, useEffect } from 'react'
import { Button, Container, Card } from "react-bootstrap"
import { useGetCartQuery } from "../../slices/cartApiSlice"
import { useGetGiftBasketQuery } from "../../slices/giftBasketApiSlice"

const Cart = ({ cartId }) => {
    const { cart } = useGetCartQuery("cartList", {
        selectFromResult: ({ data }) => ({
            cart: data?.entities[cartId]
        })
    })

    const navigate = useNavigate()

    return (
        <Container>
            <Card>
                <Card.Text>{cart.id}</Card.Text>
            </Card>
        </Container>
    )
}

const memorized = memo(Cart)

export default memorized