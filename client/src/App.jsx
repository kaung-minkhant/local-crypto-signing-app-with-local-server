import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { Signup } from "./components/LoginLogout/Signup";
import { Login } from "./components/LoginLogout/Login";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      <div className="row-container">
        <Signup />
        <Login />
      </div>
      <div className="row-container">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
        />
        <Transfer setBalance={setBalance} address={address} />
      </div>
    </div>
  );
}

export default App;
