import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckoutMutation } from '../../slices/orderApiSlice.jsx';

import { Button } from 'react-bootstrap';

function Checkout() {
    const location = useLocation();
    const addressID = location.state.selectAddress
    const productIds = location.state.basketId
    const user = location.state.user[0]
    const totalPrice = location.state.totalPrice
    const navigate = useNavigate()
    //console.log(totalPrice)

    const [checkout] = useCheckoutMutation()

    const placeorder = async () => {
        console.log("placeorder")

        const result = await checkout({ user, productIds, totalPrice, address: addressID })

        console.log(result)
        window.location.href = result.data.url
    }

    return (
        <>
            <h1>checkout</h1>
            <div>
                {/* ข้อมูลชอง ราคา ที่อยู่ */}
            </div>

            <Button onClick={placeorder}>ชำระเงิน</Button>
        </>
    );
}

export default Checkout