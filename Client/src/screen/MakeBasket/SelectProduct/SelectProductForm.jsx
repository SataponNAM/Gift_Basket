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

    const [selectedProduct, setSelectedProduct] = useState([])
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

    let FruitContent = null
    let DrinkContent = null
    let content = null
    
    useEffect(() => {
        console.log("Selected Fruit:", selectedFruit);
    }, [selectedFruit]);

    useEffect(() => {
        console.log("Selected Drink:", selectedDrink);
    }, [selectedDrink]);

    useEffect(() => {
        console.log("Selected Product:", selectedProduct);
    }, [selectedProduct]);

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
                        <Fruit productId={productId} selectedFruit={selectedFruit} 
                        setSelectedFruit={setSelectedFruit} />
                    </Col>
                ))}
            </Row>
        );

        // Render drink content
        DrinkContent = (
            <Row xs={1} md={3} className="g-2">
                {drinkIds.map(productId => (
                    <Col key={productId}>
                        <Drink productId={productId} selectedDrink={selectedDrink} 
                        setSelectedDrink={setSelectedDrink} />
                    </Col>
                ))}
            </Row>
        );
    }

    const [sumFruit, setSumFruit] = useState(0)
    const [sumDrink, setSumDrink] = useState(0)

    const calculateFruitTotal = () => {
        let fruitTotal = 0;
        selectedFruit.forEach((fruit) => {
            fruitTotal +=  fruit.price;
        });
        setSumFruit(fruitTotal);
    };

    const calculateDrinkTotal = () => {
        let drinkTotal = 0;
        selectedDrink.forEach((drink) => {
            drinkTotal +=  drink.price;
        });
        setSumDrink(drinkTotal);
    };

    const calculateTotal = () => {
        calculateFruitTotal();
        calculateDrinkTotal();
    };

    useEffect(() => {
        setSelectedProduct(selectedProductType === 'fruit' ? selectedFruit : selectedDrink);
        setNt(selectedProductType === 'fruit' ? sumFruit : sumDrink);
        calculateTotal();
    }, [selectedFruit, selectedDrink, selectedProductType, sumFruit, sumDrink]);

    const nextPage = () => {
        const selectedBasket = location.state.nextState.selectedBasket
        const selectedFlower = location.state.nextState.selectedFlower
        const selectedRibbon = location.state.nextState.selectedRibbon
        const selectedBow = location.state.nextState.selectedBow

        const nextState = { selectedBasket, selectedFlower, selectedRibbon, selectedBow, 
            selectedProduct, total: total + nt };
            
        navigate('/dash/makeBasket/card', { state: { nextState } })
    }

    const nextButton = (
        selectedProduct.length <= 0 ? (
            <Button className="mt-2 product-next-button" disabled>Next</Button>
        ) :
            (
                <Button className="mt-2 product-next-button" onClick={nextPage}>Next</Button>
            )
    )

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
                label="Beverage"
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
