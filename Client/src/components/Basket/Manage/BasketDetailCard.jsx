import { Card } from "react-bootstrap";
import { selectCardById } from "../../../slices/cardApiSlice";
import { selectDecorationById } from "../../../slices/decorationApiSlice";
import { selectProductById } from "../../../slices/productApiSlice";
import { selectBasketById } from "../../../slices/basketApiSlice";
import { useSelector } from "react-redux";

function BasketDetailCard({ giftbasket }) {
    console.log(giftbasket)
    const cardId = giftbasket.card;
    const card = useSelector((state) => selectCardById(state, cardId));

    const basket = useSelector((state) => selectBasketById(state, giftbasket.basket));
    const cardText = giftbasket.cardText;

    const decorationIds = giftbasket.decoration || [];
    const decorations = useSelector((state) => decorationIds.map(decoId => selectDecorationById(state, decoId)));

    const productIds = giftbasket.product || [];
    const products = useSelector((state) => productIds.map(proId => selectProductById(state, proId)));

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
                <Card.Text>Price : {Math.round(giftbasket.totalPrice)}</Card.Text>
            </Card.Body>
        </Card>
    );
}


export default BasketDetailCard;