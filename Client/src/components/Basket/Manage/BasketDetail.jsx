import { Card, Container } from "react-bootstrap";
import { useGetGiftBasketQuery } from "../../../slices/giftBasketApiSlice";
import { selectCardById } from "../../../slices/cardApiSlice";
import { selectDecorationById } from "../../../slices/decorationApiSlice";
import { selectProductById } from "../../../slices/productApiSlice";
import { selectBasketById } from "../../../slices/basketApiSlice";
import { useSelector } from "react-redux";

function BasketDetail({ basketId }) {
    // Fetch gift basket data
    const { data: giftbasket, isLoading } = useGetGiftBasketQuery("giftBasketList", {
        selectFromResult: ({ data }) => ({
            giftbasket: data?.entities[basketId]
        })
    });

    // Define hooks at the top level
    const card = useSelector((state) => selectCardById(state, giftbasket?.card));
    const decorationIds = giftbasket?.decoration || [];
    const decorations = decorationIds.map(decoId => useSelector((state) => selectDecorationById(state, decoId)));
    const productIds = giftbasket?.product || [];
    const products = productIds.map(proId => useSelector((state) => selectProductById(state, proId)));
    const basket = useSelector((state) => selectBasketById(state, giftbasket?.basket));
    const cardText = giftbasket?.cardText;

    // If loading, display loading message
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If giftbasket is not found, display error message
    if (!giftbasket) {
        return <div>Gift basket not found</div>;
    }

    // Render UI with fetched data
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Text>Basket : {basket?.name}</Card.Text>
                <Card.Text>
                    Product :
                    {products.map((prod, index) => (
                        <span key={index} style={{ marginLeft: '13px' }}>
                            {prod?.name}
                        </span>
                    ))}
                </Card.Text>
                <Card.Text>
                    Decoration :
                    {decorations.map((deco, index) => (
                        <span key={index} style={{ marginLeft: '13px' }}>
                            {deco?.name}
                        </span>
                    ))}
                </Card.Text>
                <Card.Text>Card : {card?.name}</Card.Text>
                <Card.Text>Card Text : {cardText}</Card.Text>
                <Card.Text>Price : {giftbasket?.totalPrice}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BasketDetail;
