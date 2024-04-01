import { Container, Form, Button } from "react-bootstrap";
import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import { useAddAddressMutation } from "../../../slices/addressApiSlice";

import './AddAddressForm.css';

function addAddress({ users }) {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [add, setAdd] = useState('')
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [subdistrict, setSubdistrict] = useState('')
    const [postal, setPostal] = useState('')
    const [phone, setPhone] = useState('')
    const [isDefault, setIsDefault] = useState(false)
    const [userId, setUserId] = useState(users[0])

    const navigate = useNavigate()
    const errRef = useRef()
    const [errorMessage, setErrorMessage] = useState('') 

    const errClass = errorMessage ? "errmsg" : "offscreen"

    const [addAddress, {
        data: address,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddAddressMutation()

    useEffect(() => {
        if (isSuccess) {
            setFirstname('')
            setLastname('')
            setAdd('')
            setPhone('')
            setUserId('')
            setProvince('')
            setDistrict('')
            setSubdistrict('')
            setPostal('')
            setErrorMessage('')
            navigate('/dash/address')
        }
    }, [isSuccess, navigate])
       
    const onAddAddress = async (e) => {
        e.preventDefault()
        try {
            await addAddress({ user: userId, firstname, lastname, address: add, 
                  province, district, subdistrict, postal, phone, isDefault})
        } catch (error) {
            if(!error.status){
                setErrorMessage('No server response')
            }else if(error.status === 400){
                setErrorMessage('All fields are required')
            }else if(error.status === 404){
                setErrorMessage('User not found')
            }else {
                setErrorMessage(error.data?.message)
            }
            errRef.current.focus()
        }
    } 

    const inFname = (e) => setFirstname(e.target.value)
    const inLname = (e) => setLastname(e.target.value)
    const inAdds = (e) => setAdd(e.target.value)
    const inProvince = (e) => setProvince(e.target.value)
    const inDistrict = (e) => setDistrict(e.target.value)
    const inSubDist = (e) => setSubdistrict(e.target.value)
    const inPost = (e) => setPostal(e.target.value)
    const inPhone = (e) => setPhone(e.target.value)

    return (
        <Container className="all-add-container">
            <div className="add-container">
            <Form className="mt-5" onSubmit={onAddAddress}>
                <h2 className="mb-4">Add Address</h2>
                <Row>
                <Col md={6}>
                <Form.Group className="mb-3">
                    <h4 className="lb-1">Firstname</h4>
                    <Form.Control
                        type="text"
                        placeholder="Firstname"
                        value={firstname}
                        onChange={inFname}
                        required />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group className="mb-3">
                <h4 className="lb-1">Lastname</h4>
                    <Form.Control
                        type="text"
                        placeholder="Lastname"
                        value={lastname}
                        onChange={inLname}
                        required />
                </Form.Group>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                <Form.Group className="mb-3">
                <h4 className="lb-1">Address</h4>
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        value={add}
                        onChange={inAdds}
                        required />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group className="mb-3">
                <h4 className="lb-1">Province</h4>
                    <Form.Control
                        type="text"
                        placeholder="Province"
                        value={province}
                        onChange={inProvince}
                        required />
                </Form.Group>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                <Form.Group className="mb-3">
                <h4 className="lb-1">District</h4>
                    <Form.Control
                        type="text"
                        placeholder="District"
                        value={district}
                        onChange={inDistrict}
                        required />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group className="mb-3">
                <h4 className="lb-1">Sub-District</h4>
                    <Form.Control
                        type="text"
                        placeholder="Sub-District"
                        value={subdistrict}
                        onChange={inSubDist}
                        required />
                </Form.Group>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                <Form.Group className="mb-3">
                <h4 className="lb-1">Postal</h4>
                    <Form.Control
                        type="text"
                        placeholder="Postal"
                        value={postal}
                        onChange={inPost}
                        required />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group className="mb-3">
                <h4 className="lb-1">Phone Number</h4>
                    <Form.Control
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={inPhone}
                        required />
                </Form.Group>
                </Col>
                </Row>

                <Button type="summit" className="add-button">Add</Button>

                {/* show error message */}
                <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>

            </Form>
            </div>
        </Container>
    )
}

export default addAddress