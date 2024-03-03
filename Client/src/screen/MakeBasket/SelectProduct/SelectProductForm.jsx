import { Container, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Fruit from '../../../components/Product/Fruit.jsx'
import Drink from '../../../components/Product/Drink.jsx'
import { useGetProductQuery } from "../../../slices/productApiSlice";

function SelectProductForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [total, setTotal] = useState(location.state.nextState.total)
    const prevTotal = total
    const [sumFruit, setSumFruit] = useState(0)
    const [sumDrink, setSumDrink] = useState(0)

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
            selectedFruit={selectedFruit} setSelectedFruit={setSelectedFruit} sumFruit={sumFruit} setSumFruit={setSumFruit} />)
        DrinkContent = ids?.length && filteredIds.map(productId => <Drink key={productId} productId={productId} 
            selectedDrink={selectedDrink} setSelectedDrink={setSelectedDrink} sumDrink={sumDrink} setSumDrink={setSumDrink} />)
    }

    useEffect(() => {
        setSelectedProduct(selectedProductType === 'fruit' ? selectedFruit : selectedDrink)
        //
    }, [selectedFruit, selectedDrink, selectedProductType, sumFruit, sumDrink]);
    

    const handleProductTypeChange = (type) => {
        setSelectedProductType(type);   
        setTotal(prevTotal)
    }

    const nextPage = () => {
        const selectedBasket = location.state.nextState.selectedBasket
        const selectedFlower = location.state.nextState.selectedFlower
        const selectedRibbon = location.state.nextState.selectedRibbon
        const selectedBow = location.state.nextState.selectedBow

        const nextState = { selectedBasket, selectedFlower, selectedRibbon, selectedBow, selectedProduct, total };
        // console.log(selectedProduct)
        navigate('/dash/makeBasket/card', { state: { nextState } })
    }

    const nextButton = (
        selectedProduct === null ? (
            <Button className="mt-2" disabled>Next</Button>
        ) :
            (
                <Button className="mt-2" onClick={nextPage}>Next</Button>
            )
    )


    return (
        <Container>
            <h1>กรุณาเลือกสินค้าในกระเช้า</h1>

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
                <p>ราคารวม : {total} บาท</p>
            </div>

            {nextButton}
        </Container>
    )
}

export default SelectProductForm