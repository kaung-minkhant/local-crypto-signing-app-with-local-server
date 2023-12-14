import React from "react"

export const localStorageVar = {
    pubKeyItemName: 'pubKeys',
}

export const keyRelatedVar = {
    addressLength: 20,
    keyLength: 32,
}

export const toastSettings = {
    errorToastDuration: 2000,
}

export const errorMessages = {
    userExists: function (email) {
        return (
            <p>User with email <u>{email}</u> already exists</p>
        );
    },
    emptyEmailPassword: function () {
        return (
            <p>Empty email or password</p>
        )
    }
}

export const apiEndPoints = {
    login: 'login',
    signup: 'signup'
}