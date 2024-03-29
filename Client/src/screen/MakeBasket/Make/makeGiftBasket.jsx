import { Container, Button, Form } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useGetUsersQuery } from "../../../slices/userApiSlice.jsx";
import { useGetProductQuery } from "../../../slices/productApiSlice.jsx";
import { useState, useRef, useEffect } from "react";
import { useAddGiftBasketMutation } from "../../../slices/giftBasketApiSlice.jsx";
import { useAddCartMutation } from "../../../slices/cartApiSlice.jsx";
import { useGetCartQuery, useUpdateCartMutation } from "../../../slices/cartApiSlice.jsx";

function makeBasket() {
    const location = useLocation()
    const navigate = useNavigate()
    let content
    const errRef = useRef()
    const [errorMessage, setErrorMessage] = useState('Err') // test เฉยๆ 
    const errClass = errorMessage ? "errmsg" : "offscreen"

    const basket = location.state.nextState.selectedBasket
    const flower = location.state.nextState.selectedFlower
    const ribbon = location.state.nextState.selectedRibbon
    const bow = location.state.nextState.selectedBow
    const product = location.state.nextState.selectedProduct
    const card = location.state.nextState.selectedCard
    const cardText = location.state.nextState.cardText
    const total = location.state.nextState.total
    const totalPrice = Number(total)

    const { email, isAdmin } = useAuth()

    const LoadUser = () => {
        // User Id
        const {
            data: users,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetUsersQuery('usersList', {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })

        if (isLoading) content = <p>Loading...</p>

        if (isError) {
            content = <p className='errmsg'>{error?.data?.message}</p>
        }

        if (isSuccess) {
            const { ids, entities } = users

            const filteredIds = ids?.filter(usersId => entities[usersId].email === email)

            return filteredIds
        }
    }

    const LoadProductData = () => {
        // Product data
        const {
            data: productData,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetProductQuery('productList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })

        if (isLoading) content = <p>Loading...</p>

        if (isError) {
            content = <p className='errmsg'>{error?.data?.message}</p>
        }

        if (isSuccess) {
            const { ids, entities } = productData

            const productIds = ids?.filter(productId => product.includes(entities[productId].id)).map(productId => entities[productId])

            return productIds
        }
    }

    const LoadProductId = () => {
        // Product data
        const {
            data: productData,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetProductQuery('productList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })

        if (isLoading) content = <p>Loading...</p>

        if (isError) {
            content = <p className='errmsg'>{error?.data?.message}</p>
        }

        if (isSuccess) {
            const { ids, entities } = productData

            const productIds = ids?.filter(productId => product.includes(entities[productId].id))

            return productIds
        }
    }

    const LoadDecoration = () => {
        const decoration = []

        if (flower !== null) {
            decoration.push(flower.id)
        }
        if (ribbon !== null) {
            decoration.push(ribbon.id)
        }
        if (bow !== null) {
            decoration.push(bow.id)
        }

        return decoration
    }

    const user = LoadUser()
    const productData = LoadProductData()
    const productIds = product.map(product => product.id);
    const decoration = LoadDecoration()

    const [addGiftBasket, { isloading }] = useAddGiftBasketMutation()
    const [addCart] = useAddCartMutation()
    const [updateCart] = useUpdateCartMutation()

    const LoadCart = () => {
        const {
            data: cart,
            isLoading,
            isSuccess,
            isError,
            error,
            refetch
        } = useGetCartQuery('cartList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });
    
        if (isLoading) content = <p>Loading...</p>;
    
        if (isError) {
            content = <p className='errmsg'>{error?.data?.message}</p>;
        }
    
        if (isSuccess) {
            const { ids, entities } = cart;
            const cartIds = ids?.filter(cartId => entities[cartId].user === user);
    
            if (cartIds === undefined || cartIds.length === 0) {

                return null;
            }
    
            return cartIds;
        }
    
        return null;
    };

    let cartCheck = LoadCart()

    const addToCart = async (e) => {
        e.preventDefault();

        try {
            const result = await addGiftBasket({
                user,
                basket: basket.id,
                decoration,
                product: productIds,
                card: card.id,
                cardText,
                totalPrice: totalPrice,
            });

            const createdGiftBasketId = result.data.id;

            if (!cartCheck) {
                // If no cart is found (user don't have cart), create a new 
                await addCart({ giftbasket: [createdGiftBasketId], user });
            } else {
                console.log("Cart found. Updating the existing one.");
                await updateCart({ id: cartCheck, giftbasket: createdGiftBasketId, user });
            }
            navigate('/dash/cart')
        } catch (err) {
            console.error(err);
            if (!err.response) {
                setErrorMessage('No server response');
            } else if (err.response.status === 400) {
                setErrorMessage('Invalid gift basket data received.');
            } else if (err.response.status === 201) {
                setErrorMessage('New gift basket is created.');
            } else {
                setErrorMessage(err.response.data?.message);
            }
            errRef.current.focus();
        }
    };


    const addToCartButton = (
        <Button className="mt-2" type="submit">Add to cart</Button>
    )

    return (
        <Container>
            <h1>Make</h1>

            <Container>
                <p>{basket.name}</p>
                <p>{flower.name}</p>
                <p>{ribbon.name}</p>
                <p>{bow.name}</p>
                {productData.map(entity => (
                    <li key={entity.id}>{entity.name}</li>
                ))}
                <p>{card.name}</p>
                <p>{cardText}</p>
                <p>ราคารวม : {totalPrice} บาท</p>
            </Container>
            <Form onSubmit={addToCart}>
                {addToCartButton}
            </Form>



            <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>
        </Container>
    )

}

export default makeBasket