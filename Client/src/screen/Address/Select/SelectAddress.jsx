import { Button, Container } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import { useGetAddressQuery } from "../../../slices/addressApiSlice"
import { useGetUsersQuery } from "../../../slices/userApiSlice.jsx";
import SelectAddr from '../../../components/SelectAddress/SelectAddr.jsx'

import './SelectAddress.css'

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

    const LoadUser = () => {
        const {
            data: users,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetUsersQuery('usersList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })

        if (isSuccess) {
            const { ids, entities } = users

            const filteredIds = ids?.filter(userId => entities[userId].email === email)

            return filteredIds
        }
    }

    const user = LoadUser()

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
        console.log(filteredIds)

        if (filteredIds.length) {
            content = ids?.length && filteredIds.map(addressId => 
            <SelectAddr key={addressId} addressId={addressId} selectAddress={selectAddress} 
                        setSelectAddress={setSelectAddress} />)
        } else {
            content = (
                <div className="noadd">
                    <p>No Address Founded</p>
                    <p>Please <Link to='/dash/address/addAddress' className="addadd-link">Add Address</Link></p>
                </div>
            )
        }
    }


    const onPaymentClick = () => {
        const basketId = location.state.basketId
        const totalPrice = location.state.totalPrice

        navigate('/dash/order/checkout', { state: { basketId, totalPrice, selectAddress, user } })
    }

    const nextButton = (
        selectAddress === null ? (
            <Button className="mt-2 confirm-button" disabled>Confirm</Button>
        ) :
            (
                <Button className="mt-2 confirm-button" onClick={onPaymentClick}>Confirm</Button>
            )
    )

    return (
        <Container className="all-container">
            <h1>Select Address</h1>
            <div className="content select-add-content">
                {content}
            </div>

            <Container>
                {nextButton}
            </Container>
        </Container>
    )
}

export default SelectAddress