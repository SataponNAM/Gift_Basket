import { Container, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Fruit from '../../../components/Product/Fruit.jsx'
import Drink from '../../../components/Product/Drink.jsx'
import { useGetProductQuery } from "../../../slices/productApiSlice";

// problem
// คิดราคารวมยังไม่ได้ แต่แยกคิดได้ และส่งราคารวมไปหน้าต่อไปได้ถูกต้อง

function SelectProductForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [total, setTotal] = useState(location.state.nextState.total)
    const [nt, setNt] = useState(0)

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
    const [selectedProductType, setSelectedProductType] = useState(null);
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
        const { ids, entities } = product

        let filteredIds

        filteredIds = [...ids]

        FruitContent = ids?.length && filteredIds.map(productId => <Fruit key={productId} productId={productId}
            selectedFruit={selectedFruit} setSelectedFruit={setSelectedFruit} />)

        DrinkContent = ids?.length && filteredIds.map(productId => <Drink key={productId} productId={productId}
            selectedDrink={selectedDrink} setSelectedDrink={setSelectedDrink} />)
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


    const handleProductTypeChange = (type) => {
        setSelectedProductType(type);
    }

    const nextPage = () => {
        const selectedBasket = location.state.nextState.selectedBasket
        const selectedFlower = location.state.nextState.selectedFlower
        const selectedRibbon = location.state.nextState.selectedRibbon
        const selectedBow = location.state.nextState.selectedBow

        const nextState = { selectedBasket, selectedFlower, selectedRibbon, selectedBow, selectedProduct, total: total + nt };
        // console.log(selectedProduct)
        navigate('/dash/makeBasket/card', { state: { nextState } })
    }

    const nextButton = (
        selectedProduct.length <= 0 ? (
            <Button className="mt-2" disabled>Next</Button>
        ) :
            (
                <Button className="mt-2" onClick={nextPage}>Next</Button>
            )
    )


    return (
        <Container>
            <h1>Select Product</h1>

            <Container>
                {content}
            </Container>

            <Form.Check
                type="radio"
                label="Fruit"
                name="productType"
                id="fruit"
                onChange={() => handleProductTypeChange('fruit')}
            />

            <Container>
                {selectedProductType != 'fruit' ? (
                    <fieldset disabled>
                        <Form>
                            {FruitContent}
                        </Form>
                    </fieldset>
                ) : (
                    <fieldset>
                        <Form>
                            {FruitContent}
                        </Form>
                    </fieldset>
                )
                }
            </Container>

            <Form.Check
                type="radio"
                label="Drink"
                name="productType"
                id="drink"
                onChange={() => handleProductTypeChange('drink')}
            />

            <Container>
                {selectedProductType != 'drink' ? (
                    <fieldset disabled>
                        <Form>
                            {DrinkContent}
                        </Form>
                    </fieldset>
                ) : (
                    <fieldset>
                        <Form>
                            {DrinkContent}
                        </Form>
                    </fieldset>
                )
                }
            </Container>

            <div>
                <p>Total : {total+nt} ฿</p>
            </div>

            {nextButton}
        </Container>
    )
}

export default SelectProductForm