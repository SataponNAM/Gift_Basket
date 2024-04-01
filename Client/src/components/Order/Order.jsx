import { memo, useEffect } from 'react'
import { useGetOrderQuery } from '../../slices/orderApiSlice'
import { Card, Container } from 'react-bootstrap'

function Order({ orderId }) {
    const { order } = useGetOrderQuery("orderList", {
        selectFromResult: ({ data }) => ({
            order: data?.entities[orderId]
        })
    })
    console.log(orderId)
    
    return (
        <Container>
            <Card className="m-5">
                <Card.Text className="m-2">Order Id {order._id}</Card.Text>
                <Card.Text className="m-2">Created Date {order.created}</Card.Text>
                <Card.Text className="m-2">Total Price {order.totalPrice}</Card.Text>
                <Card.Text className="m-2">{order.status == 'open' ? "Not yet paid" : "ชำระเงินสำเร็จ"}</Card.Text>
            </Card>
        </Container>
    )
}

const memorized = memo(Order)

export default memorized