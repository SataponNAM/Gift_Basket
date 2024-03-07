import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetDecorationQuery } from "../../../slices/decorationApiSlice";
import Flower from "../../../components/Decoration/Flower.jsx";
import Ribbon from "../../../components/Decoration/Ribbon.jsx";
import Bow from "../../../components/Decoration/Bow.jsx";

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
        const { ids, entities } = decoration

        let filteredIds

        filteredIds = [...ids]
        // frontend อยู่ใน  /components/Address.jsx
        flowerContent = ids?.length && filteredIds.map(decorationId => <Flower key={decorationId} decoId={decorationId} selectedFlower={selectedFlower} setSelectedFlower={setSelectedFlower} total={total} setTotal={setTotal}/>)
        ribbonContent = ids?.length && filteredIds.map(decorationId => <Ribbon key={decorationId} decoId={decorationId} selectedRibbon={selectedRibbon} setSelectedRibbon={setSelectedRibbon} total={total} setTotal={setTotal}/>)
        bowContent = ids?.length && filteredIds.map(decorationId => <Bow key={decorationId} decoId={decorationId} selectedBow={selectedBow} setSelectedBow={setSelectedBow} total={total} setTotal={setTotal}/>)
    }  

    const nextPage = () => {
        const nextState = { selectedBasket, selectedFlower, selectedRibbon, selectedBow, total };

        console.log(nextState.selectedDeco)
        navigate('/dash/makeBasket/product', {state : {nextState}})
    }

    const nextButton = (
        selectedFlower === null || selectedRibbon === null || selectedBow === null ? (
            <Button className="mt-2" disabled>Next</Button>
        ) :
        (
            <Button className="mt-2" onClick={nextPage}>Next</Button>
        )
    )

    return (
        <Container>
            <h1>select deco</h1>

            {/* Flower */}
            <div>
                <h2>Select Flower</h2>
                <div>
                    <Container>
                        <div style={{ width: '18rem' }}>
                            <Form>
                                {flowerContent}
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>

            {/* Ribbon */}
            <div>
                <h2>Select Ribbon</h2>
                <div>
                    <Container>
                        <div style={{ width: '18rem' }}>
                            <Form>
                                {ribbonContent}
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>

            {/* Bow */}
            <div>
                <h2>Select Ribbon</h2>
                <div>
                    <Container>
                        <div style={{ width: '18rem' }}>
                            <Form>
                                {bowContent}
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>

            <div>
                <p>ราคารวม : {total} บาท</p>
            </div>

            {nextButton}
        </Container>
    )
}

export default SelectDecoForm