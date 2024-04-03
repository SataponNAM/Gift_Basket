import { Button, Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.jsx'
import { useGetCartQuery } from '../../slices/cartApiSlice.jsx'
import { useGetUsersQuery } from '../../slices/userApiSlice.jsx'
import { useGetGiftBasketQuery } from '../../slices/giftBasketApiSlice.jsx'
import Cart from '../../components/Cart/Cart.jsx'

import './CartList.css'

function CartList() {
    let content
    let newTotal = 0
    const { email, isAdmin } = useAuth()
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)

    const makePayment = async () => {
        // go to choose address
        navigate('/dash/order/selectaddress', { state: { basketId, totalPrice: total } })
    }

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

    const {
        data: giftbaskets,
        isGBLoading,
        isSuccess: isGBSuccess,
        isGBError,
        GBerror
    } = useGetGiftBasketQuery('giftbasketList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    useEffect(() => {
        if (isSuccess && isGBSuccess) {
            const { ids, entities } = cart
            const { entities: gb } = giftbaskets;

            const filterData = ids?.filter(cartId => entities[cartId].user === userId[0]).map(cartId => entities[cartId])
            const filterUnwrap = filterData[0]

            if (filterUnwrap && filterUnwrap.giftBasket.length > 0) {
                basketId = filterUnwrap.giftBasket;
                buttonPayment = (<Button onClick={makePayment} className="buy-button">Buy</Button>)

                newTotal = 0
                basketId?.forEach(basketID => {
                    newTotal += gb[basketID].totalPrice
                    console.log(newTotal)
                });

                setTotal(newTotal)
            } else {
                setTotal(0)
            }
        }
    }, [cart, giftbaskets])

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    let basketId
    let buttonPayment

    if (isSuccess) {
        const { ids, entities } = cart

        const filteredIds = ids?.filter(cartId => entities[cartId].user === userId[0])
        const filterData = ids?.filter(cartId => entities[cartId].user === userId[0]).map(cartId => entities[cartId])

        if (filterData && filterData.length > 0 && filterData[0].giftBasket.length > 0) {
            basketId = filterData[0].giftBasket;
            buttonPayment = (<Button onClick={makePayment} className="buy-button">Buy</Button>)

            content = ids?.length && filteredIds.map(cartId => <Cart key={cartId} cartId={cartId} />)
        } else {
            content = (<p className="nopro">You Don't Have Products In Cart</p>)
            buttonPayment = (<Button className="buy-button" onClick={makePayment} disabled>Buy</Button>)
        }
    }

    return (

        <Container className="all-container">
            <h1>Cart</h1>
            <div className="content">
                {content}
            </div>
            <Container className='buy-container'>
                <p>Total : {total.toFixed(2)} ฿</p>
                {buttonPayment}
            </Container>

        </Container>

    )
}

export default CartList
