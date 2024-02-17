import '../css/Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useSendLogoutMutation } from '../slices/authApiSlice'

function nav() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.auth.isAuthenticated)

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onLogoutClicked = () => {
        sendLogout()
        navigate('/')
    }

    if (isLoading) {
        return <p>Logging Out...</p>
    }
    if (isError) {
        return <p>Error: {error.data?.message}</p>
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Nav.Link to='/'>Home</Nav.Link>

            {userLogin ? (
                <NavDropdown title="Profile" id='username'>
                    {/* Logout */}
                    <NavDropdown.Item onClick={onLogoutClicked}>Log out</NavDropdown.Item>
                </NavDropdown>
            ) : (
                // Login
                <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
            )}
        </Navbar>
    )
}

export default nav