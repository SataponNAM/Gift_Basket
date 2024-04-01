import { Button, Container, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectAllOrder } from "../../../../slices/orderApiSlice";
import { useNavigate } from "react-router-dom";
import '../List/orderlist.css'

function NewOrder() {
    const orders = useSelector((state) => selectAllOrder(state));
    const navigate = useNavigate()

    const moreDetail = (orderId) => {
        navigate(`/adminDash/admin/order/orderDetail/${orderId}`)
    }

    const filterOrders = orders?.filter(order => order.isDeliver == false)
    // Sort orders by date created in descending order
    const sortedOrders = filterOrders ? filterOrders.sort((a, b) => 
                         new Date(b.created) - new Date(a.created)) : [];

    return (
        <Container>
            <div className="header-container">
                <h1 className="mt-3">New Orders</h1>
            </div>

            {sortedOrders.length > 0 ? (
                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date Created</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Delivery</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.created}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.status === 'open' ? "Payment Pending" : "Payment Completed"}</td>
                                <td>{order.isDeliver ? "Yes" : "No"}</td>
                                <td><Button size="sm" onClick={() => moreDetail(order._id)} 
                                     className="detail-button">Detail</Button></td>
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

export default NewOrder;
