import axios from "axios";
import { API_URL } from "../config";

export const getSafetyTips =()=>{
    return axios.get(`${API_URL}/safety-tips`)
}