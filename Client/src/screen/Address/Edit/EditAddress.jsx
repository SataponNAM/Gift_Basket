import useAuth from '../../../hooks/useAuth.jsx'
import { useGetAddressQuery } from '../../../slices/addressApiSlice.jsx'
import { useGetUsersQuery } from '../../../slices/userApiSlice.jsx'
import { useParams } from 'react-router-dom'
import EditAddressForm from './EditAddressForm.jsx'

const EditAddress = () => {
    const { id } = useParams()

    const { email, isAdmin } = useAuth()

    const { address } = useGetAddressQuery("addressList", {
        selectFromResult: ({ data }) => ({
            address: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("userList", ({
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    }))

    if (!address || !users) {
        console.log("not found")
    } else {
        console.log("found")
    }

    const content = <EditAddressForm address={address} users={users} />

    return content
}

export default EditAddress