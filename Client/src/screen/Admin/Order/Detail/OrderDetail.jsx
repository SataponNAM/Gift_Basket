import { Button, Card, Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectOrderById, useUpdateDeliverMutation } from "../../../../slices/orderApiSlice"
import { selectAddressById } from "../../../../slices/addressApiSlice"
import BasketDetail from "../../../../components/Basket/Manage/BasketDetail"

import './OrderDetail.css'
import '../../global_admin.css'

function OrderDetail() {
    const { id } = useParams();
    const [sendDeliver] = useUpdateDeliverMutation();
    const navigate = useNavigate();

    const order = useSelector((state) => selectOrderById(state, id));
    const address = useSelector((state) => selectAddressById(state, order?.address || ""));
    const basketId = order?.product || [];

    // Fetch basket details outside of JSX
    const basketContent = basketId.map((basketID) => {
        return <BasketDetail key={basketID} basketId={basketID} />;
    });

    const clickDeliver = async (e) => {
        e.preventDefault();
        await sendDeliver({ id });
        navigate('/adminDash/admin/order/orderListAdmin');
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
                        <Card.Text>{address?.firstname} {address?.lastname}</Card.Text>
                        <Card.Text>
                            {address?.address} {address?.subdistrict} {address?.district} {address?.province} {address?.postal}
                        </Card.Text>
                        <Card.Text>{address?.phone}</Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <div className="mt-3">
                <h4>Total Price : {Math.floor(order?.totalPrice)}</h4>
            </div>

            <div>
                <Button onClick={clickDeliver} className="delivery-button button">Deliver</Button>
            </div>
        </Container>
    );
}

export default OrderDetail;
