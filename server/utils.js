const secp = require('ethereum-cryptography/secp256k1')

// cryptography functions
const getPublicKeyFromSig = (msgHash, signature) =>  {
    secp.recoverPublicKey()
    // const publicKey = signature.recoverPublicKey(msgHash).toRawBytes()
    // console.log({publicKey})
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
    getPublicKeyFromSig,
    StringObjectToBigIntObject
}