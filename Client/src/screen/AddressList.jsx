import { Container } from 'react-bootstrap'
import useAuth from '../hooks/useAuth.jsx'
import { useGetAddressQuery } from '../slices/addressApiSlice'
import Address from '../components/Address.jsx'

function address(){
    const { email, isAdmin } = useAuth()

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

    if(isLoading) content = <p>Loading...</p>

    if(isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if(isSuccess){
        const { ids, entities } = address

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(addressId => entities[addressId].email === email)
        }

        // frontend อยู่ใน  /components/Address.jsx
        content = ids?.length && filteredIds.map(addressId => <Address key={addressId} addressId={addressId} />)

    }

    return (
        <Container>
            <h1>Address</h1>
            {content}
        </Container>
    )
}

export default address