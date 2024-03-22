import { Button, Card, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectOrderById, useUpdateDeliverMutation } from "../../../../slices/orderApiSlice"
import { selectAddressById } from "../../../../slices/addressApiSlice"
import BasketDetail from "../../../../components/Basket/Manage/BasketDetail"

function OrderDetail() {
    const { id } = useParams()
    const order = useSelector((state) => selectOrderById(state, id))
    const address = useSelector((state) => selectAddressById(state, order.address))
    const basketId = order.product || []

    let basketContent
    if (basketId) {
        basketContent = basketId.map(basketID => <BasketDetail basketId={basketID} />)
    }

    const clickDeliver = async (e) =>{
        e.preventDefault()
        await useUpdateDeliverMutation({id})
    }

    return (
        <Container>
            <div className="mt-3">
                <h2>Product list</h2>
                {basketContent}
            </div>

            <div className="mt-3">
                <h2>Address</h2>
                <Card className="mt-2">
                    <Card.Body>
                        <Card.Text>{address.firstname} {address.lastname}</Card.Text>
                        <Card.Text>{address.address} {address.subdistrict} {address.district} {address.province} {address.postal}</Card.Text>
                        <Card.Text>{address.phone}</Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <div className="mt-3">
                <h4>Total Price : {order.totalPrice}</h4>
            </div>

            <div>
                <Button onClick={clickDeliver}>Deliver</Button>
            </div>

        </Container>
    )
}

export default OrderDetail