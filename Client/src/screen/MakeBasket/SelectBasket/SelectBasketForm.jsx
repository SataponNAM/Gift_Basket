import { Container, Button, Row, Col } from 'react-bootstrap';
import Basket from '../../../components/Basket/Basket.jsx';
import { useGetBasketQuery } from '../../../slices/basketApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SelectBasketForm.css';

function SelectBasketForm() {
    const {
        data: basket,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBasketQuery('basketList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;
    let total;
    const [selectedBasket, setSelectedBasket] = useState(null);
    const navigate = useNavigate();

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = basket;

        let filteredIds;

        filteredIds = [...ids];
        content = (
            <Row xs={1} md={3} className="g-4">
                {ids?.length && filteredIds.map(basketId => (
                    <Col key={basketId}>
                        <Basket basketId={basketId} selectedBasket={selectedBasket} 
                        setSelectedBasket={setSelectedBasket} total={total} />
                    </Col>
                ))}
            </Row>
        );
    }

    console.log("Selected Basket:", selectedBasket);

    if (selectedBasket != null) {
        total = selectedBasket.price;
    } else {
        total = 0;
    }

    const nextState = { selectedBasket, total };

    const nextPage = () => {
        navigate('/dash/makeBasket/decoration', { state: { nextState } });
    };

    const nextButton = (
        selectedBasket === null ? (
            <Button className="mt-2 basket-next-button" disabled>Next</Button>
        ) :
            (
                <Button className="mt-2 basket-next-button" onClick={nextPage}>Next</Button>
            )
    );

    return (

        <Container className="all-basket-container">
            <h2>Select Basket</h2>

            <div className="basket-content">
                {content}
            </div>

            <Container>
                <p className="total-basket">Total : {total} ฿</p>
            </Container>

            {nextButton}
        </Container>
    );
}

export default SelectBasketForm;
