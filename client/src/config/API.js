import axios from 'axios';
import Cookies from "js-cookie";
const token = Cookies.get("token");
const ApiLink=axios.create({
    baseURL: "https://job-portal-uuqb.onrender.com",
    headers: {
      
        Authorization:`Bearer ${token}`, 
    }     
})

export default ApiLink;
