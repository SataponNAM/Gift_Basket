import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Fruit from '../../../components/Product/Fruit.jsx'
import Drink from '../../../components/Product/Drink.jsx'
import { useGetProductQuery } from "../../../slices/productApiSlice";

import './SelectProductForm.css'

function SelectProductForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [total, setTotal] = useState(location.state.nextState.total)
    const [nt, setNt] = useState(0)
    const [selectedProductType, setSelectedProductType] = useState(null);
    const [disableFruit, setDisableFruit] = useState(true);
    const [disableDrink, setDisableDrink] = useState(true);

    const {
        data: product,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductQuery('productList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const [selectedFruit, setSelectedFruit] = useState([])
    const [selectedDrink, setSelectedDrink] = useState([])

    useEffect(() => {
        if (selectedProductType === 'fruit') {
            setDisableFruit(false);
            setDisableDrink(true);
        } else if (selectedProductType === 'drink') {
            setDisableFruit(true);
            setDisableDrink(false);
        } else {
            setDisableFruit(true);
            setDisableDrink(true);
        }
    }, [selectedProductType]);

    const handleProductTypeChange = (type) => {
        setSelectedProductType(type);
    }

    const navigateToNextPage = () => {
        const nextState = { ...location.state.nextState, selectedFruit, selectedDrink, total: total + nt };
        navigate('/dash/makeBasket/card', { state: { nextState } })
    }

    const nextButton = (
        selectedProductType && (selectedFruit.length > 0 || selectedDrink.length > 0) ? (
            <Button className="mt-2 product-next-button" onClick={navigateToNextPage}>Next</Button>
        ) :
            (
                <Button className="mt-2 product-next-button" disabled>Next</Button>
            )
    )

    let FruitContent = null
    let DrinkContent = null
    let content = null

    if (isLoading) {
        content = <p>Loading...</p>
    }

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = product;

        // Filter out products that are fruits
        const fruitIds = ids.filter(productId => entities[productId]?.category === "Fruit");

        // Filter out products that are drinks
        const drinkIds = ids.filter(productId => entities[productId]?.category === "Drink");

        // Render fruit content
        FruitContent = (
            <Row xs={1} md={3} className="g-2">
                {fruitIds.map(productId => (
                    <Col key={productId}>
                        <Fruit productId={productId} selectedFruit={selectedFruit} setSelectedFruit={setSelectedFruit} />
                    </Col>
                ))}
            </Row>
        );

        // Render drink content
        DrinkContent = (
            <Row xs={1} md={3} className="g-2">
                {drinkIds.map(productId => (
                    <Col key={productId}>
                        <Drink productId={productId} selectedDrink={selectedDrink} setSelectedDrink={setSelectedDrink} />
                    </Col>
                ))}
            </Row>
        );
    }

    const calculateTotal = () => {
        const sumFruit = selectedFruit.reduce((total, fruit) => total + fruit.price, 0);
        const sumDrink = selectedDrink.reduce((total, drink) => total + drink.price, 0);
        setNt(selectedProductType === 'fruit' ? sumFruit : sumDrink);
    };

    useEffect(() => {
        calculateTotal();
    }, [selectedFruit, selectedDrink, selectedProductType]);

    return (
        <Container className="all-product-container">
            <h2>Select Product</h2>

            <Container>
                {content}
            </Container>

            <div className="product-content">

            <div className="custom-radio">
            <Form.Check
                type="radio"
                label="Fruit"
                name="productType"
                id="fruit"
                onChange={() => handleProductTypeChange('fruit')}
                className="product-radio"
            />
            </div>

            <Container className={disableFruit ? 'disabled-content' : ''}>
                <div className="in-product-content">
                {FruitContent}
                </div>
            </Container>

            <div className="custom-radio">
            <Form.Check
                type="radio"
                label="Drink"
                name="productType"
                id="drink"
                onChange={() => handleProductTypeChange('drink')}
                className="product-radio"
            />
            </div>

            <Container className={disableDrink ? 'disabled-content' : ''}>
            <div className="in-product-content">
                {DrinkContent}
                </div>
            </Container>

            </div>

            <div className="total-product">
                <p>Total : {total + nt} ฿</p>
            </div>

            {nextButton}
        </Container>
    )
}

export default SelectProductForm;
