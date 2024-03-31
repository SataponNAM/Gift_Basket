import { selectAllOrder } from '../../../slices/orderApiSlice'
import { useSelector } from "react-redux"
import './Home.css'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const orders = useSelector((state) => selectAllOrder(state));

    const filterOrders = orders?.filter(order => order.isDeliver == false)
    const newOD = filterOrders.length

    const navigate = useNavigate()

    const viewNewOrder = () =>{
        navigate('/adminDash/admin/order/neworder')
    }

    const newOrder = () => {
        return (
            <Card className='card-detail p-2'>
                <Card.Title className='c-header'>New Orders</Card.Title>
                <Card.Body>
                    <Card.Text>{newOD} Orders</Card.Text>
                </Card.Body>
                <Button className='button' onClick={viewNewOrder}>View</Button>
            </Card>
        )
    }

    const newOrdercontent = newOrder()

    return (
        <div className='wrap'>
            <div className='row'>
                <div className='col'>
                    {newOrdercontent}
                </div>
                <div className='col'>
                    
                </div>
                <div className='col'>
                    
                </div>
                <div className='col'>
                    
                </div>

            </div>
        </div>
    )
}

export default AdminHome