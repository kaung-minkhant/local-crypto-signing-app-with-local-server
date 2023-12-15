import { useState } from "react"
import { generatePrivateKey, getSignedUpEmails, isSignedUpUser, setCurrentUser, storePrivateKeyInSuperSecureWay } from "../../utils"
import { toast } from 'react-hot-toast'
import { apiEndPoints, errorMessages, toastSettings } from "../../settings"
import server from "../../server"
import axios from "axios"

export const Signup = ({setAddress}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async () => {
        if (!Boolean(email) || !Boolean(password)) {
            toast.error(errorMessages.emptyEmailPassword(), {
                duration: toastSettings.errorToastDuration
            })
            return;
        }
        const emailList = getSignedUpEmails()
        if (!isSignedUpUser(email, emailList)) {
            const { privateKey, address, publicKey } = generatePrivateKey()
            storePrivateKeyInSuperSecureWay(email, privateKey)
            await server.post(apiEndPoints.signup, {
                email, password, address, publicKey
            })
            console.log('address', address)
            setCurrentUser(email)
            setAddress(address)
            
        } else {
            toast.error(errorMessages.userExists(email), {
                duration: toastSettings.errorToastDuration,
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
                <label htmlFor="signup-password">
                    Password: <input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                </label>
                <button onClick={handleSignUp} className="button">Sign Up</button>
            </form>
        </div>
    )
}