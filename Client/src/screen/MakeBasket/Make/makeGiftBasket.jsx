import { Container, Button, Form } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useGetUsersQuery } from "../../../slices/userApiSlice.jsx";
import { useState, useRef, useEffect } from "react";
import { useAddGiftBasketMutation } from "../../../slices/giftBasketApiSlice.jsx";
import { useAddCartMutation } from "../../../slices/cartApiSlice.jsx";
import { useGetCartQuery, useUpdateCartMutation } from "../../../slices/cartApiSlice.jsx";

import './makeGiftBasket.css'

function makeBasket() {
    const location = useLocation()
    const navigate = useNavigate()
    let content
    const errRef = useRef()
    const [errorMessage, setErrorMessage] = useState('') // test เฉยๆ 
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
            const cartIds = ids?.filter(cartId => entities[cartId].user === user[0]);

            if (cartIds === undefined || cartIds.length === 0) {

                return null;
            }

            return cartIds;
        }

        return null;
    };

    let cartCheck = LoadCart()
    //console.log(cartCheck)

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
        <Button className="mt-2 add-to-cart" type="submit">Add to cart</Button>
    )

    return (
        <Container className="all-make-container">
            <h2>Gift Basket You Make</h2>

            <Container className="make-content">
                <p>
                    <span className="bold-text">Basket :</span> {basket.name}
                </p>
                <p>
                    <span className="bold-text">Flower :</span> {flower.name}
                </p>
                <p>
                    <span className="bold-text">Ribbon :</span> {ribbon.name}
                </p>
                <p>
                    <span className="bold-text">Bow :</span> {bow.name}
                </p>

                <p className="bold-text">Product :</p>
                {product.map(entity => (
                    <p key={entity.id}> - {entity.name}</p>
                ))}

                <p>
                    <span className="bold-text">Card Style:</span> {card.name}
                </p>
                <p>
                    <span className="bold-text">Text:</span> {cardText}
                </p>
                <p className="total-make">Total Price : {totalPrice} ฿</p>
            </Container>

            <Form onSubmit={addToCart}>
                {addToCartButton}
            </Form>



            <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>
        </Container>
    )
}

export default makeBasket