import axios from "axios";

const BASE_URL = "http://54.169.199.32:5000";


export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
})