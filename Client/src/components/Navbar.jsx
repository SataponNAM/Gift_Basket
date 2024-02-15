import '../css/Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useSendLogoutMutation } from '../slices/authApiSlice'

function nav(){
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if(isSuccess){
            navigate('/')
        }
    } , [isSuccess, navigate])

    const onLogoutClicked = () => {
        sendLogout()
        navigate('/')
    }

    if(isLoading){
        return <p>Logging Out...</p>
    }
    if(isError){
        return <p>Error: {error.data?.message}</p>
    }

    const logoutButton = (
        <button title='Logout' onClick={onLogoutClicked}>
            LogOut
        </button>
    )

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/Login'>Login</Link>
            <Link to='/Register'>Register</Link>
            {logoutButton}
        </nav>    
    )
}

export default nav