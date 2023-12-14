const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
};

const users = {}

app.get('/', (req, res) => {
  res.send('you ping, i pong')
})

app.post("/signup", (req, res) => {
  const {email, password, publicKey, address} = req.body;
  users[email] = {
    email, password, publicKey, address
  }
  balances[address] = 100;
  
  console.log({users, balances})
  res.status(200).send('ok')
})

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const user = users[email]
  if (!user) {
    return res.status(400).send({
      errorMessage: 'User is not registerred',
    })
  }
  if (password !== user.password) {
    return res.status(401).send({
      errorMessage: 'Email or Password is incorrect',
    })
  }
  return res.status(200).send({
    address: user.address
  })
})

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.status(200).send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.status(200).send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
