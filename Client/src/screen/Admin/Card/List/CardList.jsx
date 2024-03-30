import { Button, Col, Container, Row } from "react-bootstrap"
import ManageCard from "../../../../components/Card/Manage/ManageCard.jsx"
import { useGetCardQuery } from "../../../../slices/cardApiSlice.jsx"
import { useNavigate } from "react-router-dom"

import '../../global_admin.css'

function CardList() {
    const {
        data: card,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCardQuery('cardList', {
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
        const { ids, entities } = card

        let filteredIds

        filteredIds = [...ids]

        const groupedIds = [];
        while (filteredIds.length > 0) {
            groupedIds.push(filteredIds.splice(0, 4));
        }

        // Render rows and columns 
        content = groupedIds.map((rowIds, index) => (
            <Row key={index} className="mb-3">
                {rowIds.map((cardId) => (
                    <Col key={cardId} xs={12} sm={6} md={3}>
                        <ManageCard cardId={cardId} />
                    </Col>
                ))}
            </Row>
        ));
    }

    const addCardClick = () => {
        navigate('/adminDash/admin/product/card/add')
    }

    return (
        <Container>
            <h1>Card List</h1>

            <div>
                <Button className="button" onClick={addCardClick}>Add Card</Button>
            </div>

            {content}
        </Container>
    )
}

export default CardList