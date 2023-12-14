import { useState } from "react"
import { generatePrivateKey, getSignedUpEmails, isSignedUpUser, storePrivateKeyInSuperSecureWay } from "../../utils"
import {toast} from 'react-hot-toast'

export const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        const emailList = getSignedUpEmails()
        if (!isSignedUpUser(email, emailList)) {
            const { privateKey } = generatePrivateKey()
            storePrivateKeyInSuperSecureWay(email, privateKey)
        } else {
            toast.error(<p>User with email <u>{email}</u> already exists</p>, {
                duration: 2000,
            })
        }
        
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="container signup">
            <h2>Sign Up</h2>
            <p className="block-label">This will generate a private key associated with this account</p>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="signup-email">
                    Email: <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                </label>
                <label htmlFor="signup-password">Password: <input id="signup-password" type="password" required /></label>
                <button onClick={handleSignUp} className="button">Sign Up</button>
            </form>
        </div>
    )
}