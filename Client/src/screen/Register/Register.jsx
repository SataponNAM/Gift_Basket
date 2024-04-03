import { useEffect, useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from "../../slices/authApiSlice";
import { Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import './Register.css';

const Register = () => {
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('err')

    const navigate = useNavigate()

    const [register, { isloading }] = useRegisterMutation()

    useEffect(() => {
        setErrorMessage('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await register({ firstname, lastname, email ,phone ,password, cpassword}).unwrap()

            setEmail('')
            setFirstname('')
            setLastname('')
            setPhone('')
            setPassword('')
            setCPassword('')
            navigate('/login')
        } catch (error) {
            if(!error.status){
                setErrorMessage('No server response')
            }else {
                setErrorMessage(error.data?.message)
            }
            errRef.current.focus()
        }
    }

    const errClass = errorMessage ? "errmsg" : "offscreen"

    const inputFirstname = (e) =>{
        setFirstname(e.target.value)
    }
    const inputLastname = (e) =>{
        setLastname(e.target.value)
    }
    const inputEmail = (e) =>{
        setEmail(e.target.value)
    }
    const inputPhone = (e) =>{
        setPhone(e.target.value)
    }
    const inputPsw = (e) =>{
        setPassword(e.target.value)
    }
    const inputCPsw = (e) =>{
        setCPassword(e.target.value)
    }

    return (
        <Container className="all-reg-container">
    <div className="reg-container">
        <Form className="mt-5" onSubmit={handleSubmit}>
            <h2 className="mb-4">SIGN UP</h2>
            
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Firstname</h4>
                        <Form.Control 
                            type="text" 
                            placeholder="Firstname" 
                            value={firstname} 
                            onChange={inputFirstname}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Lastname</h4>
                        <Form.Control 
                            type="text" 
                            placeholder="Lastname" 
                            value={lastname} 
                            onChange={inputLastname}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Email</h4>
                        <Form.Control 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={inputEmail}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Phone Number</h4>
                        <Form.Control 
                            type="text" 
                            placeholder="Phone" 
                            value={phone} 
                            onChange={inputPhone}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Password</h4>
                        <Form.Control 
                            type="password"
                            placeholder="Password" 
                            value={password} 
                            onChange={inputPsw}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <h4 className="lb-1">Confirm Password</h4>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={cpassword} 
                            onChange={inputCPsw}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>

            <Button type="summit" className="reg-button" variant="primary">Sign up</Button>

            <p className="details">Have an account? <Link to="/Login" className="login-link">Log in</Link></p>
        </Form>
    </div>
    
</Container>

    )
}

export default Register