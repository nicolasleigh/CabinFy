import axios from "axios";

let baseURL = "http://localhost:8081";

if (import.meta.env.PROD) {
  baseURL = "https://cabin.linze.pro";
}

export const client = axios.create({
  baseURL,
  withCredentials: true,
});
