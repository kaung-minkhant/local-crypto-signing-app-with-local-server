import axios from "axios";

const server = axios.create({
  baseURL: "localhost:3042/",
});

export default server;
