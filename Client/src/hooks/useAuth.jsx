import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../slices/Reducers/authReducers'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false;

    if(token) {
        const decoded = jwtDecode(token)
        const { email, roles } = decoded.UserInfo

        isAdmin = roles.includes('Admin')

        return { email, roles, isAdmin}
    }

    return { email: '', roles: [], isAdmin}
} 

export default useAuth