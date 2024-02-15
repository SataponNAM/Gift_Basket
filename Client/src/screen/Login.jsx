import { Container, Form, Button } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/authApiSlice'

function login (){
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            navigate('/success')
        } catch (err) {
            if(!err.status){
                setErrorMessage('No server response')
            }else if(err.status === 400){
                setErrorMessage('Missing email or password')
            }else if(err.status === 401){
                setErrorMessage('Unauthorized')
            }else {
                setErrorMessage(err.data?.message)
            }
            errRef.current.focus()
        }
    }

    const errClass = errorMessage ? "errmsg" : "offscreen"

    if(isLoading) {
        return <p>Loading...</p>
    }

    const inputEmail = (e) =>{
        setEmail(e.target.value)
    }
    const inputPassword = (e) =>{
        setPassword(e.target.value)
    }

    return (
        <Container>
            <Form className="mt-5" onSubmit={handleSubmit}>
                <h2 className="mb-4">Login</h2>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        ref={userRef}
                        value={email}
                        onChange={inputEmail}
                        required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={inputPassword}
                        require>
                    </Form.Control>
                </Form.Group>
                { /* print error message*/ }
                <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>

                <Button type="summit" variant="primary">เข้าสู่ระบบ</Button>

                <p>คุณยังไม่มีบัญชีแล้วใช่หรือไม่ <Link to="/Register">ลงทะเบียน</Link></p>
            </Form>
        </Container>
    )
}

export default login