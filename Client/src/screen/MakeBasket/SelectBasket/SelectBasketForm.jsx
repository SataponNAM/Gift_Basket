import { Container, Form, Button } from 'react-bootstrap'
import Basket from '../../../components/Basket/Basket.jsx'
import { useGetBasketQuery } from '../../../slices/basketApiSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SelectBasketForm() {
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
    let total
    const [selectedBasket, setSelectedBasket] = useState(null);
    const navigate = useNavigate();

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = basket

        let filteredIds

        filteredIds = [...ids]
        // frontend อยู่ใน  /components/Address.jsx
        content = ids?.length && filteredIds.map(basketId => <Basket key={basketId} basketId={basketId} selectedBasket={selectedBasket} setSelectedBasket={setSelectedBasket} total={total} />)
    }

    if(selectedBasket != null){
        total = selectedBasket.price
    }else {
        total = 0
    }

    const nextState = { selectedBasket, total };

    const nextPage = () => {
        navigate('/dash/makeBasket/decoration', { state: { nextState } })
    }

    const nextButton = (
        selectedBasket === null ? (
            <Button className="mt-2" disabled>Next</Button>
        ) :
            (
                <Button className="mt-2" onClick={nextPage}>Next</Button>
            )
    )

    return (

        <Container>
            <h2>Select Basket</h2>

            <div>
                {content}
            </div>

            <Container>
                <p>ราคารวม : {total} บาท</p>
            </Container>

            {nextButton}
        </Container>
    )
}

export default SelectBasketForm