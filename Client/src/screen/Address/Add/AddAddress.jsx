import { useGetUsersQuery } from '../../../slices/userApiSlice.jsx'
import AddAddressForm from './AddAddressForm.jsx'
import useAuth from '../../../hooks/useAuth.jsx'

const AddAddress = () => {
    const { email, isAdmin } = useAuth()

    let content

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    // เกิด error
    if(isError){
        content = <p className='errmsg'>{error?.data?.message}</p>
    }
    
    // 
    if(isSuccess){
        const { ids, entities } = users

        let filteredIds
        filteredIds = ids.filter(userid => entities[userid].email === email)

        content = <AddAddressForm users={filteredIds} />
    }

    return content
}

export default AddAddress