import React from 'react'
import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useUpdateAddressMutation } from "../../../slices/addressApiSlice"
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import {
    ThailandAddressTypeahead,
    ThailandAddressValue,
} from "react-thailand-address-typeahead";

import './EditAddressForm.css';

function EditAddressForm({ address, users }) {
    const [firstname, setFirstname] = useState(address.firstname)
    const [lastname, setLastname] = useState(address.lastname)
    const [add, setAdd] = useState(address.address)
    const [province, setProvince] = useState(address.province)
    const [district, setDistrict] = useState(address.district)
    const [subdistrict, setSubdistrict] = useState(address.subdistrict)
    const [postal, setPostal] = useState(address.postal)
    const [isDefault, setIsDefault] = useState(address.isDefault)
    const [phone, setPhone] = useState(address.phone)

    const [userId, setUserId] = useState(address.user)
    const [addressId, setAddressId] = useState(address)

    const [val, setVal] = useState(
        ThailandAddressValue.fromDatasourceItem({
            d: address.district,
            p: address.province,
            po: address.postal,
            s: address.subdistrict,
        })
    );

    const [updateAddress, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateAddressMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setFirstname('')
            setLastname('')
            setAdd('')
            setProvince('')
            setDistrict('')
            setSubdistrict('')
            setPostal('')
            setPhone('')
            setIsDefault('')
            navigate('/dash/address')
        }
    }, [isSuccess, navigate])

    const inFname = e => setFirstname(e.target.value)
    const inLname = e => setLastname(e.target.value)
    const inAdd = e => setAdd(e.target.value)
    const inPhone = (e) => setPhone(e.target.value)

    const onSaveAddress = async (e) => {
        e.preventDefault()
        await updateAddress({
            id: addressId, user: userId, firstname, lastname, add,
            province: val.province, district: val.district, subdistrict: val.subdistrict,
            postal: val.postalCode, phone, isDefault
        })
    }

    return (
        <Container className="all-edit-container">
            <div className="edit-container">
                <Form className="mt-5" onSubmit={onSaveAddress}>
                    <h2 className="mb-4">Edit Address</h2>
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
                                    onChange={inAdd}
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

                    <Button type="summit" className="edit-button">Save</Button>
                </Form>
            </div>
        </Container>
    )
}

export default EditAddressForm