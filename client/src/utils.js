import {secp256k1} from "ethereum-cryptography/secp256k1"
import {sha256} from 'ethereum-cryptography/sha256'
import {getRandomBytesSync} from 'ethereum-cryptography/random'
import {toHex, utf8ToBytes} from 'ethereum-cryptography/utils'

// variables
import { keyRelatedVar, localStorageVar } from "./settings"

// crypto functions
export const generatePrivateKey = () => {
    const addressLength = keyRelatedVar.addressLength;
    const privateKey = toHex(secp256k1.utils.randomPrivateKey())
    const publicKey =  toHex(secp256k1.getPublicKey(privateKey))
    const publicKeyBytes = utf8ToBytes(publicKey)
    const publicKeyHash = toHex(sha256(publicKeyBytes))
    const address = publicKeyHash.substring(publicKeyHash.length-1-addressLength)

    conlog({privateKey, publicKey, publicKeyHash, address})
    return {
        privateKey, publicKey, address
    }
}

export const generateSignature = (msg, privateKey) => {
    const msgHash = sha256(utf8ToBytes(msg));
    const signature = secp256k1.sign(msgHash, privateKey);
    return {
        signature,
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

export const setCurrentUser = (email) => {
    if (typeof Storage !== "undefined") {
        localStorage.setItem(localStorageVar.currentUserItemName, email)
    }
}

export const getCurrentUser = () => {
    if (typeof Storage !== "undefined") {
        const data = localStorage.getItem(localStorageVar.currentUserItemName);
        return data ? data : null;
    }
}

export const getPrivateKey = (email) => {
    if (typeof Storage !== 'undefined') {
        const data = JSON.parse(localStorage.getItem(localStorageVar.pubKeyItemName))
        return data[email]
    }
}