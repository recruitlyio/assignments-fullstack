import axios from "axios";

const ApiHelper = axios.create({
  baseURL: "http://localhost:3000/api/v1", // replace with your actual base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiHelper;
