import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.jsx'
import { useGetAddressQuery } from '../../slices/addressApiSlice.jsx'
import Address from '../../components/Address/Address.jsx'

import './AddressList.css';

function address() {
    const { email, isAdmin } = useAuth()

    const navigate = useNavigate()

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

        content = ids?.length && filteredIds.map(addressId => <Address key={addressId} addressId={addressId} />)
    }

    const onAddAddressClicked = () => {
        navigate('/dash/address/addAddress')
    }

    return (
        <Container className="all-container">
            <h1>Address</h1>
            <Button onClick={onAddAddressClicked} className="add-new-button">Add New Address</Button>
            <div className="content">{content}</div>
        </Container>
    )
}

export default address