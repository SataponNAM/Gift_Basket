import { useGetAddressQuery } from "../slices/addressApiSlice"
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { Container } from "react-bootstrap"

const Address = ({addressId}) => {
    // get address of this user
    const { address } = useGetAddressQuery("addressList", {
        selectFromResult: ({ data }) => ({
            address: data?.entities[addressId]
        })
    })

    const navigate = useNavigate()

    if(address){
        return (
            <Container>
                <p>{address.address} {address.city} {address.state} {address.country}</p>
            </Container>
        )
    } else {
        return null
    }
}

const memorized = memo(Address)

export default memorized