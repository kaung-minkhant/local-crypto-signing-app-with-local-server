import {secp256k1} from "ethereum-cryptography/secp256k1"
import {sha256} from 'ethereum-cryptography/sha256'
import {getRandomBytesSync} from 'ethereum-cryptography/random'
import {toHex, utf8ToBytes} from 'ethereum-cryptography/utils'

// variables
import { keyRelatedVar, localStorageVar } from "./settings"

// crypto functions
export const generatePrivateKey = () => {
    const addressLength = keyRelatedVar.addressLength;
    const keyLength = keyRelatedVar.keyLength;
    const privateKey = toHex(getRandomBytesSync(keyLength));
    const publicKey =  toHex(secp256k1.getPublicKey(privateKey))
    const publicKeyBytes = utf8ToBytes(publicKey)
    const publicKeyHash = toHex(sha256(publicKeyBytes))
    const address = publicKeyHash.substring(publicKeyHash.length-1-addressLength)

    conlog({privateKey, publicKey, publicKeyHash, address})
    return {
        privateKey, publicKey, address
    }
}

// utility functions
export const conlog = (msg, label="") => {
    console.log(label, msg)
}


// checking and validation functions
export const isSignedUpUser = (email, emailList) => {
    return emailList.includes(email)
}

// localStorage functions
export const storePrivateKeyInSuperSecureWay = (email, privateKey) => {
    if (typeof Storage !== 'undefined') {
        let existingData = localStorage.getItem(localStorageVar.pubKeyItemName)
        if (existingData) {
            existingData = JSON.parse(existingData)
        } else {
            existingData = {}
        }
        existingData[email] = privateKey;
        localStorage.setItem(localStorageVar.pubKeyItemName, JSON.stringify(existingData))
    }
}

export const getSignedUpEmails = () => {
    if (typeof Storage !== "undefined") {
        let existingData = localStorage.getItem(localStorageVar.pubKeyItemName)
        if (existingData) {
            existingData = JSON.parse(existingData)
        } else {
            return []
        }
        return Object.keys(existingData)
    }
}