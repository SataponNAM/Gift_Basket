import { memo } from 'react';
import { Button, Container, Card, Form} from "react-bootstrap";
import { useGetCartQuery, useDeleteCartProductMutation } from "../../slices/cartApiSlice";
import { useGetGiftBasketQuery } from "../../slices/giftBasketApiSlice";
import { useGetBasketQuery } from "../../slices/basketApiSlice";
import { useGetProductQuery } from "../../slices/productApiSlice";
import { useGetDecorationQuery } from "../../slices/decorationApiSlice";
import { useGetCardQuery } from "../../slices/cardApiSlice";
import "./Cart.css"

const Cart = ({ cartId }) => {
    const { cart } = useGetCartQuery("cartList", {
        selectFromResult: ({ data }) => ({
            cart: data?.entities[cartId]
        })
    });
    const cartGift = cart.giftBasket;

    const {
        data: giftbasket,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetGiftBasketQuery('giftbasketList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const {
        data: basketData,
        isLoading: basketIsLoading,
        isSuccess: basketIsSuccess,
        isError: basketIsError,
        error: basketError
    } = useGetBasketQuery('basketList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const {
        data: decorationData,
        isLoading: decorationIsLoading,
        isSuccess: decorationIsSuccess,
        isError: decorationIsError,
        error: decorationError
    } = useGetDecorationQuery('decorationList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const {
        data: productData,
        isLoading: productIsLoading,
        isSuccess: productIsSuccess,
        isError: productIsError,
        error: productError
    } = useGetProductQuery('productList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const {
        data: cardData,
        isLoading: cardIsLoading,
        isSuccess: cardIsSuccess,
        isError: cardIsError,
        error: cardError
    } = useGetCardQuery('cardList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [sendDel] = useDeleteCartProductMutation()

    // send id of giftbast to this function
    const deleteOnclick = async (e) => {
        const giftBasketId = e.target.value
        await sendDel({ id: cartId, giftBasketId })
    }

    let content;

    if (isLoading || basketIsLoading || decorationIsLoading) {
        content = <p>Loading...</p>;
    }

    if (isError || basketIsError || decorationIsError) {
        content = <p className="errmsg">{error?.data?.message || basketError?.data?.message}</p>;
    }

    if (isSuccess && basketIsSuccess && decorationIsSuccess) {
        const { ids, entities } = giftbasket;

        const filteredGiftBasketItems = ids?.filter(giftBasketId => cartGift
            .includes(entities[giftBasketId].id))
            .map(giftBasketId => entities[giftBasketId]);
        const giftBasket = filteredGiftBasketItems;

        if (giftBasket) {

            content = (
                <Form.Group>
                    {giftBasket.map((item, index) => (
                        <div key={item.id} className="m-3 p-3" >
                            <Card >
                                <div className="m-3">
                                    <Card.Text>
                                        Basket : {basketData?.entities[item.basket]?.name}
                                    </Card.Text>

                                    <Card.Text>
                                        Decorations : {item.decoration.map(decorationId => 
                                        decorationData?.entities[decorationId]?.name).join(', ')}
                                    </Card.Text>

                                    <Card.Text>
                                        Products : {item.product.map(productId => 
                                        productData?.entities[productId]?.name).join(', ')}
                                    </Card.Text>

                                    <Card.Text>
                                        Card : {cardData?.entities[item.card]?.name}
                                    </Card.Text>

                                    <Card.Text>
                                        Card Text : {item.cardText}
                                    </Card.Text>

                                    <Card.Text>
                                        Total Price : {item.totalPrice} ฿
                                    </Card.Text>
                                </div>

                                <div>
                                    <Button value={item.id} 
                                        variant="outline-danger"
                                        size="sm" className=" 
                                        button-block m-3" 
                                        onClick={deleteOnclick}>
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    ))}
                </Form.Group>
            );
        } else {
            content = (
                <Container>
                    <p>No cart found.</p>
                </Container>
            );
        }
    } else {
        return null;
    }

    return content;
};

const memorized = memo(Cart);

export default memorized;
