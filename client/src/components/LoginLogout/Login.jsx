export const Login = () => {
    return (
        <div className="container login">
            <h2>Log In</h2>
            <p className="block-label">This will retrieve the private key for this account</p>
            <form>
                <label htmlFor="login-email">Email: <input id="login-email" type="email" required/></label>
                <label htmlFor="login-password">Password: <input id="login-password" type="password" required/></label>
                <button className="button">Log In</button>
            </form>
        </div>
    )
}