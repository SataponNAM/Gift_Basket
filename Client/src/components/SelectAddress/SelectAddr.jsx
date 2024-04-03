import { useGetAddressQuery } from "../../slices/addressApiSlice.jsx"
import { memo } from 'react'
import { Container, Card } from "react-bootstrap"

import '../item.css'

const SelectAddr = ({ addressId, selectAddress, setSelectAddress }) => {
    // get address of this user
    const { address } = useGetAddressQuery("addressList", {
        selectFromResult: ({ data }) => ({
            address: data?.entities[addressId]
        })
    })

    const classes = selectAddress != null && address._id === selectAddress ? "border border-3 custom-border m-5" : "m-5";

    const handleOnClick = () => {
        setSelectAddress(address.id)
    }

    if (address) {
        // Render address card
        return (
            <Container>
                <Card className={classes} onClick={handleOnClick} >
                    <Card.Text className="m-2">Name : {address.firstname} {address.lastname}</Card.Text>
                    <Card.Text className="m-2">Address : {address.address} {address.city} {address.state} {address.country} </Card.Text>
                    <Card.Text className="m-2">Phone Number : {address.phone}</Card.Text>
                </Card>
            </Container>
        )
    } else {
        return null
    }
}

const memorized = memo(SelectAddr)

export default memorized