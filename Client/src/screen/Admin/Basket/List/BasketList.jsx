import { Button, Col, Container, Row } from "react-bootstrap"
import ManageBasket from '../../../../components/Basket/Manager/ManageBasket.jsx'
import { useGetBasketQuery } from "../../../../slices/basketApiSlice"
import { useNavigate } from "react-router-dom"

function BasketList() {
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
    })

    let content
    const navigate = useNavigate()

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = basket

        let filteredIds

        filteredIds = [...ids]

        const groupedIds = [];
        while (filteredIds.length > 0) {
            groupedIds.push(filteredIds.splice(0, 4));
        }

        // Render rows and columns 
        content = groupedIds.map((rowIds, index) => (
            <Row key={index} className="mb-3">
                {rowIds.map((basketId) => (
                    <Col key={basketId} xs={12} sm={6} md={3}>
                        <ManageBasket basketId={basketId} />
                    </Col>
                ))}
            </Row>
        ));
    }

    const addBasketClick = () => {
        navigate('/adminDash/admin/product/basket/add')
    }

    return (
        <Container>
            <h1>Basket</h1>

            <div>
                <Button onClick={addBasketClick}>เพิ่มสินค้า</Button>
            </div>

            {content}
        </Container>
    )
}

export default BasketList