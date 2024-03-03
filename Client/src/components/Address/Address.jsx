import { useGetAddressQuery } from "../../slices/addressApiSlice.jsx"
import { useNavigate } from "react-router-dom"
import { memo, useEffect } from 'react'
import { Button, Container, Card } from "react-bootstrap"
import { useDeleteAddressMutation } from '../../slices/addressApiSlice.jsx'

const Address = ({ addressId }) => {
    // get address of this user
    const { address } = useGetAddressQuery("addressList", {
        selectFromResult: ({ data }) => ({
            address: data?.entities[addressId]
        })
    })

    const [sendDel, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useDeleteAddressMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate('/dash/address')
        }
    }, [isSuccess, navigate])

    const deleteAddress = async () => {
        await sendDel({ id: address.id })
    }

    const onEditClick = () => {
        navigate(`/dash/address/${addressId}`)
    }

    if (isError) {
        return <p>Error: {error.data?.message}</p>
    }

    if (address) {

        // Render address card
        return (
            <Container>
                <Card className="m-5" >
                    <Card.Text className="m-2">{address.firstname} {address.lastname}</Card.Text>
                    <Card.Text className="m-2">{address.address} {address.city} {address.state} {address.country} </Card.Text>
                    <Card.Text className="m-2">{address.phone}</Card.Text>
                    <Container>
                        <Button onClick={onEditClick}>Edit</Button>
                        <Button variant="danger" className="m-2" onClick={deleteAddress}>Delete</Button>
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