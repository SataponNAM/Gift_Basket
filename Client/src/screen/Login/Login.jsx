import { Container, Form, Button } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../slices/Reducers/authReducers.jsx'
import { useLoginMutation } from '../../slices/authApiSlice.jsx'
import usePersist from '../../hooks/usePersist.jsx'

import './Login.css';

function login() {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const [persist, setPersist] = usePersist()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken, role } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))

            console.log(role[0])

            setEmail('')
            setPassword('')

            if (role[0] == 'Customer') {
                navigate('/dash')
            } else {
                navigate('/adminDash/admin')
            }

        } catch (err) {
            if (!err.status) {
                setErrorMessage('No server response')
            } else if (err.status === 400) {
                // ใส่ input ไม่ครบทุกช่อง
                setErrorMessage('All fields are required.')
            } else if (err.status === 401) {
                // ใส่รหัส หรือ email ผิด
                setErrorMessage('Incorrect email or password')
            } else {
                setErrorMessage(err.data?.message)
            }
            errRef.current.focus()
        }
    }

    const errClass = errorMessage ? "errmsg" : "offscreen"

    const inputEmail = (e) => {
        setEmail(e.target.value)
    }
    const inputPassword = (e) => {
        setPassword(e.target.value)
    }
    const handleToggle = () => {
        setPersist(persist => !persist)
    }

    return (
        <Container className="all-login-container">
            <div className="form-details">
                <h2>Welcome Back</h2>
                <p>Please log in to decorate your gift basket</p>
            </div>
            <div className="login-container">
                <Form className="mt-5" onSubmit={handleSubmit}>
                    <h2 className="mb-4">LOG IN</h2>
                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Email</h4>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            ref={userRef}
                            value={email}
                            onChange={inputEmail}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Password</h4>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={inputPassword}
                            required
                        />
                    </Form.Group>
                    { /* print error message*/}
                    <p ref={errRef} className={errClass} aria-live="assertive">
                        {errorMessage}
                    </p>

                    <Form.Group className='checkbox-container'>
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={persist}
                            className="checkbox-input"
                        />
                        Remember me
                    </Form.Group>

                    <Button type="submit" className="login-button" variant="primary">
                        Log in
                    </Button>

                    <p className="details">
                        Don't have an account? <Link to="/Register" className="signup-link">Sign up</Link>
                    </p>
                </Form>
            </div>
        </Container>
    )
}

export default login