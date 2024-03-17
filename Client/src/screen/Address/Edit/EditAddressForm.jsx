import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect  } from "react";
import { useUpdateAddressMutation } from "../../../slices/addressApiSlice"
import { useNavigate } from "react-router-dom";

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
    const inProv = e => setProvince(e.target.value)
    const inDistrict = (e) => setDistrict(e.target.value)
    const inSubDist = (e) => setSubdistrict(e.target.value)
    const inPost = (e) => setPostal(e.target.value)
    const inPhone = (e) => setPhone(e.target.value)

    const onSaveAddress = async (e) => {
        e.preventDefault()
        await updateAddress({ id: addressId, user: userId, firstname, lastname, add, province, district, subdistrict, postal, phone, isDefault })
    }

    return (
        <Container>
            <Form className="mt-5" onSubmit={onSaveAddress}>
                <h2 className="mb-4">Edit Address</h2>

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
                        onChange={inAdd}
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="จังหวัด"
                        value={province}
                        onChange={inProv}
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

                <Button type="summit">Save</Button>
            </Form>
        </Container>
    )
}

export default EditAddressForm