import { useState } from "react";
import server from "./server";
import { BigIntObjectToStringObject, conlog, generateSignature, getCurrentUser, getPrivateKey } from "./utils";
import {toast} from 'react-hot-toast'
import { apiEndPoints, errorMessages, toastSettings } from "./settings";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    if (!Boolean(address)) {
      toast.error(errorMessages.noUser(), {
        duration: toastSettings.errorToastDuration,
      })
      return;
    }
    const data = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    }
    const dataString = JSON.stringify(data)
    const currentUser = getCurrentUser();
    const privateKey = getPrivateKey(currentUser)
    const {signature} = generateSignature(dataString, privateKey)
    const formatedSignature = BigIntObjectToStringObject(signature)
    conlog({signature, formatedSignature})

    await server.post(apiEndPoints.transfer, {
      message: data,
      formatedSignature,
    })
    // try {
    //   const {
    //     data: { balance },
    //   } = await server.post(`send`, {
    //     sender: address,
    //     amount: parseInt(sendAmount),
    //     recipient,
    //   });
    //   setBalance(balance);
    // } catch (ex) {
    //   alert(ex.response.data.message);
    // }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
