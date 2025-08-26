import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5273/api",
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    },
});
