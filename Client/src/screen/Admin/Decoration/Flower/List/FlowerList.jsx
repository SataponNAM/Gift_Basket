import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetDecorationQuery } from "../../../../../slices/decorationApiSlice";
import ManageFlower from "../../../../../components/Decoration/Manage/ManageFlower";

import '../../../global_admin.css'

function FLowerList() {
    const {
        data: flower,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDecorationQuery('flowerList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;
    const navigate = useNavigate();

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = flower;

        // Filter out decorations that are not flowers
        const flowerIds = ids.filter(decoId => entities[decoId]?.category === "Flower");

        const groupedIds = [];
        while (flowerIds.length > 0) {
            groupedIds.push(flowerIds.splice(0, 5));
        }

        // Render rows and columns 
        content = groupedIds.map((rowIds, index) => (
            <Row key={index} className="mb-3">
                {rowIds.map((decoId) => (
                    <Col key={decoId} xs={12} sm={6} md={3}>
                        <ManageFlower decoId={decoId} />
                    </Col>
                ))}
            </Row>
        ));
    }

    const addFlowerClick = () => {
        navigate('/adminDash/admin/product/flower/add')
    }

    return (
        <Container>
            <h1>Flower List</h1>

            <Container>
                <Button className='mt-3 button' onClick={addFlowerClick}>Add Flower</Button>
            </Container>

            {content}
        </Container>
    );
}

export default FLowerList;
