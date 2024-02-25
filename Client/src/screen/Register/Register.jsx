import { useEffect, useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from "../../slices/authApiSlice";

import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const [register, { isloading }] = useRegisterMutation()

    const errClass = errorMessage ? "errmsg" : "offscreen"

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const result = await register({ firstname, lastname, email ,phone ,password, cpassword})
            setEmail('')
            setFirstname('')
            setLastname('')
            setPhone('')
            setPassword('')
            setCPassword('')
            navigate('/login')
        } catch (err) {
            if(!err.status){
                setErrorMessage('No server response')
            }else if(err.status === 400){
                setErrorMessage('All fiedls are required.')
            }else if(err.status === 409){
                setErrorMessage('Email is used.')
            }else if(err.status === 401) {
                setErrorMessage("Password do not match.")
            }else {
                setErrorMessage(err.data?.message)
            }
            errRef.current.focus()
        }
    }

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
        <>
        <Container>
            <h1>Register</h1>

            <Form className="mt-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Firstname" 
                        value={firstname} 
                        onChange={inputFirstname}
                        require>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Lastname" 
                        value={lastname} 
                        onChange={inputLastname}
                        require>   
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={inputEmail}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Phone" 
                        value={phone} 
                        onChange={inputPhone}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="password"
                        placeholder="Password" 
                        value={password} 
                        onChange={inputPsw}
                        require> 
                     </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={cpassword} 
                    onChange={inputCPsw}
                    require>
                    </Form.Control>
                </Form.Group>

                <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>

                <Button type="summit" variant="primary">ลงทะเบียน</Button>

                <p>คุณมีบัญชีแล้วใช่หรือไม่ <Link to="/Login">เข้าสู่ระบบ</Link></p>
            </Form>
        </Container>
        </>
    )
}

export default Register