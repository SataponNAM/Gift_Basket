import { Container, Row, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useGetProductQuery } from "../../../../slices/productApiSlice"
import ManageDrink from "../../../../components/Product/Manage/ManageDrink"

import '../../global_admin.css'

function DrinkList() {
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

    let content
    const navigate = useNavigate()

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = product;

        // Filter out decorations that are not products
        const productIds = ids.filter(drinkId => entities[drinkId]?.category === "Drink");

        const groupedIds = [];
        while (productIds.length > 0) {
            groupedIds.push(productIds.splice(0, 4));
        }

        // Render rows and columns 
        content = groupedIds.map((rowIds, index) => (
            <Row key={index} className="mb-3">
                {rowIds.map((drinkId) => (
                    <Col key={drinkId} xs={12} sm={6} md={3}>
                        <ManageDrink drinkId={drinkId} />
                    </Col>
                ))}
            </Row>
        ));
    }

    const Adddrink = () => {
        navigate("/adminDash/admin/product/drink/add")
    }

    return (
        <Container>
            <h1>Beverage List</h1>

            <div>
                <Button className='button' onClick={Adddrink}>Add Beverage</Button>
            </div>

            {content}
        </Container>
    )
}

export default DrinkList