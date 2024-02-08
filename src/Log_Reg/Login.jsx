import './Login.css'

function login_page() {
    return(
        <div>
            <form>
                <h1>Login</h1>

                <div>
                    <input type='email' placeholder='E-mail' required />
                </div>
                <div>
                    <input type='password' placeholder='Password' required />
                </div>

                <button type='submit' >Login</button>

                <div>
                    <p>คุณยังไม่มีบัญชีใช่หรือไม่ <a href='#'>Register</a></p>
                </div>
            </form>
        </div>
    );
}

export default login_page