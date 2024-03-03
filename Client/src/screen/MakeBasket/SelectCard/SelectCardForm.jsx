import { Container, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CardCompo from '../../../components/Card/Card.jsx'
import { useGetCardQuery } from "../../../slices/cardApiSlice.jsx";

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

        content = ids?.length && filteredIds.map(cardId => <CardCompo key={cardId} cardId={cardId} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />)
    }

    const nextPage = () => {
        const selectedBasket = location.state.nextState.selectedBasket
        const selectedFlower = location.state.nextState.selectedFlower
        const selectedRibbon = location.state.nextState.selectedRibbon
        const selectedBow = location.state.nextState.selectedBow
        const selectedProduct = location.state.nextState.selectedProduct
        const state = location.state.nextState
        console.log(state)

        const nextState = { selectedBasket, selectedFlower, selectedRibbon, selectedBow, selectedProduct, selectedCard, cardText, total };

        navigate('/dash/makeBasket/giftbasket', { state: { nextState } })
    }

    const nextButton = (
        selectedCard === null ? (
            <Button className="mt-2" disabled>Next</Button>
        ) :
            (
                <Button className="mt-2" onClick={nextPage}>Next</Button>
            )
    )

    const writeCard = (e) => {
        setCardText(e.target.value)
        // console.log(cardText)
    }


    return (
        <Container>
            <h1>กรุณาเลือกรูปแบบการ์ดอวยพร</h1>

            <div>
                {content}
            </div>

            <div className="mt-3">
                <Form className="m-3">
                    <Form.Group>
                        <Form.Label>เขียนคำอวยพร</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder="คำอวยพร"
                            value={cardText}
                            onChange={writeCard}
                        />
                    </Form.Group>
                </Form>
            </div>

            <div>
                {nextButton}
            </div>
        </Container>
    )
}

export default SelectCardForm