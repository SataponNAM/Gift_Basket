import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CardCompo from '../../../components/Card/Card.jsx'
import { useGetCardQuery } from "../../../slices/cardApiSlice.jsx";

import './SelectCardForm.css'

function SelectCardForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [total, setTotal] = useState(location.state.nextState.total)

    const {
        data: product,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCardQuery('cardList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const [selectedCard, setSelectedCard] = useState(null)
    const [cardText, setCardText] = useState("")
    let content = null

    if (isLoading) {
        content = <p>Loading...</p>
    }

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = product

        let filteredIds

        filteredIds = [...ids]

        content = (
            <Row xs={1} md={3} className="g-4">
                {ids?.length && filteredIds.map(cardId => (
                    <Col key={cardId}>
                        <CardCompo cardId={cardId} selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard} total={total} setTotal={setTotal} />
                    </Col>
                ))}
            </Row>
        );
    }

    const nextPage = () => {
        const selectedBasket = location.state.nextState.selectedBasket
        const selectedFlower = location.state.nextState.selectedFlower
        const selectedRibbon = location.state.nextState.selectedRibbon
        const selectedBow = location.state.nextState.selectedBow
        const selectedProduct = location.state.nextState.selectedProduct
        const state = location.state.nextState
        console.log(state)

        const nextState = {
            selectedBasket, selectedFlower, selectedRibbon, selectedBow,
            selectedProduct, selectedCard, cardText, total
        };

        navigate('/dash/makeBasket/giftbasket', { state: { nextState } })
    }

    const nextButton = (
        selectedCard === null || cardText.length <= 0 ? (
            <Button className="mt-2 card-next-button" disabled>Next</Button>
        ) :
            (
                <Button className="mt-2 card-next-button" onClick={nextPage}>Next</Button>
            )
    )

    const writeCard = (e) => {
        setCardText(e.target.value)
    }


    return (
        <Container className="all-card-container">
            <h2>Select Card Style</h2>

            <div className='card-content'>
                {content}
            </div>

            <div className="card-write-text">
                <Form className="m-3">
                    <Form.Group>
                        <Form.Label>Write Something :</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            type="text"
                            placeholder="To..."
                            value={cardText}
                            onChange={writeCard}
                            className="card-form"
                        />
                    </Form.Group>
                </Form>
            </div>

            <Container className='total-card'>
                <p>Total : {total} ฿</p>

                {nextButton}
            </Container>
        </Container>
    )
}

export default SelectCardForm