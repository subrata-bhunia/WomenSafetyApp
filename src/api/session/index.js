import { API_URL } from "../config";
import axios from "axios";

var login_url = `${API_URL}/users/login`
export const SignIn = data => {
    return axios.post(login_url,data)
}