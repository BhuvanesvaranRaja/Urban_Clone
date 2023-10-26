import axios from "axios";

const getService = axios.create({
  baseURL: "http://localhost:8088/",
  headers: {
    "Content-Type": "application/json",
  },
});

export { getService };
