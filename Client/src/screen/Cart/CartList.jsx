import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.jsx'
import { useGetCartQuery } from '../../slices/cartApiSlice.jsx'

function Cart () {
    let content
    const { email, isAdmin } = useAuth()
    const navigate = useNavigate()

    const {
        data: cart,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCartQuery('cartList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    if(isLoading) content = <p>Loading...</p>

    if(isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if(isSuccess){
        const { ids, entities } = cart

        console.log(cart)

        // let filteredIds
        // if (isAdmin) {
        //     filteredIds = [...ids]
        // } else {
        //     filteredIds = ids?.filter(addressId => entities[addressId].email === email)
        // }

        //content = ids?.length && filteredIds.map(addressId => <Address key={addressId} addressId={addressId} />)
    }

    return (
        <Container>
            <h1>Cart</h1>
        </Container>
    )
}

export default Cart