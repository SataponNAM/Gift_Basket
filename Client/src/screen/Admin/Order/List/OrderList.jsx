import { Button, Container, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectAllOrder } from "../../../../slices/orderApiSlice";
import { useNavigate } from "react-router-dom";

function OrderListManage() {
    const orders = useSelector((state) => selectAllOrder(state));
    const navigate = useNavigate()

    const moreDetail = (orderId) => {
        navigate(`/adminDash/admin/order/orderDetail/${orderId}`)
    }

    // Sort orders by date created in descending order
    const sortedOrders = orders ? orders.sort((a, b) => new Date(b.created) - new Date(a.created)) : [];

    return (
        <Container>
            <h1 className="mt-3">Order List</h1>
            {sortedOrders.length > 0 ? (
                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date Created</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Deliver</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.created}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.status === 'open' ? "ยังไม่ชำระเงิน" : "ชำระเงินสำเร็จ"}</td>
                                <td>{order.isDeliver ? "Deliver" : "Not Deliver"}</td>
                                <td><Button size="sm" onClick={() => moreDetail(order._id)}>Detail</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Not found orders.</p>
            )}
        </Container>
    );
}

export default OrderListManage;
