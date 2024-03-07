import { Button, Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.jsx'
import { useGetCartQuery } from '../../slices/cartApiSlice.jsx'
import { useGetUsersQuery } from '../../slices/userApiSlice.jsx'
import Cart from '../../components/Cart/Cart.jsx'

function CartList() {
    let content
    const { email, isAdmin } = useAuth()
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)

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

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = cart

        const filteredIds = ids?.filter(cartId => entities[cartId].user === userId[0])

        //console.log(entities)

        content = ids?.length && filteredIds.map(cartId => <Cart key={cartId} cartId={cartId} total={total} setTotal={setTotal} />)
    }

    return (
        <>
            <Container>
                <h1>Cart</h1>
                <Container>
                    <Form>
                        {content}
                    </Form>
                </Container>

                <Container>
                    <p>ราคารวม : {total} บาท</p>
                    <Button>ซื้อสินค้า</Button>
                </Container>

            </Container>
        </>
    )
}

export default CartList