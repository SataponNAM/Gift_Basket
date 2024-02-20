import '../css/Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useSendLogoutMutation } from '../slices/authApiSlice'
import useAuth from '../hooks/useAuth'

function nav() {
    const { isAdmin } = useAuth()

    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.auth.isAuthenticated)

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            if (isAdmin) {
                // Dashboard page
            }else {
                navigate('/home')
            }  
        }
    }, [isSuccess, navigate])

    const onLogoutClicked = () => {
        sendLogout()
    }

    if (isLoading) {
        return <p>Logging Out...</p>
    }
    if (isError) {
        return <p>Error: {error.data?.message}</p>
    }

    const dropdownButton = userLogin ? (
        // When user login
        isAdmin ? (
            // Admin navbar
            <div>Admin Navbar</div>
        ) : (
            
            // Customer navbar
            <NavDropdown title="Profile" id='username'>             
                <NavDropdown.Item as={Link} to='/address'>Address</NavDropdown.Item>
                {/* Logout */}
                <NavDropdown.Item onClick={onLogoutClicked}>Logout</NavDropdown.Item>
            </NavDropdown>
        )
    ) : (
        //  When user is not logged in
        <LinkContainer to='/login'>
            <Nav.Link>Login</Nav.Link>
        </LinkContainer>
    );

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Link to='/home'>Home</Link>
            
            {dropdownButton}
        </Navbar>
    )
}

export default nav