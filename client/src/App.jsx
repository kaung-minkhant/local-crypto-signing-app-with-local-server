import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { Signup } from "./components/LoginLogout/Signup";
import { Login } from "./components/LoginLogout/Login";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  console.log({address})
  return (
    <div className="app">
      <div className="row-container">
        <Signup setAddress={setAddress} />
        <Login setAddress={setAddress} />
      </div>
      <div className="row-container">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
        />
        <Transfer setBalance={setBalance} address={address} />
      </div>
    </div>
  );
}

export default App;
