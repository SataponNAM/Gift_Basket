import { Container, Form, Button } from "react-bootstrap";
import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import {
    ThailandAddressTypeahead,
    ThailandAddressValue,
} from "react-thailand-address-typeahead";

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

    const [val, setVal] = useState(ThailandAddressValue.empty())

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
            await addAddress({
                user: userId,
                firstname,
                lastname,
                address: add,
                province: val.province,
                district: val.district,
                subdistrict: val.subdistrict,
                postal: val.postalCode,
                phone,
                isDefault
            })
        } catch (error) {
            if (!error.status) {
                setErrorMessage('No server response')
            } else if (error.status === 400) {
                setErrorMessage('All fields are required')
            } else if (error.status === 404) {
                setErrorMessage('User not found')
            } else {
                setErrorMessage(error.data?.message)
            }
            errRef.current.focus()
        }
    }

    const inFname = (e) => setFirstname(e.target.value)
    const inLname = (e) => setLastname(e.target.value)
    const inAdds = (e) => setAdd(e.target.value)
    const inPhone = (e) => setPhone(e.target.value)

    return (
        <Container className="all-add-container">

            <div className="add-container">
                <Form onSubmit={onAddAddress}>
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
                            <div className="mb-3 ">
                                <ThailandAddressTypeahead value={val} onValueChange={(val) => {
                                    setVal({ ...val })
                                }}>
                                    <h4 className="lb-1">Sub-District</h4>
                                    <ThailandAddressTypeahead.SubdistrictInput
                                        className="form-control"
                                        type="text"
                                        placeholder="Sub-District"
                                        required
                                    />
                                    <ThailandAddressTypeahead.Suggestion
                                        containerProps={{
                                            className: 'suggestion-container'
                                        }}
                                        optionItemProps={{
                                            className: 'suggestion-option'
                                        }}

                                    />
                                </ThailandAddressTypeahead>
                            </div>

                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <ThailandAddressTypeahead value={val} onValueChange={(val) => {
                                setVal({ ...val })
                            }}>
                                <h4 className="lb-1">District</h4>
                                <ThailandAddressTypeahead.DistrictInput
                                    className="form-control"
                                    type="text"
                                    placeholder="District"
                                    required />
                                <ThailandAddressTypeahead.Suggestion
                                    containerProps={{
                                        className: 'suggestion-container'
                                    }}
                                    optionItemProps={{
                                        className: 'suggestion-option'
                                    }}

                                />
                            </ThailandAddressTypeahead>
                        </Col>

                        <Col md={6}>
                            <ThailandAddressTypeahead value={val} onValueChange={(val) => {
                                setVal({ ...val })
                            }}>
                                <h4 className="lb-1">Province</h4>
                                <ThailandAddressTypeahead.ProvinceInput
                                    className="form-control"
                                    type="text"
                                    placeholder="Province"
                                    required />
                                <ThailandAddressTypeahead.Suggestion
                                    containerProps={{
                                        className: 'suggestion-container'
                                    }}
                                    optionItemProps={{
                                        className: 'suggestion-option'
                                    }}

                                />
                            </ThailandAddressTypeahead>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <ThailandAddressTypeahead value={val} onValueChange={(val) => {
                                setVal({ ...val })
                            }}>
                                <h4 className="lb-1">Postal</h4>
                                <ThailandAddressTypeahead.PostalCodeInput
                                    className="form-control"
                                    type="text"
                                    placeholder="Postal"
                                    required
                                />
                                <ThailandAddressTypeahead.Suggestion
                                    containerProps={{
                                        className: 'suggestion-container'
                                    }}
                                    optionItemProps={{
                                        className: 'suggestion-option'
                                    }}

                                />
                            </ThailandAddressTypeahead>
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

                </Form>

                <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>

            </div>

        </Container>
    )
}

export default addAddress