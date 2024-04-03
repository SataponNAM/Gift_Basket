import { Container, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetDecorationQuery } from "../../../slices/decorationApiSlice";
import Flower from "../../../components/Decoration/Flower.jsx";
import Ribbon from "../../../components/Decoration/Ribbon.jsx";
import Bow from "../../../components/Decoration/Bow.jsx";

import './SelectDecoForm.css'

function SelectDecoForm() {
    const location = useLocation();
    const selectedBasket = location.state.nextState.selectedBasket
    const [total, setTotal] = useState(location.state.nextState.total)
    const navigate = useNavigate();

    const {
        data: decoration,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDecorationQuery('decorationList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content
    let flowerContent
    let ribbonContent
    let bowContent
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [selectedRibbon, setSelectedRibbon] = useState(null);
    const [selectedBow, setSelectedBow] = useState(null);

    useEffect(() => {
        console.log("Selected Flower:", selectedFlower);
    }, [selectedFlower]);

    useEffect(() => {
        console.log("Selected Ribbon:", selectedRibbon);
    }, [selectedRibbon]);

    useEffect(() => {
        console.log("Selected Bow:", selectedBow);
    }, [selectedBow]);

    if (isLoading) {
        content = <p>Loading...</p>
        flowerContent = null
        ribbonContent = null
        bowContent = null
    }

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
        flowerContent = null
        ribbonContent = null
        bowContent = null
    }

    if (isSuccess) {
        const { ids, entities } = decoration;
    
        // Filter out decorations that are not flowers
        const flowerIds = ids.filter(decoId => entities[decoId]?.category === "Flower");
    
        // Filter out decorations that are ribbons
        const ribbonIds = ids.filter(decoId => entities[decoId]?.category === "Ribbon");
    
        // Filter out decorations that are bows
        const bowIds = ids.filter(decoId => entities[decoId]?.category === "Bow");
    
        // Render flower content
        flowerContent = (
            <Row xs={1} md={3} className="g-4">
                {flowerIds.map(decorationId => (
                    <Col key={decorationId}>
                        <Flower decoId={decorationId} selectedFlower={selectedFlower} 
                        setSelectedFlower={setSelectedFlower} total={total} setTotal={setTotal}/>
                    </Col>
                ))}
            </Row>
        );
    
        // Render ribbon content
        ribbonContent = (
            <Row xs={1} md={3} className="g-4">
                {ribbonIds.map(decorationId => (
                    <Col key={decorationId}>
                        <Ribbon decoId={decorationId} selectedRibbon={selectedRibbon} 
                        setSelectedRibbon={setSelectedRibbon} total={total} setTotal={setTotal}/>
                    </Col>
                ))}
            </Row>
        );
    
        // Render bow content
        bowContent = (
            <Row xs={1} md={3} className="g-4">
                {bowIds.map(decorationId => (
                    <Col key={decorationId}>
                        <Bow decoId={decorationId} selectedBow={selectedBow} 
                        setSelectedBow={setSelectedBow} total={total} setTotal={setTotal}/>
                    </Col>
                ))}
            </Row>
        );
    }  
    

    const nextPage = () => {
        const nextState = { selectedBasket, selectedFlower, selectedRibbon, selectedBow, total };
        navigate('/dash/makeBasket/product', {state : {nextState}})
    }

    const nextButton = (
        selectedFlower === null || selectedRibbon === null || selectedBow === null ? (
            <Button className="mt-2 deco-next-button" disabled>Next</Button>
        ) :
        (
            <Button className="mt-2 deco-next-button" onClick={nextPage}>Next</Button>
        )
    )

    return (
        <Container className="all-deco-container">
            <h2>Select Decoration</h2>

            <div className='deco-content'>
            <h2>Select Flower</h2>
            {/* Flower */}

                <div >
                    {flowerContent}
                </div>

            {/* Ribbon */}
            <h2>Select Ribbon</h2>
                <div>
                    {ribbonContent}
                </div>

            {/* Bow */}
                <h2>Select Bow</h2>
                <div>
                    {bowContent}
                </div>
            </div>
            <div>
                <p className='total-deco'>Total : {total} ฿</p>
            </div>

            {nextButton}
        </Container>
    )
}

export default SelectDecoForm;
