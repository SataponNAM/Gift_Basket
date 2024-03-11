import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

import Payment from '../../components/Payment/Payment';

function Checkout() {
    const location = useLocation();
    console.log(location.state)

    return (
        <>
            <h1>checkout</h1>
            {/* Use the Elements component here if needed */}
            {/* <Elements stripe={stripePromise}> */}
            {/*    Your CheckoutForm or other components */}
            {/* </Elements> */}
        </>
    );
}

export default Checkout