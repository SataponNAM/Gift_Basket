import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckoutMutation } from '../../slices/orderApiSlice.jsx';
import { useGetUsersQuery } from '../../slices/userApiSlice.jsx';
import { useGetCartQuery, useDeleteCartProductMutation } from '../../slices/cartApiSlice.jsx';
import useAuth from '../../hooks/useAuth.jsx';

import { Button } from 'react-bootstrap';

function Checkout() {
    const location = useLocation();
    const addressID = location.state.selectAddress
    const productIds = location.state.basketId
    const user = location.state.user[0]
    const totalPrice = location.state.totalPrice
    const navigate = useNavigate()
    //console.log(totalPrice)
    const { email, isAdmin } = useAuth()

    const [checkout] = useCheckoutMutation()
    const [deleteBasket] = useDeleteCartProductMutation()

    const LoadUser = () => {
        const {
            data: users,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetUsersQuery('usersList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })

        if (isSuccess) {
            const { ids, entities } = users

            const filteredIds = ids?.filter(userId => entities[userId].email === email)

            return filteredIds
        }
    }

    const userId = LoadUser()

    const LoadCart = () => {
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

        if (isSuccess) {
            const { ids, entities } = cart

            const filteredIds = ids?.filter(cartId => entities[cartId].user === userId[0])

            return filteredIds
        }
    }

    const cartId = LoadCart()
    //console.log(cartId)
    const placeorder = async () => {
        

        const result = await checkout({ user, productIds, totalPrice, address: addressID })
        console.log(result)

        for(const giftBasketId of productIds){
            await deleteBasket({id: cartId, giftBasketId})
        }

        //console.log(result)
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