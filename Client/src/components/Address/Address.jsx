import { useGetAddressQuery } from "../../slices/addressApiSlice.jsx"
import { useNavigate } from "react-router-dom"
import { memo, useEffect } from 'react'
import { Button, Container, Card } from "react-bootstrap"

import './Address.css'

const Address = ({ addressId }) => {
    // get address of this user
    const { address } = useGetAddressQuery("addressList", {
        selectFromResult: ({ data }) => ({
            address: data?.entities[addressId]
        })
    })

    const navigate = useNavigate()

    const onEditClick = () => {
        navigate(`/dash/address/${addressId}`)
    }

    if (address) {

        // Render address card
        return (
            <Container>
                <Card className="m-5" >
                    <Card.Text className="m-2">
                        Name : {address.firstname} {address.lastname}
                    </Card.Text>

                    <Card.Text className="m-2">
                        Address : {address.address} {address.subdistrict}  {address.district} {address.province} {address.postal} 
                    </Card.Text>

                    <Card.Text className="m-2">
                        Phone Number : {address.phone}
                    </Card.Text>
                    
                    <Container>
                        <Button onClick={onEditClick} className="edit-add-button">Edit</Button>
                    </Container>
                </Card>
            </Container>
        )
    } else {
        return null
    }
}

const memorized = memo(Address)

export default memorized