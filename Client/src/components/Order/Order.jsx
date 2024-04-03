import { memo } from 'react'
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
                <Card.Text className="m-2">Order Number : {order._id}</Card.Text>
                <Card.Text className="m-2">Transaction Date : {order.created}</Card.Text>
                <Card.Text className="m-2">Total Price : {Math.round(order.totalPrice)} ฿</Card.Text>
                <Card.Text className="m-2" style={{ color: order.status === 'open' ? 'red' : 'green' }}>
                  {order.status === 'open' ? "Payment Pending" : "Payment Completed"}
                </Card.Text>
            </Card>
        </Container>
    )
}

const memorized = memo(Order)

export default memorized