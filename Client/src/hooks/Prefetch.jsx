import { store } from '../app/store.jsx'
import { userApiSlice } from '../slices/userApiSlice.jsx';
import { addressApiSlice } from '../slices/addressApiSlice.jsx'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const addresses = store.dispatch(addressApiSlice.endpoints.getAddress.initiate())
        const users = store.dispatch(userApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            addresses.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch