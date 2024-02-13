import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
//import { register } from "../actions/userActions";
//import Message from '../components/Message.jsx'

const Register = ({location, history}) => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [message, setMessage] = useState(null);

    //const dispatch = useDispatch()

    //const userRegister = useSelector((state) => state.userRegister)
	//const { loading, error, userInfo } = userRegister

    //const redirect = location.search ? location.search.split('=')[1] : '/'

    // useEffect(
    //     () => {
    //         if(userInfo){
    //             history.push(redirect)
    //         }
    //     },
    //     [history, userInfo, redirect]
    // )

    const summit = (e) => {
        e.preventDefault()
        
        // check password
        if (password !== cpassword) {
            setMessage('รหัสผ่านไม่ตรงกัน')
        }else {
            dispatch(register(firstname, lastname, email, password))
        }
    }

    return (
        <>
        <Container>
            <h1>Register</h1>

            {/* display error and message */}
            {message && <Message variant="danger">{message}</Message>}
            {/* {error && <Message variant="danger">{error}</Message>} */}

            <Form className="mt-5" onSubmit={summit}>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Firstname" 
                        value={firstname} 
                        onChange={(e) => setFirstname(e.target.value)}
                        require>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Lastname" 
                        value={lastname} 
                        onChange={(e) => setLastname(e.target.value)}
                        require>   
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        type="password"
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        require> 
                     </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={cpassword} 
                    onChange={(e) => setCPassword(e.target.value)}
                    require>
                    </Form.Control>
                </Form.Group>

                <Button type="summit" variant="primary">ลงทะเบียน</Button>

                <p>คุณมีบัญชีแล้วใช่หรือไม่ <Link to="/Login">เข้าสู่ระบบ</Link></p>
            </Form>
        </Container>
        </>
    )
}

export default Register