import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetDecorationQuery } from "../../../../../slices/decorationApiSlice";
import ManageRibbon from "../../../../../components/Decoration/Manage/ManageRibbon";

import '../../../global_admin.css'

function RibbonList() {
    const {
        data: ribbon,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDecorationQuery('ribbonList', {
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
        const { ids, entities } = ribbon;

        // Filter out decorations that are not ribbons
        const ribbonIds = ids.filter(decoId => entities[decoId]?.category === "Ribbon");

        const groupedIds = [];
        while (ribbonIds.length > 0) {
            groupedIds.push(ribbonIds.splice(0, 5));
        }

        // Render rows and columns 
        content = groupedIds.map((rowIds, index) => (
            <Row key={index} className="mb-3">
                {rowIds.map((decoId) => (
                    <Col key={decoId} xs={12} sm={6} md={3}>
                        <ManageRibbon decoId={decoId} />
                    </Col>
                ))}
            </Row>
        ));
    }

    const addRibbonClick = () => {
        navigate('/adminDash/admin/product/ribbon/add')
    }

    return (
        <Container>
            <h1>Ribbon</h1>

            <Container>
                <Button className='mt-3 button' onClick={addRibbonClick}>Add Ribbon</Button>
            </Container>

            {content}
        </Container>
    );
}

export default RibbonList;
