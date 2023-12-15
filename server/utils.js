const {secp256k1} = require('ethereum-cryptography/secp256k1')
const {toHex, utf8ToBytes} = require('ethereum-cryptography/utils')
const {sha256} = require('ethereum-cryptography/sha256')
const { keyRelatedVar } = require('./settings')

// cryptography functions
const getPublicKeyFromSignatureCompact = (msgHash, signatureCompact, recovery) =>  {
    let signature = secp256k1.Signature.fromCompact(signatureCompact)
    signature = signature.addRecoveryBit(recovery)
    const publicKey = toHex(signature.recoverPublicKey(msgHash).toRawBytes())
    return publicKey
}

const getAddressFromPublicKey = (publicKey) => {
    const keyHash = toHex(sha256(utf8ToBytes(publicKey)));
    const address = keyHash.substring(keyHash.length-1-keyRelatedVar.addressLength)
    return address
}


// utility functions
const StringObjectToBigIntObject = (stringObject) => {
    console.log({stringObject})
    const bigIntObject = {};
    for (let key of Object.keys(stringObject)) {
        if (typeof stringObject[key] === 'string') {
            bigIntObject[key] = BigInt(stringObject[key])
            continue;
        }
        bigIntObject[key] = stringObject[key]
    }
    return bigIntObject;
}




module.exports = {
    getPublicKeyFromSignatureCompact,
    StringObjectToBigIntObject,
    getAddressFromPublicKey
}