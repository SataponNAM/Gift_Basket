import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "../../slices/authApiSlice.jsx"
import usePersist from "../../hooks/usePersist.jsx"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../slices/Reducers/authReducers.jsx"
import { Container } from "react-bootstrap"

import './Persist.css'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])

    let content
    if (!persist) {
        // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) {
        //persist: yes, token: no
        console.log('loading')
        content = <p>Loading...</p>
    } else if (isError) {
        //persist: yes, token: no
        console.log('error')
        content = (
            <Container className="time-out-container">
                <p className='errmsg errmsg-time-out'>
                    {`${error.data?.message} - `}Please
                    <Link to="/login" className="relogin-link"> Login</Link>
                </p>
            </Container>
        )
    } else if (isSuccess && trueSuccess) {
        //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) {
        //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin