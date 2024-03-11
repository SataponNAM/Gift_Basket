import { Button, Container, Form } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import { useGetAddressQuery } from "../../../slices/addressApiSlice"
import SelectAddr from '../../../components/SelectAddress/SelectAddr.jsx'

function SelectAddress() {
    const location = useLocation();
    const { email, isAdmin } = useAuth()
    const navigate = useNavigate()
    const [selectAddress, setSelectAddress] = useState(null)

    const {
        data: address,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAddressQuery('addressList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = address

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids?.filter(addressId => entities[addressId].email === email)
        }

        // frontend อยู่ใน  /components/Address.jsx
        content = ids?.length && filteredIds.map(addressId => <SelectAddr key={addressId} addressId={addressId} selectAddress={selectAddress} setSelectAddress={setSelectAddress} />)
    }

    const onPaymentClick = () => {
        // สร้าง order ลบ basket ใน cart

        const basketId = location.state.basketId
        
        navigate('/dash/order/checkout', {state: {basketId, selectAddress}})
    }

    const nextButton = (
        selectAddress === null ? (
            <Button className="mt-2" disabled>ชำระเงิน</Button>
        ) :
        (
            <Button className="mt-2" onClick={onPaymentClick}>ชำระเงิน</Button>
        )
    )

    return (
        <Container>
            <h1>Select Address</h1>
            <Container>
                {content}
            </Container>

            <div>
                {nextButton}
            </div>
        </Container>
    )
}

export default SelectAddress