## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized.

However, something that I would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

## Usage
The users can sign up in the app, and they will get a private key and an address. They are not very securely stored as they reside in localStorage, but the project is not securing the private key.

In order to use the app, start client and server described below. Then, open the client app in two different browsers, since we will test out sending transactions. Clear localStorage associated with the URL beforehand if there are any!!

Now, sign up with different emails. After signing up, you will get the addresses. The initial balance for every new account is 100.

Now copy the address that you want to send, and paste it in the transfer address. Set an amount and click transfer. To view the update, refresh and login. 

Now change the privateKey that is in the localStorage, and try the process again. You will see a message, telling you that you don't own the account, since you don't have a correct privateKey associated with the address.
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 
