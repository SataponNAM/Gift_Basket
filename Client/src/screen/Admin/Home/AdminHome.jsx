import { selectAllOrder } from '../../../slices/orderApiSlice'
import { useSelector } from "react-redux"
import './Home.css'
import { Card } from 'react-bootstrap';

function AdminHome() {
    const orders = useSelector((state) => selectAllOrder(state));

    const filterOrders = orders?.filter(order => order.isDeliver == false)
    const newOD = filterOrders.length

    const newOrder = () => {
        return (
            <Card className='card-detail p-2'>
                <Card.Title className='c-header'>New Orders</Card.Title>
                <Card.Body>
                    <Card.Text>{newOD} Orders</Card.Text>
                </Card.Body>
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