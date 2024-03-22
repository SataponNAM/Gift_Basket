import { Card, Container } from "react-bootstrap";
import { useGetGiftBasketQuery } from "../../../slices/giftBasketApiSlice";
import { selectCardById } from "../../../slices/cardApiSlice";
import { selectDecorationById } from "../../../slices/decorationApiSlice";
import { selectProductById } from "../../../slices/productApiSlice";
import { selectBasketById } from "../../../slices/basketApiSlice";
import { useSelector } from "react-redux";

function BasketDetail({ basketId }) {
    const { giftbasket } = useGetGiftBasketQuery("giftBasketList", {
        selectFromResult: ({ data }) => ({
            giftbasket: data?.entities[basketId]
        })
    });

    const card = useSelector((state) => selectCardById(state, giftbasket.card))

    const decorationId = giftbasket.decoration
    const decoration = decorationId.map(decoId => useSelector((state) => selectDecorationById(state, decoId)))

    const productId = giftbasket.product
    const product = productId.map(proId => useSelector((state) => selectProductById(state, proId)))

    const basket = useSelector((state) => selectBasketById(state, giftbasket.basket))
    const CardText = giftbasket.cardText

    //console.log(product)

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Text>Basket : {basket.name}</Card.Text>
                <Card.Text>
                    Product :
                    {product.map((prod, index) => (
                        <span key={index} style={{ marginLeft: '13px' }}>
                            {prod.name}
                        </span>
                    ))}
                </Card.Text>
                <Card.Text>
                    Decoration :
                    {decoration.map((deco, index) => (
                        <span key={index} style={{ marginLeft: '13px' }}>
                            {deco.name}
                        </span>
                    ))}
                </Card.Text>
                <Card.Text>Card : {card.name}</Card.Text>
                <Card.Text>Card Text : {CardText}</Card.Text>
                <Card.Text>Price : {giftbasket.totalPrice}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BasketDetail