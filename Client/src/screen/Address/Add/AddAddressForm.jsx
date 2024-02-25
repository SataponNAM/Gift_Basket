import { Container, Form, Button } from "react-bootstrap";
import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAddAddressMutation } from "../../../slices/addressApiSlice";

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
            navigate('/address')
        }
    }, [isSuccess, navigate])
       
    const onAddAddress = async (e) => {
        e.preventDefault()
        try {
            await addAddress({ user: userId, firstname, lastname, address: add, province, district, subdistrict, postal, phone, isDefault})
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
        <Container>
            <Form className="mt-5" onSubmit={onAddAddress}>
                <h2 className="mb-4">Add Address</h2>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="ชื่อ"
                        value={firstname}
                        onChange={inFname}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="นามสกุล"
                        value={lastname}
                        onChange={inLname}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="ที่อยู่"
                        value={add}
                        onChange={inAdds}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="จังหวัด"
                        value={province}
                        onChange={inProvince}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="อำเภอ"
                        value={district}
                        onChange={inDistrict}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="ตำบล"
                        value={subdistrict}
                        onChange={inSubDist}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="รหัสไปรษณีย์"
                        value={postal}
                        onChange={inPost}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="เบอร์โทรศัพท์"
                        value={phone}
                        onChange={inPhone}
                        required />
                </Form.Group>

                <Button type="summit">Add</Button>

                {/* show error message */}
                <p ref={errRef} className={errClass} aria-live='assertive'>{errorMessage}</p>

            </Form>
        </Container>
    )
}

export default addAddress