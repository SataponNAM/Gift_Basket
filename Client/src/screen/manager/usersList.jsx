import { useGetUsersQuery } from '../../slices/userApiSlice.jsx'
// import user.jsx from component 

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content

    if(isLoading) content = <p>Loading...</p>

    if(isError) {
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    }

    if(isSuccess) {
        const { ids } = users
        const tableContent = ids?.length
            ? ids.map(userID => <Use key={userID} userId={userId} />)
            : null
    }

    content = (
        <table className='table table--users'>
            <thead className='table__thead'>
                <tr>
                    <th scope="col" className="table__th">Firstname</th>
                    <th scope="col" className="table__th">Lastname</th>
                    <th scope="col" className="table__th">Email</th>
                    <th scope="col" className="table__th">Role</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    )

    return content
}

export default UsersList