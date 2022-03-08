import axios from "axios";
import authHeader from "./config/AuthHeader";

const base = axios.create({
  baseURL: "http://localhost:8080/",
  headers: authHeader()
})
export default base