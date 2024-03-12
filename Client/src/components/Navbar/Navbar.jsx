import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar, NavDropdown } from 'react-bootstrap'

import { useSendLogoutMutation } from '../../slices/authApiSlice'
import useAuth from '../../hooks/useAuth'

function nav() {
    const { isAdmin } = useAuth()

    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess){
            
        }
    }, [isSuccess, navigate])

    const onLogoutClicked = () => {
        sendLogout()
        navigate('/')
    }

    if (isError) {
        return <p>Error: {error.data?.message}</p>
    }

    const dropdownButton = (
        // When user login
        isAdmin ? (
            // Admin navbar
            <div>Admin Navbar</div>
        ) : (

            // Customer navbar
            <NavDropdown title="Profile" id='username'>
                <NavDropdown.Item as={Link} to='/dash/order/orderlist'>รายการคำสั่งซื้อ</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/dash/address'>ที่อยู่</NavDropdown.Item>
                <NavDropdown.Item onClick={onLogoutClicked}>ออกจากระบบ</NavDropdown.Item> 
            </NavDropdown>
        )
    )

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" sticky="top">
            <Link to='/dash/home'>หน้าหลัก</Link>

            <Link to='/dash/cart'>ตะกร้าสินค้า</Link>
            {dropdownButton}
        </Navbar>
    )
}

export default nav