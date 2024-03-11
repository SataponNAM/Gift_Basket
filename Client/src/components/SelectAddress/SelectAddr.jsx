import { useGetAddressQuery } from "../../slices/addressApiSlice.jsx"
import { useNavigate } from "react-router-dom"
import { memo, useEffect } from 'react'
import { Form, Container, Card } from "react-bootstrap"
import { useDeleteAddressMutation } from '../../slices/addressApiSlice.jsx'

const SelectAddr = ({ addressId, selectAddress, setSelectAddress }) => {
    // get address of this user
    const { address } = useGetAddressQuery("addressList", {
        selectFromResult: ({ data }) => ({
            address: data?.entities[addressId]
        })
    })

    const classes = selectAddress != null && address._id === selectAddress ? "border border-success m-5" : "m-5";

    const handleOnClick = () =>{
        setSelectAddress(address.id)
        //console.log(address.id)
    }

    if (address) {
        // Render address card
        return (
            <Container>
                <Card className={classes} onClick={handleOnClick} >
                    <Card.Text className="m-2">{address.firstname} {address.lastname}</Card.Text>
                    <Card.Text className="m-2">{address.address} {address.city} {address.state} {address.country} </Card.Text>
                    <Card.Text className="m-2">{address.phone}</Card.Text>
                </Card>
            </Container>
        )
    } else {
        return null
    }
}

const memorized = memo(SelectAddr)

export default memorized