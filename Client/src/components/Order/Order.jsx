import { memo, useEffect } from 'react'
import { useGetOrderQuery } from '../../slices/orderApiSlice'
import { Card, Container } from 'react-bootstrap'

function Order({ orderId }) {
    const { order } = useGetOrderQuery("orderList", {
        selectFromResult: ({ data }) => ({
            order: data?.entities[orderId]
        })
    })

    if (order) {
        return (
            <Container>
                <Card className="m-5">
                    <Card.Text className="m-2">หมายเลขคำสั่งซื้อ {order._id}</Card.Text>
                    <Card.Text className="m-2">วันที่ทำรายการ {order.created}</Card.Text>
                    <Card.Text className="m-2">ราคารวม {order.totalPrice}</Card.Text>
                    <Card.Text className="m-2">{order.status == 'open' ? "ยังไม่ชำระเงิน" : "ชำระเงินสำเร็จ"}</Card.Text>
                </Card>
            </Container>
        )
    } else {
        return (
            <Container>
                <p>ไม่พบรายการคำสั่งซื้อ</p>
            </Container>
        )
    }

}

const memorized = memo(Order)

export default memorized