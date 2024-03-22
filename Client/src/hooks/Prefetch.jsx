import { store } from '../app/store.jsx'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../slices/userApiSlice.jsx';
import { addressApiSlice } from '../slices/addressApiSlice.jsx'
import { basketApiSlice } from '../slices/basketApiSlice.jsx';
import { decorationApiSlice } from '../slices/decorationApiSlice.jsx';
import { productApiSlice } from '../slices/productApiSlice.jsx';
import { cardApiSlice } from '../slices/cardApiSlice.jsx';
import { orderApiSlice } from '../slices/orderApiSlice.jsx';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const addresses = store.dispatch(addressApiSlice.endpoints.getAddress.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const basket = store.dispatch(basketApiSlice.endpoints.getBasket.initiate())
        const decoration = store.dispatch(decorationApiSlice.endpoints.getDecoration.initiate())
        const product = store.dispatch(productApiSlice.endpoints.getProduct.initiate())
        const card = store.dispatch(cardApiSlice.endpoints.getCard.initiate())
        const order = store.dispatch(orderApiSlice.endpoints.getOrder.initiate())

        return () => {
            console.log('unsubscribing')
            addresses.unsubscribe()
            users.unsubscribe()
            basket.unsubscribe()
            decoration.unsubscribe()
            product.unsubscribe()
            card.unsubscribe()
            order.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch