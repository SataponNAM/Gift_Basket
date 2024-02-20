import { useGetAddressQuery } from "../slices/addressApiSlice"
import { useNavigate } from "react-router-dom"
import { memo, useEffect } from 'react'
import { Button, Container } from "react-bootstrap"
import { useDeleteAddressMutation } from '../slices/addressApiSlice.jsx'

const Address = ({addressId}) => {
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
        if(isSuccess){
            navigate('/address')
        }
    }, [isSuccess, navigate])

    const deleteAddress = async () =>{
        await sendDel({id : address.id})
    }

    if (isError) {
        return <p>Error: {error.data?.message}</p>
    }

    if(address){

        return (
            <Container>
                <p>{address.firstname} {address.lastname}</p>
                <p>{address.address} {address.city} {address.state} {address.country} </p>
                <p>{address.phone}</p>
                <Container>
                    <Button>Edit</Button>
                    <Button variant="danger" className="m-2" onClick={deleteAddress}>Delete</Button>
                </Container>  
            </Container>
        )
    } else {
        return null
    }
}

const memorized = memo(Address)

export default memorized