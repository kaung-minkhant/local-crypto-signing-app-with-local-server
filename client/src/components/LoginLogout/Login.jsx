import { useState } from "react"
import server from "../../server"
import { apiEndPoints, errorMessages, toastSettings } from "../../settings"
import toast from "react-hot-toast"
import { conlog, setCurrentUser } from "../../utils"

export const Login = ({setAddress}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = async () => {
        try{
            const {data: {address}} = await server.post(apiEndPoints.login, {
                email, password
            })
            setCurrentUser(email)
            setAddress(address)
        } catch (error) {
            conlog(error, 'api error in login')
            toast.error(errorMessages.apiError(error.response.data.errorMessage), {
                duration: toastSettings.errorToastDuration
            })
           
        }
       
    }
    const handleLogin = async () => {
        if (!Boolean(email) || !Boolean(password)) {
            toast.error(errorMessages.emptyEmailPassword(), {
                duration: toastSettings.errorToastDuration,
            })
            return;
        }
        await login();
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="container login">
            <h2>Log In</h2>
            <p className="block-label">This will retrieve the private key for this account</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">
                    Email: <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                </label>
                <label htmlFor="login-password">
                    Password: <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                </label>
                <button onClick={handleLogin} className="button">Log In</button>
            </form>
        </div>
    )
}