import { useEffect, useState } from "react"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Payment() {
    const stripePromise = loadStripe('pk_test_51OrKbbGNei92Ts0qNlugGio9JkhG99UbDLGQzSNh0LnT0IkcHyYYf5mI3uTYN7DILEcDVTv1TLdEAmZK2PuNVdaz00aBTtf1IS');

    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
}

export default Payment