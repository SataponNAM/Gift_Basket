

function login_page (){
    return (
        <>
            <div>
                <form>
                    <h1>Login</h1>

                    <div>
                        <input type="email" placeholder="Email" required />
                    </div>

                    <div>
                        <input type="password" placeholder="Password" required />
                    </div>

                    <button type="summit">Login</button>
                </form>
            </div>
        </>
    )
}

export default login_page