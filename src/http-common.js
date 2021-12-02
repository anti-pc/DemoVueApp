import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://localhost:44388",
  headers: {
    "Content-type": "application/json",
    "Authorization": "be5cf12e-c449-4ff7-bfbc-38210ebe03df"
  }
});
