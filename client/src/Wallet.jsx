import { useEffect, useLayoutEffect } from "react";
import server from "./server";

function Wallet({ address, balance, setBalance }) {
  async function getBalance(address) {
    const { data: {balance }} = await server.get(`balance/${address}`)
    setBalance(balance)
  }
  useEffect(() => {
    if (address) {
      getBalance(address)
    }
  }, [address])

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Your wallet address" value={address} disabled></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
