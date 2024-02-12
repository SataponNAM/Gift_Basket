import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { UseDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/authApiSlice'

function login (){
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    return (
        <> 
            <Container>
                <Form className="mt-5">
                    <h2 className="mb-4">Login</h2>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Password" require></Form.Control>
                    </Form.Group>

                    <Button type="summit" variant="primary">เข้าสู่ระบบ</Button>

                    <p>คุณยังไม่มีบัญชีแล้วใช่หรือไม่ <Link to="/Register">ลงทะเบียน</Link></p>
                </Form>
            </Container>
        </>
    )
}

export default login